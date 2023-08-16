import numeral from "numeral"

export const NumericFormatter = {
    floating: (value) => {
        return numeral(value).format('0.0a');
    },
    decimal: (value) => {
        return numeral(value).format('0a');
    },
    percent: (value) => {
        return numeral(value).format('0.0%');
    }
}