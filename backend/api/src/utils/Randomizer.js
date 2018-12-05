const uuidv4 = require('uuid/v4');

module.exports = class Randomizer {
    constructor() {

    }

    getRandomIP() {
        return this.getRandomInt(10, 255) + '.' + this.getRandomInt(0, 255) + '.' + this.getRandomInt(0, 255) + '.' + this.getRandomInt(0, 255);
    }

    getRandomEmail() {
        return this.getRandomString(5, 10) + "@restipsum.com";
    }

    getRandomUUID() {
        return uuidv4();
    }

    getRandomDate(min, max, isText) {
        var date = new Date(this.getRandomInt(min, max));
        return isText ? date : date.getTime();
    }

    getRandomUrl() {
        return "http://www." + this.getRandomString(10, 15).toLowerCase() + ".com";
    }

    getRandomBool() {
        return Math.floor(Math.random() * (10000 - 1) + 234) % 2 === 0;
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    getRandomString(min, max, hasBlank) {
        return this.getRandomText(this.getRandomInt(min, max), hasBlank);
    }

    getRandomText(length, hasBlank) {
        var consonants = hasBlank ? 'bcdfghjk lmnpqrstvwxyz' : 'bcdfghjklmnpqrstvwxyz',
            vowels = 'aeiou',
            rand = function (limit) {
                return Math.floor(Math.random() * limit);
            },
            i, word = '',
            length = parseInt(length, 10),
            consonants = consonants.split(''),
            vowels = vowels.split('');
        for (i = 0; i < length / 2; i++) {
            var randConsonant = consonants[rand(consonants.length)],
                randVowel = vowels[rand(vowels.length)];
            word += (i === 0) ? randConsonant.toUpperCase() : randConsonant;
            word += i * 2 < length - 1 ? randVowel : '';
        }

        word = word.trim();

        if (hasBlank) {
            word = word.split('');
            var evens = [8, 10, 12, 14][this.getRandomInt(0, 3)];
            for (var index = 0; index < word.length; index++) {
                if (index != 0 && index % evens == 0) {
                    word[index] = " ";
                }
            }
        }
        word = word.constructor.name == 'Array' ? word.join('') : word;
        var diff = length - word.length;
        for (var index = 0; index < diff; index++) {
            word += 'aeioubcdfghjklmnpqrstvwxyz'[rand(25)];
        }

        return word;
    }

    breakWord(word) {
        word[word.substring(0, Math.floor(length / 2)), word.substring(Math.floor(length / 2) + 1, length - 1)].join(" ");
        return word;
    }
}
