export const simpleUnique = <T = any>(array: T[]) => [...new Set(array)];

export const blockSpecialChars = (event: KeyboardEvent) => {
  let k = event.key;
  console.log(k);
};
