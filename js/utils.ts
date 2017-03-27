function clone(obj: Object) {
  return JSON.parse(JSON.stringify(obj));
}

function deepEqual(obj1: Object, obj2: Object): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function pad(num: number, size: number): string {
  let s: string = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

export default {
  clone,
  deepEqual,
  pad,
};