module.exports = class BaseRoute {
    static isSessionValid(req) {
        const now = new Date();
        // difference between session expire time and now must be negative to be session alive.
        // if value is positive then user must be redirect to login and requesting relogin..
        const invalidTimeLimit = now.getTime() - req.session.cookie.expires.getTime();
        return invalidTimeLimit < 0 && req.session.userData;
    }

    static success(res, data) {
        return res.json({
            status: true,
            statusCode: 200,
            result: data
        });
    }

    static successWithRedirect(res, data, redirect) {
        return res.json({
            status: true,
            statusCode: 200,
            result: data,
            redirect
        });
    }

    static internalError(res, msg, errCode) {
        return res.json({
            status: false,
            statusCode: 500,
            message: msg,
            errorCode: errCode
        });
    }

    static permissionError(res, data, statusCode, errCode) {
        return res.status(401).json({
            status: false,
            statusCode: statusCode || 401,
            message: data,
            errorCode: errCode
        });
    }

    static error(res, data, statusCode, errCode) {
        return res.json({
            status: false,
            statusCode: statusCode || 500,
            message: data,
            errorCode: errCode
        });
    }

    static httpError(res, data, statusCode, errCode) {
        return res.json({
            status: false,
            statusCode: statusCode || 500,
            message: data,
            errorCode: errCode
        });
    }

    static handleError(res, err, message, errCode) {
        if (err.code === 400 || err.code === 401 || err.code === 404) {
            return BaseRoute.httpError(res, err.message, err.code, errCode);
        }
        else if (err.code === 500) {
            return BaseRoute.internalError(res, message, errCode);
        }
        return BaseRoute.error(res, err.message, err.code, errCode);
    }
};
