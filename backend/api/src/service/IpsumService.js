const IpsumRepository = require("../data/repository/IpsumRepository");
const log = require("../utils/log-helper").getLogger("services-ipsum");
const { to } = require("await-to-js");
const ErrorHandler = require("../utils/ErrorHandler");
const SchemaUtils = require("../utils/SchemaUtils");

module.exports = class IpsumService {
  constructor() {
    this._ipsumRepository = new IpsumRepository();
    this._schemaUtils = new SchemaUtils();
    this._logger = log;
  }

  async getIpsum(token) {
    return await this._ipsumRepository.getIpsum(token);
  }

  async saveIpsum(ipsum) {
    return await this._ipsumRepository.saveIpsum(ipsum);
  }

  async incrementIpsumCount(token, count) {
    return await this._ipsumRepository.incrementCount(token, count);
  }

  generateSchema(sampleData){
    return this._schemaUtils.convertToSchema(sampleData);
  }

  generateSample(schema, count = 1) {
    // keep count in a effective value
    count = Math.min(1000, count);
    count = Math.max(1, count);
    let data = [];
    for (let i = 0; i < count; i++) {
      data.push(this._schemaUtils.getSampleIpsum(schema));
    }    
    
    return count > 1 ? data : data[0];
  }
};
