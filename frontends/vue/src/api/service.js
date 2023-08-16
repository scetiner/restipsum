import  URLS  from '../utils/statics';
import { HTTP } from '../utils/call-service';
import ErrorHandler from "../utils/error-handler";
import { to } from "await-to-js";

export default {
    async getSchema(token) {
        try {            
            let [err,data] = await to(HTTP.get(URLS.API.RESTIPSUM.schema.get  + token)); 
            ErrorHandler.handleError(err);
            return data.result.schema;            
        } catch (e) {                        
            console.error(e);
            return null;
        }
    },
    async generateSchema(sampleJson) {
        try {            
            let [err,data] = await to(HTTP.post(URLS.API.RESTIPSUM.schema.generate,{
                sample:sampleJson
            })); 
            ErrorHandler.handleError(err);
            return data.result.schema;            
        } catch (e) {                        
            console.error(e);
            return null;
        }
    },
    async getSample(schema) {
        try {            
            let [err,data] = await to(HTTP.post(URLS.API.RESTIPSUM.schema.sample,{
                schema
            })); 
            ErrorHandler.handleError(err);
            return data.result;            
        } catch (e) {                        
            console.error(e);
            return null;
        }
    }

}