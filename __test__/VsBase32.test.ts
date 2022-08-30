import { base32Encode, base32Decode } from "../src";

describe("Base 32 encode and decode", () => {
  const string = "Cat";
  const _base32EncodedString = "INQXI===";
  test("Base 32 encode should pass", () => {
    const base32EncodedString = base32Encode(string);
    expect(base32EncodedString).toBe(_base32EncodedString);
  });

  test("Base 32 encode should fail", () => {
    const base32EncodedString = base32Encode(string);
    expect(base32EncodedString === _base32EncodedString.toLowerCase()).toBe(
      false
    );
  });

  test("Base 32 decode should pass", () => {
    const base32DecodedString = base32Decode(_base32EncodedString);
    expect(base32DecodedString).toBe(string);
  });

  test("Base 32 decode should fail", () => {
    const base32DecodedString = base32Decode(_base32EncodedString);
    expect(base32DecodedString === string.toLowerCase()).toBe(false);
  });
});
