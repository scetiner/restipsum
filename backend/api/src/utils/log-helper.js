const fs = require('fs');
const log4js = require('log4js');


function stringifyArguments(args) {
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

function convertJsonToString(data) {
    try {
        return JSON.stringify(data);
    } catch (err) {
        log4js.getLogger('log-helper').error('Error occured during converting JSON to string:', err);
        return data;
    }
}

function convertDataToJson(data) {
    try {
        if (data instanceof Object === false) {
            return JSON.parse(data);
        }
        return data;
    } catch (err) {
        log4js.getLogger('log-helper').error('Error occured during converting data to JSON:', err);
        return data;
    }
}

exports.initializeLogger = (logPath, logConfigPath) => {
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
};

exports.getHttpLogger = loggerName => log4js.getLogger(loggerName);

exports.getLogger = (loggerName) => {
    const closureLogger = log4js.getLogger(loggerName);
    if (global.conf.logLevel) {
        closureLogger.setLevel(global.conf.logLevel);
    }
    return {
        error(...args) {
            closureLogger.error(stringifyArguments(args));
        },
        warn(...args) {
            closureLogger.warn(stringifyArguments(args));
        },
        info(...args) {
            closureLogger.info(stringifyArguments(args));
        },
        debug(...args) {
            closureLogger.debug(stringifyArguments(args));
        }
    };
};

exports.convertToJson = convertDataToJson;
exports.convertToString = convertJsonToString;
