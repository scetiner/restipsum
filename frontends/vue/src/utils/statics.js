import { BASE } from "../config/index";
var conf = require('../config/index.js');
export const URLS = {   
    'BASE': getBase(), 
    'AUTH': BASE.AUTH,
    'API': {
        'RESTIPSUM': {
            'schema':{
                'get': getBase() + '/schema/',
                'set': getBase() + '/schema/register',
                'generate': getBase() + '/schema/generate'
            },
            'ipsum':{
                'get': getBase() + '/ipsum/',                
            }
        }
    }
};

function getBase(){                
    return BASE.URL + '/api';
}
