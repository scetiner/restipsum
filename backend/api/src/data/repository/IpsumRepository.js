const { to } = require('await-to-js');
const uuidv4 = require('uuid/v4');
const Ipsum = require('../model/Ipsum');
const log = require('../../utils/log-helper').getLogger('route-ipsum-repo');
const ErrorHandler = require('../../utils/ErrorHandler');

module.exports = class IpsumRepository {
    constructor() {
        this._logger = log;
    }

    async getIpsum(token) {
        let [err,result] = await to(Ipsum.findOne({ token }));
        ErrorHandler.handleError(err);
        
        return result;
    }

    async saveIpsum(ipsum) {        
        let newIpsum = new Ipsum({
            token: uuidv4(),
            model: JSON.stringify(ipsum)
        });

        let [err,result] = await to(newIpsum.save());
        ErrorHandler.handleError(err);
        
        return result;
    }

    async incrementCount(token,count) {        
        let [err,result] = await to(Ipsum.update({token},
            {
                $inc: { 
                    count
                }
            }
        ));
        ErrorHandler.handleError(err);

        return result && result.nModified > 0;
    }
};
