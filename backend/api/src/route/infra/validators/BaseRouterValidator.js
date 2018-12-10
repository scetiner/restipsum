const Logger = require('../../../utils/Logger');
const BaseRoute = require('../base/BaseRoute');
const _ErrorTypes = require('../middlewares/ErrorMiddleware').ErrorTypes;

module.exports = class BaseRouterValidator {
    constructor(){
        this.logger = new Logger('route-validator-base').getLogger()
    }

    schemaValidation(req, res, next) {
        if (!req.body || 
            !req.body.schema        
        ) {
            const params = req.body ? JSON.stringify(req.body) : 'Empty';
            this.loggererror('Invalid Parameters req body', params);
            return BaseRoute.httpError(res, 'Invalid parameters', 400, req.getErrorCode(_ErrorTypes.VALIDATION, 1));
        }
    
        const params = JSON.stringify(req.body.schema);
        let schema = req.body.schema;
        let tp = schema.constructor.name;
        if (tp == 'Array') {
            let hasInvalidItem = schema.some(item => { return !(item.name && item.type)});
            if(hasInvalidItem){
                this.loggererror('Invalid Parameters req body', params);
                return BaseRoute.httpError(res, 'Invalid schema', 400, req.getErrorCode(_ErrorTypes.VALIDATION, 2));
            }
            return next();
        } else {
            if (schema.model && schema.type) {
                return next();
            } else {
                this.loggererror('Invalid Parameters req body', params);
                return BaseRoute.httpError(res, 'Invalid schema', 400, req.getErrorCode(_ErrorTypes.VALIDATION, 3));
            }
        }    
    }
}