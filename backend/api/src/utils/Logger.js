import fs from 'fs';
import log4js from 'log4js';

export default class Logger {
    constructor(name) {
        this.name = name;
        this.logger = log4js.getLogger(name);
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

    static async initializeLogger(logPath, logConfigPath) {
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

        try {
            const config = await import(logConfigPath, { assert: { type: 'json' } });
            log4js.configure(config.default);
        } catch (e) {
            console.error('Could not configure log4js, error was: ', e);
        }
    }

    static getHttpLogger() {
        return log4js.getLogger('http');
    }

    getLogger() {
        const self = this;

        // Set log level from config if available
        if (global.conf && global.conf.logLevel) {
            this.logger.level = global.conf.logLevel.toLowerCase();
        }

        return {
            error(...args) {
                self.logger.error(self._stringifyArguments(args));
            },
            warn(...args) {
                self.logger.warn(self._stringifyArguments(args));
            },
            info(...args) {
                self.logger.info(self._stringifyArguments(args));
            },
            debug(...args) {
                self.logger.debug(self._stringifyArguments(args));
            }
        };
    }

    convertToString(data) {
        try {
            return JSON.stringify(data);
        } catch (err) {
            log4js.getLogger('logger').error('Error occurred during converting JSON to string:', err);
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
            log4js.getLogger('logger').error('Error occurred during converting data to JSON:', err);
            return data;
        }
    }
}