const moment = require('moment')

export const ObjectUtils = {
    copy: data => {
        try {
            return JSON.parse(JSON.stringify(data));
        } catch (error) {
            console.log("object-utils got error during object copy", error);
            return null;
        }
    },
    getFormattedDate: date => {
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
    }
}