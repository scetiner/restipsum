import service from "../../api/service";
import ErrorHandler from "../../utils/error-handler";
import { to } from "await-to-js";

// initial state
const state = {
    schema: null,
    defaultSample: {
        "name": "rest ipsum",
        "contact": "root@restipsum.com",
        "ttl": 1,
        "supports": [
          "str",
          "bool",
          "int",
          "float",
          "enum",
          "email",
          "ip",
          "uuid",
          "date",
          "url",
          "model"
        ],
        "description": "Generates sample data for your client over a simple GET endpoint.",
        "isFree": true,
        "website": "https://restipsum.com",
        "localhost": "127.0.0.1",
        "time": "Fri, 29 Oct 1920 09:30:00 GMT",
        "technologies": {
          "backend": "Node.js",
          "frontend": "AngularJs",
          "database": "NoSQL"
        }
      },
    ipsum:null,
    token:"default"
};

// getters
const getters = {
    schemaToken: state => {
        return state.token || "default";
    },
    sample:state => {
        return state.defaultSample;
    },
    ipsum: state => {
        return state.ipsum;
    },
    schema: state =>{
        return state.schema || null;
    }
};

// actions
const actions = {    
    async getSchema({ commit,state }, sample) {        
        let [err,result] = await to(service.getSchema(sample || state.token));
        ErrorHandler.handleError(err);

        commit("setSchema",result);
        return;
    },
    async generateSchema({ commit,state }, sample) {        
        let [err,result] = await to(service.getSchema(sample || state.defaultSample));
        ErrorHandler.handleError(err);

        commit("setSchema",result);
        return;
    }

};

// mutations
const mutations = {
    setSchema(state, schema) {
        state.schema = schema;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
