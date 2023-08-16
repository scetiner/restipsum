import BASE  from "../config/index";
import conf from'../config/index.js';

const URLS = {   
    'BASE': getBase(), 
    'AUTH': BASE.AUTH,
    'API': {
        'RESTIPSUM': {
            'schema':{
                'get': getBase() + '/schema/',
                'set': getBase() + '/schema/register',
                'generate': getBase() + '/schema/generate',
                'sample': getBase() + '/schema/sample'
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

export default URLS
