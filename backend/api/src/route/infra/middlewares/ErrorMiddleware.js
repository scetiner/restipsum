const pad = '00';


exports.ErrorTypes = {
    VALIDATION: 0,
    HANDLED: 1,
    UNHANDLED: 2
};

exports.ErrorMiddlewareRouter = function ErrorMiddlewareRouter(router_id) {
    // ensuring only one copy of function
    return ErrorMiddlewareRouter[router_id] || (ErrorMiddlewareRouter[router_id] = function (req, res, next) {
        req.errorCodeRouterPrefix = router_id;
        req.getErrorCode = getErrorCode;
        next();
    })
};

exports.ErrorMiddlewarePath = function ErrorMiddlewarePath(method_id) {
    // ensuring only one copy of function
    return ErrorMiddlewarePath[method_id] || (ErrorMiddlewarePath[method_id] = function (req, res, next) {
        req.errorCodeMethodPrefix = method_id;
        next();
    })
};

function padNumber(num) {
    const str = `${num}`;

    return pad.substring(0, pad.length - str.length) + str;
}

/**
 * Creates an Error codes
 * @param {int} errorType 0 means invalid param, 1 means error occured, 2 means internal error which is not known
 * @param {*} errorIndex index should be the las
 */
function getErrorCode(errorType, errorIndex) {
    return `E${padNumber(this.errorCodeRouterPrefix)}${errorType}${padNumber(this.errorCodeMethodPrefix)}${padNumber(errorIndex)}`;
}

