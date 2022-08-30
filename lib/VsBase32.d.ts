/**
 * Base 32 encode
 * @param str
 * @returns {string} - Base 32 encoded string
 */
declare const base32Encode: (str: string) => string;
/**
 * Base 32 decode
 * @param base32EncodedString - base 32 encoded string
 * @returns {string | never} - returned decoded base 32 string
 * @throws {Error}
 */
declare const base32Decode: (base32EncodedString: string) => string | never;
export { base32Encode, base32Decode };
