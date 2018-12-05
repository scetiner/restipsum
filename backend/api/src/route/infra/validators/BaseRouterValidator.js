const log = require('../../../utils/log-helper').getLogger('route-validator-base');
const BaseRoute = require('../base/BaseRoute');
const _ErrorTypes = require('../middlewares/ErrorMiddleware').ErrorTypes;

function schemaValidation(req, res, next) {
    if (!req.body || 
        !req.body.schema        
    ) {
        const params = req.body ? JSON.stringify(req.body) : 'Empty';
        log.error('Invalid Parameters req body', params);
        return BaseRoute.httpError(res, 'Invalid parameters', 400, req.getErrorCode(_ErrorTypes.VALIDATION, 1));
    }

    const params = JSON.stringify(req.body.schema);
    let schema = req.body.schema;
    let tp = schema.constructor.name;
    if (tp == 'Array') {
        let hasInvalidItem = schema.some(item => { return !(item.name && item.type)});
        if(hasInvalidItem){
            log.error('Invalid Parameters req body', params);
            return BaseRoute.httpError(res, 'Invalid schema', 400, req.getErrorCode(_ErrorTypes.VALIDATION, 2));
        }
        return next();
    } else {
        if (schema.model && schema.type) {
            return next();
        } else {
            log.error('Invalid Parameters req body', params);
            return BaseRoute.httpError(res, 'Invalid schema', 400, req.getErrorCode(_ErrorTypes.VALIDATION, 3));
        }
    }    
}

module.exports = {
    schemaValidation
};
