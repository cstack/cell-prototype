function deepEqual(obj1: Object, obj2: Object): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export default {
  deepEqual: deepEqual,
};