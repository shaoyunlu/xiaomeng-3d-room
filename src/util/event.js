// 检测元素高度变化
export function resizeOB(el ,cbf){
    if (window.ResizeObserver){
        const observer = new ResizeObserver(()=>{
            cbf()
        })
    
        observer.observe(el) // 观测DOM元素
    }else{
        const observer = new MutationObserver((mutations) => {
            cbf()
        });

        observer.observe(el, {
            attributes: true,  // 监测元素属性变化
            childList: true,  // 监测子元素变化
            subtree: true  // 监测所有后代节点的变化
        });
    }
}

export function createEventBus(eventBus){
    const $on = (event, callback) => {
        if (!eventBus.listeners[event]) {
          eventBus.listeners[event] = [];
        }
        eventBus.listeners[event].push(callback);
    };
  
    // 触发一个事件
    const $emit = (event, ...args) => {
        if (eventBus.listeners[event]) {
          eventBus.listeners[event].forEach(callback => callback(...args));
        }
    };

    // 移除一个事件
    const $remove = (event ,callback)=>{
        if (eventBus.listeners[event]){
            let index = eventBus.listeners[event].indexOf(callback)
            eventBus.listeners[event].splice(index, 1);
        }
    }

    return {$on ,$emit ,$remove}
}

// 防抖函数
export function debounce(func, delay) {
    let timeoutId
    return function(...args) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}