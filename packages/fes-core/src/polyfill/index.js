/* eslint-disable */
class File {
    toString() {
        console.log('compatible File');
        return 'function File() { [native code] }';
    }
}

if (window.File === undefined) {
    window.File = File;
}

// el remove
(function (arr) {
    arr.forEach((item) => {
        if (item.hasOwnProperty('remove')) {
            return;
        }
        Object.defineProperty(item, 'remove', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function remove() {
                if (this.parentNode !== null) this.parentNode.removeChild(this);
            }
        });
    });
}([Element.prototype, CharacterData.prototype, DocumentType.prototype]));


// Function.bind
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== 'function') {
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }
        const aArgs = Array.prototype.slice.call(arguments, 1);
        const fToBind = this;
        const fNOP = function () {};
        const fBound = function () {
            return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
                aArgs.concat(Array.prototype.slice.call(arguments)));
        };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    };
}
