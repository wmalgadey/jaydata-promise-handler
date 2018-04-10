"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extend = require("extend");
const promiseHandlerBase_1 = require("./promiseHandlerBase");
class PromiseHandler extends promiseHandlerBase_1.PromiseHandlerBase {
    constructor() {
        super();
        var self = this;
        var promise = new Promise(function (resolve, reject) {
            self.resolve = resolve;
            self.reject = reject;
        });
        this.deferred = {
            resolve: function () { self.resolve.apply(promise, arguments); },
            reject: function () { self.reject.apply(promise, arguments); },
            promise: promise
        };
    }
    createCallback(callback) {
        var settings = promiseHandlerBase_1.PromiseHandlerBase.createCallbackSettings(callback);
        var self = this;
        var result = new promiseHandlerBase_1.CallbackSettings();
        result = extend(result, {
            success: function () {
                settings.success.apply(self.deferred, arguments);
                self.resolve.apply(self.deferred, arguments);
            },
            error: function () {
                Array.prototype.push.call(arguments, self.deferred);
                settings.error.apply(self.deferred, arguments);
            },
            notify: function () {
                settings.notify.apply(self.deferred, arguments);
            }
        });
        return result;
    }
    getPromise() {
        return this.deferred.promise;
    }
    static compatibilityMode() {
        Promise.prototype['fail'] = function (onReject) {
            return this.then(null, function (reason) {
                onReject(reason);
                throw reason;
            });
        };
        Promise.prototype['always'] = function (onResolveOrReject) {
            return this.then(onResolveOrReject, function (reason) {
                onResolveOrReject(reason);
                throw reason;
            });
        };
    }
    static use($data) {
        $data.PromiseHandler = typeof Promise == 'function' ? PromiseHandler : promiseHandlerBase_1.PromiseHandlerBase;
        $data.PromiseHandlerBase = promiseHandlerBase_1.PromiseHandlerBase;
        $data.Promise = promiseHandlerBase_1.PromiseNotImplemented;
    }
}
exports.PromiseHandler = PromiseHandler;
//# sourceMappingURL=promise.js.map