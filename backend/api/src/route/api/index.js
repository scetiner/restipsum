const express = require('express');
const ErrorMiddleware = require('../infra/middlewares/ErrorMiddleware').ErrorMiddlewarePath;
const BaseRouterValidator = require('../infra/validators/BaseRouterValidator');

const IpsumController = require('./IpsumController');
const IpsumRouter = express.Router();
const ipsumController = new IpsumController();
const baseValidator = new BaseRouterValidator()

IpsumRouter.post('/schema/generate', ErrorMiddleware(1), ipsumController.generateSchema.bind(ipsumController));
IpsumRouter.post('/schema/register', ErrorMiddleware(2), baseValidator.schemaValidation, ipsumController.registerSchema.bind(ipsumController));
IpsumRouter.post('/schema/sample', ErrorMiddleware(3), baseValidator.schemaValidation, ipsumController.generateSample.bind(ipsumController));
IpsumRouter.get('/schema/:token', ErrorMiddleware(4), ipsumController.getSchema.bind(ipsumController));
IpsumRouter.get('/ipsum/:token', ErrorMiddleware(5), ipsumController.getSample.bind(ipsumController));
IpsumRouter.get('/ipsum/:token/:count*', ErrorMiddleware(6), ipsumController.getSample.bind(ipsumController));

module.exports = {
    IpsumRouter
};
