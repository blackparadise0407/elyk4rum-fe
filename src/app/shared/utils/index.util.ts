/* eslint-disable @typescript-eslint/no-explicit-any */
export const simpleUnique = <T = any>(array: T[]) => [...new Set(array)];

export const blockSpecialChars = (event: KeyboardEvent) => {
  let k = event.key;
  console.log(k);
};

export const getWordCount = (str: string) => str.split(' ').length;

export const get = (obj: any, path: string, defaultValue: any = undefined) => {
  if (!path) return undefined;

  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);

  const result = (pathArray as string[]).reduce(
    (prevObj, key) => prevObj && prevObj[key],
    obj
  );

  return result == undefined ? defaultValue : result;
};
