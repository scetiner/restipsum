const fs = require('fs');
const log4js = require('log4js');

module.exports = class Logger{
    constructor(name){
        this.name = name;
    }

    _stringifyArguments(args) {
        let str = '';
        if (args && args.length > 0) {
            for (let i = 0; i < args.length; i += 1) {
                if (args[i] && typeof args[i] === 'object') {
                    const stringifiedObject = JSON.stringify(args[i]);
                    str += stringifiedObject === '{}' ? args[i].toString() : stringifiedObject;
                } else if (args[i]) {
                    str += ` ${args[i]}`;
                }
            }
        }
        return str;
    }

    static initializeLogger(logPath, logConfigPath) {
        /**
         * make a log directory, just in case it isn't there.
         */
        try {
            fs.mkdirSync(logPath);
        } catch (e) {
            if (e.code !== 'EEXIST') {
                console.error('Could not set up log directory, error was: ', e);
            }
        }
    
        log4js.configure(logConfigPath);
    }
    
    static getHttpLogger(){
        return log4js.getLogger('http');
    }
    
    getLogger() {
        const closureLogger = log4js.getLogger(this.name);
        const self = this;
        if (global.conf.logLevel) {
            closureLogger.setLevel(global.conf.logLevel);
        }
        return {
            error(...args) {
                closureLogger.error(self._stringifyArguments(args));
            },
            warn(...args) {
                closureLogger.warn(self._stringifyArguments(args));
            },
            info(...args) {
                closureLogger.info(self._stringifyArguments(args));
            },
            debug(...args) {
                closureLogger.debug(self._stringifyArguments(args));
            }
        };
    }
    
    convertToString(data) {
        try {
            return JSON.stringify(data);
        } catch (err) {
            log4js.getLogger('logger').error('Error occured during converting JSON to string:', err);
            return data;
        }
    }
    
    convertToJson(data) {
        try {
            if (data instanceof Object === false) {
                return JSON.parse(data);
            }
            return data;
        } catch (err) {
            log4js.getLogger('logger').error('Error occured during converting data to JSON:', err);
            return data;
        }
    }
}