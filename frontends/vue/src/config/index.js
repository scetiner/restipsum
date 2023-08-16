'use strict'

const isProd = process.env.NODE_ENV === 'production';
const isStage = process.env.NODE_ENV === 'staging';

var conf = {
    production:{
        host: 'http://localhost:9595'
    },
    development:{
        host: 'http://localhost:9595'
    }
};

const envConf = isProd ? conf.production : (isStage ? conf.staging : conf.development);

const BASE = {
    URL: envConf.host,
    AUTH: envConf.auth
}

export default BASE
