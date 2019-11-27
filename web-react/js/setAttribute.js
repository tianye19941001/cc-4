function setAttribute(dom, key, value) {
    if(key === 'className') key = 'class';

    if(/on\w+/.test(key)) {
        key = key.toLowerCase();
        dom[key] = value || '';
    } else if(key = 'style') {
        if(!value || typeof value === 'string') {
            dom.style.cssText = value || '';
        } else if (value && typeof value === 'object') {
            for(let cssname in value) {
                dom.style[cssname] = value[cssname] + typeof value[cssname] === 'number' ? 'px' : '';
            }
        }
    } else {
        if(key in dom) {
            dom[key] = value || '';
        }

        if(value) {
            dom.setAttribute(key, value);
        } else {
            dom.removeAttribute(key);
        }
    }

}

module.exports = setAttribute;