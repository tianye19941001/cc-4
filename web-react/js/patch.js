const __render = require('./render').__rende;
const setAttribute = require('./setAttribute');

const _ = {};
_.each = function each(array, fn) {
    for(var i = 0, len = array.length; i < len; i ++ ) {
        fn(array[i], i);
    }
}

const REPLACE = 0;
const REORDER = 1;
const PROPS = 2;
const TEXT = 3;

function patch(node, patches) {
    var walker = {index: 0};
    dfsWalk(node, walker, patches);
    return node;
}

function dfsWalk(node, walker, patches) {
    let currentPatches = patches[walker.index];

    let len = node.childNodes ? node.childNodes.length : 0;

    for(let i = 0; i < len; i ++) {
        let child = node.childNodes[i];
        walker.index ++;
        dfsWalk(child, walker, patches);
    }

    //将当前节点的修改记录进行真实的dom修改
    if(currentPatches) {
        applyPatches(node, currentPatches);
    }
}

function applyPatches(node, currentPatches) {
    _.each(currentPatches, function(currentPatch) {
        switch (currentPatch.type) {
            case REPLACE:
                var newNode = (typeof currentPatch.node === 'string')
                ? document.createTextNode(node)
                : __render(currentPatch.node);
                node.parentNode.replaceChild(newNode, node);
                break;
            case PROPS:
                setProps(node, currentPatch.props);
                break;
            case TEXT:
                if(node.textContent) {
                    node.textContent = currentPatch.content;
                } else {
                    node.nodeValue = currentPatch.content;
                }
                break;
            default:
                throw new Error('Unknown patch type ' + currentPatch.type);
        }
    })

    return node;
}

function setProps (node, props) {
    for(let key in props) {
        if(props[key] === void 1127) {
            node.removeAttribute(key);
        } else {
            let value = props[key];
            setAttribute(node, key, value);
        }
    }
}

module.exports = patch;
