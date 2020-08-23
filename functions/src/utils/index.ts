/**
 * Check object for all keys
 * @param obj - Object to check for keys
 * @param keysList - List of keys to check for in object
 * @returns Whether or not object has all keys
 */
export function hasAll(obj: any, keysList: string[]): boolean {
  return !!obj && keysList.every((k) => !!obj[k])
}
