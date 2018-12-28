var Randomizer = require('./Randomizer');
var validator = require('validator');
var moment = require('moment');

module.exports = class SchemaUtils {
    constructor() {
        this.randomizer = new Randomizer();
    }

    _convertToSampleItem(item) {
        var extracted = {};
        if (!item) {
            return extracted;
        }
        switch (item.type) {
            case "bool":
                extracted = this.randomizer.getRandomBool();
                break;
            case "ip":
                extracted = this.randomizer.getRandomIP();
                break;
            case "email":
                extracted = this.randomizer.getRandomEmail();
                break;
            case "uuid":
                extracted = this.randomizer.getRandomUUID();
                break;
            case "date":
                extracted = this.randomizer.getRandomDate(item.min, item.max, item.isText);
                break;
            case "url":
                extracted = this.randomizer.getRandomUrl();
                break;
            case "dataUri":
                extracted = item.values[0];
                break;
            case "enum":
                extracted = item.values[this.randomizer.getRandomInt(0, item.values.length)];
                break;
            case "str":
                extracted = this.randomizer.getRandomString(item.min, item.max, item.has_blank);
                break;
            case "int":
                extracted = this.randomizer.getRandomInt(item.min, item.max);
                break;
            case "float":
                extracted = this.randomizer.getRandomFloat(item.min, item.max);
                break;
            case "objectId":
                extracted = this.randomizer.getRandomObjectId();
                break;
            case "model":
                // extracted[item.name] = convertToSampleItem(item.model);
                var data = {};
                item.model.forEach(element=> {
                    data[element.name] = this._convertToSampleItem(element);
                });
                extracted = data;
                break;
            case "list":
                // extracted[item.name] = convertToSampleItem(item.model);
                var data = [];
                item.max = item.max > 100 ? 100 : item.max;
                var times = this.randomizer.getRandomInt(item.min, item.max);
                for (var index = 0; index < times; index++) {
                    var innerModel = {};
                    if (item.model.constructor.name == 'Array') {
                        item.model.forEach(element=> {
                            innerModel[element.name] = this._convertToSampleItem(element);
                        });
                        data.push(innerModel);
                    } else {
                        data.push(this._convertToSampleItem(item.model));
                    }
    
                }
                extracted = data;
                break;
            default:
                return extracted;
        }
    
        return extracted;    
    }

    _extractStringDetail(item, val) {
        if (val) {
            if (validator.isEmail(val)) {
                item.type = "email";
                item.min = undefined;
                item.max = undefined;
            } else if (validator.isIP(val)) {
                item.type = "ip";
                item.min = undefined;
                item.max = undefined;
            } else if (validator.isURL(val)) {
                item.type = "url";
                item.min = undefined;
                item.max = undefined;
            } else if (moment(new Date(val)).isValid()) {
                item.type = "date";
                item.min = new Date(val).getTime();
                item.max = item.min + (1000 * 60 * 60 * 24 * 7);
                item.isText = true;
            } else if (validator.isUUID(val)) {
                item.type = "uuid";
                item.min = undefined
                item.max = undefined;
            } else if (validator.isDataURI(val)) {
                item.type = "dataUri";
                item.values = [val];
            } else if (validator.isMongoId(val)) {
                item.type = "objectId";
                item.min = undefined
                item.max = undefined;
            } else {
                item.type = "str";
                item.max = val.length;
                item.min = item.min >= item.max ? item.max - 1 : item.min;
                item.has_blank = val.includes(' ');
            }
    
            return item;
        } else {
            return this.convertToSchema(item);
        }
    }

    convertToSchema(schema) {
        var items = [];
        var tp = schema.constructor.name;
        if (tp == "Object") {
            for (var key in schema) {
                if (schema.hasOwnProperty(key)) {
                    var item = { name: key, min: 3, max: 10 };
                    if (schema[key].constructor.name == 'Boolean') {
                        item.type = "bool";
                        item.min = undefined;
                        item.max = undefined;
                    } else if (schema[key].constructor.name == 'String') {
                        item = this._extractStringDetail(item, schema[key]);
                    } else if (schema[key].constructor.name == 'Number') {
                        item.type = schema[key] % 1 === 0 ? "int" : "float";
                        item.max = schema[key];
                        item.min = item.min >= item.max ? item.max - 1 : item.min;
                    } else if (schema[key].constructor.name == 'Object') {
                        item.type = "model";
                        item.min = 1;
                        item.max = 1;
                        item.model = this.convertToSchema(schema[key]);
                    } else if (schema[key].constructor.name == 'Array') {
                        item.type = "list";
                        item.min = 1;
                        item.max = schema[key].length;
                        item.model = this.convertToSchema(schema[key][0]);
                    }
                    items.push(item);
                }
            }
        } else if (tp == "Array") {
            var item = { name: key, min: 3, max: 10 };
            item.type = "list";
            item.min = 1;
            item.max = schema.length;
            item.model = this.convertToSchema(schema[0]);
            return item;
        } else {
            var item = { name: key, min: 3, max: 10 };
            if (schema.constructor.name == 'Boolean') {
                item.type = "bool";
                item.min = undefined;
                item.max = undefined;
            } else if (schema.constructor.name == 'String') {
                if (schema[key]) {
                    item = this._extractStringDetail(item, schema[key]);
                } else {
                    item.type = "str";
                    item.max = schema.length;
                    item.min = item.min >= item.max ? item.max - 1 : item.min;
                    item.has_blank = schema.includes(' ');
                }
            } else if (schema.constructor.name == 'Number') {
                item.type = schema % 1 === 0 ? "int" : "float";
                item.max = schema;
                item.min = item.min >= item.max ? item.max - 1 : item.min;
            }
            return item;
        }
    
    
        return items;
    }

    getSampleIpsum(schema) {
        var data = {};
        var tp = schema.constructor.name;
        if (tp == 'Array') {
            schema.forEach(element=> {
                data[element.name] = this._convertToSampleItem(element);
            });
            return data;
        } else {
            return this._convertToSampleItem(schema);
        }    
    }

}

