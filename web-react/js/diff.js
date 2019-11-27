const REPLACE = 0;
const REORDER = 1;
const PROPS = 2;
const TEXT = 3;

const patch = {}

patch.REPLACE = REPLACE;
patch.REORDER = REORDER;
patch.PROPS = PROPS;
patch.TEXT = TEXT;

function diff(oldTree, newTree) {
    var walker = {index: 0};
    var patches = {};
    dfsWalk(oldTree, newTree, walker, patches);
    return patches;
}

function dfsWalk(oldNode, newNode, walker, patches) {
    let currentPatch = [];
    let index = walker.index;

    if(newNode === null) {

    } else if((typeof oldNode === 'string' && typeof newNode === 'string') || (typeof oldNode === 'number' && typeof newNode === 'number')) {
        if(newNode !== oldNode) {
            currentPatch.push({type: patch.TEXT, content: String(newNode)});
        }
    } else if(oldNode.tag === newNode.tag && oldNode.key === newNode.key) {
        let propsPatches = diffProps(oldNode, newNode);

        if(propsPatches) {
            currentPatch.push({type: patch.PROPS, props: propsPatches})
        }

        diffChildren(oldNode.children, newNode.children, walker, patches);
    } else {
        currentPatch.push({type: patch.REPLACE, node: newNode})
    }

    if(currentPatch.length) {
        patches[index] = currentPatch;
    }
}

function diffChildren(oldChildren, newChildren, walker, patches) {
    oldChildren = oldChildren || [];

    oldChildren.forEach((child, i) => {
        let newChild = newChildren[i];
        walker.index ++;
        dfsWalk(child, newChild, walker, patches);
    })
}

function diffProps(oldNode, newNode) {
    let count = 0;
    let oldProps = oldNode.attrs || {};
    let newProps = newNode.attrs || {};
    let key, value;
    let propsPatches = {};

    for(key in oldProps) {
        value = oldProps[key];

        if(newProps[key] !== value) {
            count ++;
            propsPatches[key] = newProps[key];
        }
    }

    for(key in newProps) {
        value = newProps[key];

        if(!oldProps.hasOwnProperty(key)) {
            count ++;
            propsPatches[key] = newProps[key];
        }
    }

    if(count === 0) return null;
    return propsPatches;
}


module.exports = diff;