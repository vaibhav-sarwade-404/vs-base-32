"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base32Decode = exports.base32Encode = void 0;
var logger_1 = require("@vs-org/logger");
var constants_1 = require("./utils/constants");
var validation_1 = require("./utils/validation");
var log = logger_1.Logger.getInstance("info").getLogger();
/**
 * Helper function to fill array with provided element for number of times.
 * @param array - Array to fill values in
 * @param fill - Value to fill array with
 * @param fillNumerOfTime - Number of times value needs to be filled in Array
 * @param fillAt - Fill at position, start or end
 * @returns {Array} - returns modified array
 */
var fillArray = function (array, fill, fillNumerOfTime, fillAt) {
    if (!(0, validation_1.isValidArray)(array)) {
        throw new Error("Provided array is invalid");
    }
    if (fillNumerOfTime <= 0) {
        return array;
    }
    for (var i = 0; i < fillNumerOfTime; i++) {
        if (fillAt === "start") {
            array.unshift(fill);
        }
        else {
            array.push(fill);
        }
    }
    return array;
};
/**
 * Base 32 encode
 * @param str
 * @returns {string} - Base 32 encoded string
 */
var base32Encode = function (str) {
    /**
     * RFC 4648 (Reference from mobilefish.com https://www.youtube.com/watch?v=Va8FLD-iuTg&t=132s)
     * 1. "Cat"
     * 2. convert string to ASCII decimal values [67, 97, 116]
     * 3. Cat in binary format [01000011, 01100001, 01110100]
     *
     * 1. Convert input byte stream to group of 5 bytes. And fill it with empty if less bytes
     *    [01000011, 01100001, 01110100, xxxxxxxx, xxxxxxxx]
     * 2. Divide this group into 8 chunks of 5 bits
     *    [01000, 01101, 10000, 10111, 0100x, xxxxx, xxxxx, xxxx]
     * 3. If a chunk has actual bits and empty bits then replace empty bits with 0
     *    [01000, 01101, 100001, 01110, **01000**, xxxxx, xxxxx, xxxx]
     * 4. convert each 5 bits to its decimal value (0-31), if empty bits then replace with =
     *    [8, 13, 16, 23, 8, =, =, =]
     * 5. In base 32 symbol char map each decimal value to its corrosponding character
     *    [I,N,Q,X,I,=,=,=]
     */
    if (!str)
        return str;
    var strArray = str.split("");
    var asciiArray = strArray.map(function (char) { return char.charCodeAt(0); });
    var binaryArray = asciiArray.map(function (asciiCharCode) {
        return asciiCharCode.toString(2).padStart(8, "0");
    });
    if (binaryArray.length < 5) {
        binaryArray = fillArray(binaryArray, "xxxxxxxx", 5 - binaryArray.length, "end");
    }
    var binaryDigitsArray = binaryArray.join("").split("");
    var binary5BitsArray = [];
    var binary5BitChunk = "";
    for (var _i = 0, binaryDigitsArray_1 = binaryDigitsArray; _i < binaryDigitsArray_1.length; _i++) {
        var binaryDigit = binaryDigitsArray_1[_i];
        binary5BitChunk += binaryDigit;
        if (binary5BitChunk.length === 5) {
            binary5BitsArray.push(binary5BitChunk);
            binary5BitChunk = "";
        }
    }
    if (binary5BitChunk && binary5BitChunk.length < 5) {
        binary5BitsArray.push(binary5BitChunk.padEnd(5, "0"));
    }
    if (binary5BitsArray.length < 8) {
        binary5BitsArray = fillArray(binary5BitsArray, "xxxxx", 8 - binaryArray.length, "end");
    }
    var asciiDecimalArray = binary5BitsArray.map(function (binary5BitsChunk) {
        return binary5BitsChunk === "xxxxx"
            ? "="
            : parseInt(binary5BitsChunk.replace(/x/g, "0"), 2);
    });
    return asciiDecimalArray.reduce(function (encodedStr, asciiDecimal) {
        encodedStr +=
            asciiDecimal === "=" ? "=" : constants_1.BASE_32_ALPHABATE[Number(asciiDecimal)];
        return encodedStr;
    }, "");
};
exports.base32Encode = base32Encode;
/**
 * Base 32 decode
 * @param base32EncodedString - base 32 encoded string
 * @returns {string | never} - returned decoded base 32 string
 * @throws {Error}
 */
var base32Decode = function (base32EncodedString) {
    if (!base32EncodedString) {
        log.error("Provided encoded string is not valid");
        throw new Error("Provided string is not a valid base 32 encoded string");
    }
    for (var _i = 0, base32EncodedString_1 = base32EncodedString; _i < base32EncodedString_1.length; _i++) {
        var base32EncodedChar = base32EncodedString_1[_i];
        if (base32EncodedChar !== "=" &&
            !constants_1.BASE_32_ALPHABATE.includes(base32EncodedChar)) {
            throw new Error("Provided string is not a valid base 32 encoded string");
        }
    }
    var base32Alphabate = constants_1.BASE_32_ALPHABATE.split("");
    var base32EncodedStringArray = base32EncodedString.toUpperCase().split("");
    var base32NumberArray = base32EncodedStringArray.map(function (base32Char) {
        return base32Alphabate.includes(base32Char)
            ? base32Alphabate.indexOf(base32Char)
            : "=";
    });
    var binaryArray = base32NumberArray.map(function (number) {
        try {
            if (number === "=") {
                return "x";
            }
            return Number(number).toString(2).padStart(5, "0");
        }
        catch (error) {
            return number;
        }
    });
    var binaryString = binaryArray.join("");
    var binary8BiArray = [];
    for (var index = 0; index < binaryString.length; index = index + 8) {
        var subStr = binaryString.substring(index, index + 8);
        // To ignore empty bits so that it would not end up in buffer
        if (subStr.includes("x")) {
            continue;
        }
        binary8BiArray.push(parseInt(binaryString.substring(index, index + 8), 2));
    }
    return String.fromCharCode.apply(String, binary8BiArray);
};
exports.base32Decode = base32Decode;
