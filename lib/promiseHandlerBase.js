"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extend = require("extend");
const jaydata_error_handler_1 = require("jaydata-error-handler");
class CallbackSettings {
}
exports.CallbackSettings = CallbackSettings;
class PromiseNotImplemented {
    always() { jaydata_error_handler_1.Guard.raise(new jaydata_error_handler_1.Exception('$data.Promise.always', 'Not implemented!')); }
    done() { jaydata_error_handler_1.Guard.raise(new jaydata_error_handler_1.Exception('$data.Promise.done', 'Not implemented!')); }
    fail() { jaydata_error_handler_1.Guard.raise(new jaydata_error_handler_1.Exception('$data.Promise.fail', 'Not implemented!')); }
    isRejected() { jaydata_error_handler_1.Guard.raise(new jaydata_error_handler_1.Exception('$data.Promise.isRejected', 'Not implemented!')); }
    isResolved() { jaydata_error_handler_1.Guard.raise(new jaydata_error_handler_1.Exception('$data.Promise.isResolved', 'Not implemented!')); }
    //notify() { Guard.raise(new Exception('$data.Promise.notify', 'Not implemented!')); }
    //notifyWith() { Guard.raise(new Exception('$data.Promise.notifyWith', 'Not implemented!')); }
    pipe() { jaydata_error_handler_1.Guard.raise(new jaydata_error_handler_1.Exception('$data.Promise.pipe', 'Not implemented!')); }
    progress() { jaydata_error_handler_1.Guard.raise(new jaydata_error_handler_1.Exception('$data.Promise.progress', 'Not implemented!')); }
    promise() { jaydata_error_handler_1.Guard.raise(new jaydata_error_handler_1.Exception('$data.Promise.promise', 'Not implemented!')); }
    //reject() { Guard.raise(new Exception('$data.Promise.reject', 'Not implemented!')); }
    //rejectWith() { Guard.raise(new Exception('$data.Promise.rejectWith', 'Not implemented!')); }
    //resolve() { Guard.raise(new Exception('$data.Promise.resolve', 'Not implemented!')); }
    //resolveWith() { Guard.raise(new Exception('$data.Promise.resolveWith', 'Not implemented!')); }
    state() { jaydata_error_handler_1.Guard.raise(new jaydata_error_handler_1.Exception('$data.Promise.state', 'Not implemented!')); }
    then() { jaydata_error_handler_1.Guard.raise(new jaydata_error_handler_1.Exception('$data.Promise.then', 'Not implemented!')); }
}
exports.PromiseNotImplemented = PromiseNotImplemented;
class PromiseHandlerBase {
    constructor() { }
    static defaultSuccessCallback() { }
    static defaultNotifyCallback() { }
    static defaultErrorCallback() {
        if (arguments.length > 0 && arguments[arguments.length - 1] && typeof arguments[arguments.length - 1].reject === 'function') {
            arguments[arguments.length - 1].reject.apply(arguments[arguments.length - 1], arguments);
        }
        else {
            if (arguments[0] instanceof Error) {
                console.error(arguments[0]);
            }
            else {
                console.error("DefaultError:", "DEFAULT ERROR CALLBACK!", arguments);
            }
        }
    }
    static createCallbackSettings(callback, defaultSettings) {
        var settings = defaultSettings || {
            success: PromiseHandlerBase.defaultSuccessCallback,
            error: PromiseHandlerBase.defaultErrorCallback,
            notify: PromiseHandlerBase.defaultNotifyCallback
        };
        var result = new CallbackSettings();
        if (callback == null || callback == undefined) {
            result = settings;
        }
        else if (typeof callback == 'function') {
            result = extend(settings, {
                success: callback
            });
        }
        else {
            result = extend(settings, callback);
        }
        var wrapCode = function (fn) {
            var t = this;
            function r() {
                fn.apply(t, arguments);
                fn = function () { };
            }
            return r;
        };
        if (typeof result.error === 'function')
            result.error = wrapCode(result.error);
        return result;
    }
    createCallback(callback) {
        return PromiseHandlerBase.createCallbackSettings(callback);
    }
    getPromise() {
        return new PromiseNotImplemented();
    }
}
exports.PromiseHandlerBase = PromiseHandlerBase;
//# sourceMappingURL=promiseHandlerBase.js.map