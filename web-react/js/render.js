const setAttribute = require('./setAttribute');
const patch = require('./patch');
const diff = require('./diff');

function __render(vnode) {
    
    if(typeof vnode === 'number') {
        vnode = String(vnode);
    }

    if(typeof vnode === 'string') {
        const textNode = document.createTextNode(vnode);
        return textNode;
    }

    if(typeof vnode.tag === 'function') {
        const component = createComponent(vnode.tag, vnode.attrs);
        setComponentProps(component, vnode.attrs);
        return component.base;
    }

    const dom = document.createElement(vnode.tag);
    if(vnode.attrs) {
        Object.keys(vnode.attrs).forEach(key => {
            const value = vnode.attrs[key];
            setAttribute(dom, key, value);
        })
    }

    vnode.children.forEach(child => {
        render(child, dom);
    })

    return dom;
}

function render(vnode, container) {
    return container.appendChild(__render(vnode));
}

function createComponent(component, props) {
    let inst;

    // 如果是类定义组件，则直接返回实例
    if(component.prototype && component.prototype.render) {
        inst = new component(props);
    // 如果是函数定义组件，则将其扩展为类定义组件 
    } else {
        inst = new component(props);
        inst.constructor = component;
        inst.render = function() {
            return this.constructor(props);
        }
    }

    return inst;
}

function setComponentProps(component, props) {
    if(!component.base) {
        if(component.componentWillMount) {
            component.componentWillMount();
        }
    } else if(component.componentWillReceiveProps) {
        component.componentWillReceiveProps(props);
    }

    component.props = props;
    renderComponent(component);
}

// 组件渲染流程
function renderComponent(component) {
    let base;
    const renderer = component.render();

    // 不是第一次渲染触发componentWillUpdate
    if(component.base && component.componentWillUpdate) {
        component.componentWillUpdate();
    }

    // 第一次渲染直接vdom变成真实Dom
    if(!component.base) {
        base = __render(renderer);
    // 不是第一次进行diff算法对比后更新dom
    } else {
        let _d = diff(component.preVnodeTree, renderer);
        base = patch(component.base, _d);
    }

    // 不是第一次渲染触执行componentDidUpdate
    if(component.base) {
        if(component.componentDidUpdate) {
            component.componentDidUpdate();
        }
    // 第一次渲染执行componentDidMount
    } else if(component.componentDidMount) {
        component.componentDidMount();
    }

    // 保存本次vdom，以便下次更新使用
    component.preVnodeTree = renderer;
    // 保存本次dom，以便下次在此基础上更新
    component.base = base;
}

class Component {
    constructor(props = {}) {
        this.state = {};
        this.props = props;
    }

    setState(stateChange) {
        Object.assign(this.state, stateChange);
        renderComponent(this);
    }
}

module.exports.__rende = __render;
module.exports.render = render;
module.exports.Component = Component;
