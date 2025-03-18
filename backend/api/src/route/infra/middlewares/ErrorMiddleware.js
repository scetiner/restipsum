const pad = '00';

export const ErrorTypes = {
    VALIDATION: 0,
    HANDLED: 1,
    UNHANDLED: 2
};

function padNumber(num) {
    const str = `${num}`;
    return pad.substring(0, pad.length - str.length) + str;
}

/**
 * Creates an Error codes
 * @param {int} errorType 0 means invalid param, 1 means error occured, 2 means internal error which is not known
 * @param {*} errorIndex index should be the last
 */
function getErrorCode(errorType, errorIndex) {
    return `E${padNumber(this.errorCodeRouterPrefix)}${errorType}${padNumber(this.errorCodeMethodPrefix)}${padNumber(errorIndex)}`;
}

/**
 * Creates a router-level error middleware
 * @param {number} router_id - The router identifier
 * @returns {Function} Express middleware function
 */
export default function ErrorMiddlewareRouter(router_id) {
    return function errorMiddleware(req, res, next) {
        req.errorCodeRouterPrefix = router_id;
        req.getErrorCode = getErrorCode;
        next();
    };
}

/**
 * Creates a path-level error middleware
 * @param {number} method_id - The method identifier
 * @returns {Function} Express middleware function
 */
export function ErrorMiddlewarePath(method_id) {
    return function pathMiddleware(req, res, next) {
        req.errorCodeMethodPrefix = method_id;
        next();
    };
}

