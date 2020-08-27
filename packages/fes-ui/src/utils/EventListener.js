const EventListener = {

    /**
    * Listen to DOM events during the bubble phase.
    *
    * @param {DOMEventTarget} target DOM element to register listener on.
    * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
    * @param {function} callback Callback function.
    * @return {object} Object with a `remove` method.
    */
    listen(target, eventType, callback, proxy = false) {
        if (target.addEventListener) {
            target.addEventListener(eventType, callback, proxy);
            return {
                remove() {
                    target.removeEventListener(eventType, callback, proxy);
                }
            };
        }
        // attachEvent作为fallback的函数，else不需要再做判断
        target.attachEvent(`on${eventType}`, callback, proxy);
        return {
            remove() {
                target.detachEvent(`on${eventType}`, callback, proxy);
            }
        };
    }
};

export default EventListener;
