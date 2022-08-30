export const isArray = (array: any[]): boolean =>
  Object.prototype.toString.call(array) === `[object Array]`;
export const isValidArray = (array: any[]): boolean =>
  isArray(array) && !!array.length;
