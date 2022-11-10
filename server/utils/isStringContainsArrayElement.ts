export const isStringContainsArrayElement = (str: string, arr: Array<string>) =>
  arr.some((element) => str.includes(element))
