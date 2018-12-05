/**
 * @jest-environment node
 */
jest.setTimeout(60000);
global.conf = {
    "logLevel": "debug"
};

const mongoose = require('mongoose');
const {to} = require('await-to-js');
// const logHelper = require('../../src/utils/log-helper');
const { DefaultSchema } = require('../../src/statics/default_types');
const IpsumService = require('../../src/service/IpsumService');


describe('Ipsum Service', () => {
    var service = new IpsumService();
    var defaultToken = "default";
    var token = null;
    var usageCount = null;
    var schema = null;
    var conn = null;
    beforeAll(async (done) =>{   
        mongoose.connection.on('connected', function(){
            done();
        });

        conn = mongoose.connect('mongodb://localhost:27017/restipsum_test', { 
            useNewUrlParser: true,
            poolSize: 10
        });

    })
    afterAll(async (done) => {        
        mongoose.connection.dropDatabase();
        done();
    });
    
    it('can register ipsum with new schema', async (done) => {
        let [err,result] =await to(service.saveIpsum(DefaultSchema));        
        expect(err).toBeNull();
        expect(result).not.toBeNull();
        expect(result.token).not.toBeNull();
        token = result.token;
        schema = result.model;
        done();
    });    

    it('can get ipsum schema from db', async (done) => {
        let [err,result] =await to(service.getIpsum(token));       
        expect(err).toBeNull();
        expect(result).not.toBeNull();
        expect(result.model).not.toBeNull();
        expect(JSON.stringify(schema)).toBe(JSON.stringify(result.model));
        usageCount = result.count;
        done();
    });    

    it('can increment ipsum usage count', async (done) => {
        let [err,result] =await to(service.incrementIpsumCount(token,5));                 
        expect(err).toBeNull();
        expect(result).toBeTruthy();

        [err,result] =await to(service.getIpsum(token));                 
        expect(err).toBeNull();
        expect(result).toBeTruthy();
        expect(result.count).toBe(usageCount + 5);
        done();
    });        

    it('can generate data from registered schema', () => {
        let result = service.generateSample(token,2);        
        expect(result).not.toBeNull();
        expect(result.length).toBe(2);
    });    

    it('can generate data for negative counts', () => {
        let result =service.generateSample(token,-2);        
        expect(result).not.toBeNull();
        expect(result).toBeInstanceOf(Object);        
    });    

    it('can generate data up to 1k items', () => {
        let result =service.generateSample(token,2000);  
        expect(result).not.toBeNull();
        expect(result.length).toBe(1000);        
    });    
});