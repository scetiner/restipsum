const BaseRoute = require('../infra/base/BaseRoute');
const log = require('../../utils/log-helper').getLogger('controller-ipsum');
const { ErrorTypes } = require('../infra/middlewares/ErrorMiddleware');
const IpsumService = require('../../service/IpsumService');
const { SystemMessages, DefaultSchema } = require('../../statics/default_types');
const { to } = require('await-to-js');
const ErrorHandler = require('../../utils/ErrorHandler');

module.exports = class IpsumController {
    constructor() {
        this._logger = log;
        this._ipsumService = new IpsumService();
    }

    async getSchema(req, res) {        
        try {            
            if(req.params.token == "default"){
                return BaseRoute.success(res, { schema:DefaultSchema });
            }
            
            let [err,ipsum] = await to(this._ipsumService.getIpsum(req.params.token));
            ErrorHandler.handleError(err);
            
            return BaseRoute.success(res, { schema:JSON.parse(ipsum.model) });
        } catch (err) {
            this._logger.error('Something went wrong while getting schema', err);
            return BaseRoute.internalError(res, SystemMessages.GENERIC_ERROR, req.getErrorCode(ErrorTypes.UNHANDLED, 1));
        }
    }

    async generateSchema(req, res) {        
        try {            
            let schema = this._ipsumService.generateSchema(req.body.sample);
            return BaseRoute.success(res, { schema });
        } catch (err) {
            this._logger.error('Something went wrong while getting schema', err);
            return BaseRoute.internalError(res, SystemMessages.GENERIC_ERROR, req.getErrorCode(ErrorTypes.UNHANDLED, 1));
        }
    }

    async registerSchema(req, res) {        
        try {
            // check for default schema
            let isDefault = JSON.stringify(req.body.schema) === JSON.stringify(DefaultSchema);
            if(isDefault){
                this._logger.info("Default Schema registration is faked.");
                return BaseRoute.success(res, { token:"default" });
            }

            let [err,result] = await to(this._ipsumService.saveIpsum(req.body.schema));
            ErrorHandler.handleError(err);
            
            return BaseRoute.success(res, { token:result.token });
        } catch (err) {
            this._logger.error('Something went wrong during schema registration', err);
            return BaseRoute.internalError(res, SystemMessages.GENERIC_ERROR, req.getErrorCode(ErrorTypes.UNHANDLED, 1));
        }
    }

    async generateSample(req, res) {        
        try {
            let data = this._ipsumService.generateSample(req.body.schema,1);                        
            return BaseRoute.success(res, data);
        } catch (err) {
            this._logger.error('Something went wrong while generating sample', err);
            return BaseRoute.internalError(res, SystemMessages.GENERIC_ERROR, req.getErrorCode(ErrorTypes.UNHANDLED, 1));
        }
    }

    async getSample(req, res) {        
        try {
            let token = req.params.token;
            let schema = null;
            // check if default schema is requested
            if(token === "default"){
                schema = DefaultSchema;
                this._logger.info("Default schema is used to generate sample");
            } else{
                let [err,ipsum] = await to(this._ipsumService.getIpsum(token));
                ErrorHandler.handleError(err);

                schema = JSON.parse(ipsum.model)
            }
            
            let data = this._ipsumService.generateSample(schema,req.params.count); 
            // return pure data because user registers its own model to retrieve                       
            return res.json(data);
        } catch (err) {
            this._logger.error('Something went wrong while getting sample', err);
            return BaseRoute.internalError(res, SystemMessages.GENERIC_ERROR, req.getErrorCode(ErrorTypes.UNHANDLED, 1));
        }
    }
};