// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/setAttribute.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function setAttribute(dom, key, value) {
  if (key === 'className') key = 'class';

  if (/on\w+/.test(key)) {
    key = key.toLowerCase();
    dom[key] = value || '';
  } else if (key = 'style') {
    if (!value || typeof value === 'string') {
      dom.style.cssText = value || '';
    } else if (value && _typeof(value) === 'object') {
      for (var cssname in value) {
        dom.style[cssname] = value[cssname] + _typeof(value[cssname]) === 'number' ? 'px' : '';
      }
    }
  } else {
    if (key in dom) {
      dom[key] = value || '';
    }

    if (value) {
      dom.setAttribute(key, value);
    } else {
      dom.removeAttribute(key);
    }
  }
}

module.exports = setAttribute;
},{}],"js/patch.js":[function(require,module,exports) {
var __render = require('./render').__rende;

var setAttribute = require('./setAttribute');

var _ = {};

_.each = function each(array, fn) {
  for (var i = 0, len = array.length; i < len; i++) {
    fn(array[i], i);
  }
};

var REPLACE = 0;
var REORDER = 1;
var PROPS = 2;
var TEXT = 3;

function patch(node, patches) {
  var walker = {
    index: 0
  };
  dfsWalk(node, walker, patches);
  return node;
}

function dfsWalk(node, walker, patches) {
  var currentPatches = patches[walker.index];
  var len = node.childNodes ? node.childNodes.length : 0;

  for (var i = 0; i < len; i++) {
    var child = node.childNodes[i];
    walker.index++;
    dfsWalk(child, walker, patches);
  } //将当前节点的修改记录进行真实的dom修改


  if (currentPatches) {
    applyPatches(node, currentPatches);
  }
}

function applyPatches(node, currentPatches) {
  _.each(currentPatches, function (currentPatch) {
    switch (currentPatch.type) {
      case REPLACE:
        var newNode = typeof currentPatch.node === 'string' ? document.createTextNode(node) : __render(currentPatch.node);
        node.parentNode.replaceChild(newNode, node);
        break;

      case PROPS:
        setProps(node, currentPatch.props);
        break;

      case TEXT:
        if (node.textContent) {
          node.textContent = currentPatch.content;
        } else {
          node.nodeValue = currentPatch.content;
        }

        break;

      default:
        throw new Error('Unknown patch type ' + currentPatch.type);
    }
  });

  return node;
}

function setProps(node, props) {
  for (var key in props) {
    if (props[key] === void 1127) {
      node.removeAttribute(key);
    } else {
      var value = props[key];
      setAttribute(node, key, value);
    }
  }
}

module.exports = patch;
},{"./render":"js/render.js","./setAttribute":"js/setAttribute.js"}],"js/diff.js":[function(require,module,exports) {
var REPLACE = 0;
var REORDER = 1;
var PROPS = 2;
var TEXT = 3;
var patch = {};
patch.REPLACE = REPLACE;
patch.REORDER = REORDER;
patch.PROPS = PROPS;
patch.TEXT = TEXT;

function diff(oldTree, newTree) {
  var walker = {
    index: 0
  };
  var patches = {};
  dfsWalk(oldTree, newTree, walker, patches);
  return patches;
}

function dfsWalk(oldNode, newNode, walker, patches) {
  var currentPatch = [];
  var index = walker.index;

  if (newNode === null) {} else if (typeof oldNode === 'string' && typeof newNode === 'string' || typeof oldNode === 'number' && typeof newNode === 'number') {
    if (newNode !== oldNode) {
      currentPatch.push({
        type: patch.TEXT,
        content: String(newNode)
      });
    }
  } else if (oldNode.tag === newNode.tag && oldNode.key === newNode.key) {
    var propsPatches = diffProps(oldNode, newNode);

    if (propsPatches) {
      currentPatch.push({
        type: patch.PROPS,
        props: propsPatches
      });
    }

    diffChildren(oldNode.children, newNode.children, walker, patches);
  } else {
    currentPatch.push({
      type: patch.REPLACE,
      node: newNode
    });
  }

  if (currentPatch.length) {
    patches[index] = currentPatch;
  }
}

function diffChildren(oldChildren, newChildren, walker, patches) {
  oldChildren = oldChildren || [];
  oldChildren.forEach(function (child, i) {
    var newChild = newChildren[i];
    walker.index++;
    dfsWalk(child, newChild, walker, patches);
  });
}

function diffProps(oldNode, newNode) {
  var count = 0;
  var oldProps = oldNode.attrs || {};
  var newProps = newNode.attrs || {};
  var key, value;
  var propsPatches = {};

  for (key in oldProps) {
    value = oldProps[key];

    if (newProps[key] !== value) {
      count++;
      propsPatches[key] = newProps[key];
    }
  }

  for (key in newProps) {
    value = newProps[key];

    if (!oldProps.hasOwnProperty(key)) {
      count++;
      propsPatches[key] = newProps[key];
    }
  }

  if (count === 0) return null;
  return propsPatches;
}

module.exports = diff;
},{}],"js/render.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var setAttribute = require('./setAttribute');

var patch = require('./patch');

var diff = require('./diff');

function __render(vnode) {
  if (typeof vnode === 'number') {
    vnode = String(vnode);
  }

  if (typeof vnode === 'string') {
    var textNode = document.createTextNode(vnode);
    return textNode;
  }

  if (typeof vnode.tag === 'function') {
    var component = createComponent(vnode.tag, vnode.attrs);
    setComponentProps(component, vnode.attrs);
    return component.base;
  }

  var dom = document.createElement(vnode.tag);

  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(function (key) {
      var value = vnode.attrs[key];
      setAttribute(dom, key, value);
    });
  }

  vnode.children.forEach(function (child) {
    render(child, dom);
  });
  return dom;
}

function render(vnode, container) {
  return container.appendChild(__render(vnode));
}

function createComponent(component, props) {
  var inst; // 如果是类定义组件，则直接返回实例

  if (component.prototype && component.prototype.render) {
    inst = new component(props); // 如果是函数定义组件，则将其扩展为类定义组件 
  } else {
    inst = new component(props);
    inst.constructor = component;

    inst.render = function () {
      return this.constructor(props);
    };
  }

  return inst;
}

function setComponentProps(component, props) {
  if (!component.base) {
    if (component.componentWillMount) {
      component.componentWillMount();
    }
  } else if (component.componentWillReceiveProps) {
    component.componentWillReceiveProps(props);
  }

  component.props = props;
  renderComponent(component);
} // 组件渲染流程


function renderComponent(component) {
  var base;
  var renderer = component.render(); // 不是第一次渲染触发componentWillUpdate

  if (component.base && component.componentWillUpdate) {
    component.componentWillUpdate();
  } // 第一次渲染直接vdom变成真实Dom


  if (!component.base) {
    base = __render(renderer); // 不是第一次进行diff算法对比后更新dom
  } else {
    var _d = diff(component.preVnodeTree, renderer);

    base = patch(component.base, _d);
  } // 不是第一次渲染触执行componentDidUpdate


  if (component.base) {
    if (component.componentDidUpdate) {
      component.componentDidUpdate();
    } // 第一次渲染执行componentDidMount

  } else if (component.componentDidMount) {
    component.componentDidMount();
  } // 保存本次vdom，以便下次更新使用


  component.preVnodeTree = renderer; // 保存本次dom，以便下次在此基础上更新

  component.base = base;
}

var Component =
/*#__PURE__*/
function () {
  function Component() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Component);

    this.state = {};
    this.props = props;
  }

  _createClass(Component, [{
    key: "setState",
    value: function setState(stateChange) {
      Object.assign(this.state, stateChange);
      renderComponent(this);
    }
  }]);

  return Component;
}();

module.exports.__rende = __render;
module.exports.render = render;
module.exports.Component = Component;
},{"./setAttribute":"js/setAttribute.js","./patch":"js/patch.js","./diff":"js/diff.js"}],"js/index.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _render = require('./render').render;

var renderComponent = require('./render').renderComponent;

var Component = require('./render').Component;

var diff = require('./diff');

function createElement(tag, attrs) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return {
    tag: tag,
    attrs: attrs,
    children: children
  };
}

var React = {
  createElement: createElement,
  Component: Component
};

function Welcome(props) {
  return React.createElement("h1", null, "hello,", props.name);
}

var Welcome2 =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Welcome2, _React$Component);

  function Welcome2() {
    _classCallCheck(this, Welcome2);

    return _possibleConstructorReturn(this, _getPrototypeOf(Welcome2).apply(this, arguments));
  }

  _createClass(Welcome2, [{
    key: "render",
    value: function render() {
      return React.createElement("h1", null, "hello-components2,", this.props.name);
    }
  }]);

  return Welcome2;
}(React.Component);

var ReactDOM = {
  render: function render(vnode, container) {
    container.innerHTML = '';
    return _render(vnode, container);
  }
};
ReactDOM.render(React.createElement("div", null, React.createElement(Welcome, {
  name: "tianye1"
}), React.createElement(Welcome, {
  name: "tianye2"
}), React.createElement(Welcome2, {
  name: "tianye3"
})), document.getElementById('root'));

var Counter =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Counter, _React$Component2);

  function Counter(props) {
    var _this;

    _classCallCheck(this, Counter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Counter).call(this, props));
    _this.state = {
      num: 0
    };
    return _this;
  }

  _createClass(Counter, [{
    key: "componentWillUpdate",
    value: function componentWillUpdate() {
      console.log('update');
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      console.log('mount');
    }
  }, {
    key: "onClick",
    value: function onClick() {
      this.setState({
        num: this.state.num + 1
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        onClick: this.onClick.bind(this)
      }, React.createElement("h1", null, "number: ", this.state.num), React.createElement("button", null, "add"));
    }
  }]);

  return Counter;
}(React.Component);

ReactDOM.render(React.createElement(Counter, null), document.getElementById('main')); //test diff

var d1 = React.createElement("div", null, React.createElement("h1", null, "123"), React.createElement("span", null, "r"));
var d2 = React.createElement("div", null, React.createElement("h1", null, "456"), React.createElement("p", null, "r"));
var a = diff(d1, d2); // console.log(a)
},{"./render":"js/render.js","./diff":"js/diff.js"}],"C:/Users/tianye1/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62906" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/tianye1/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map