// 常见的深拷贝方法和弊端;
// 1. JSON.parse(JSON.stringify(obj))
// 这是最常见也最简单的深拷贝方法之一。

// 示例：
// const obj = { a: 1, b: { c: 2 } };
// const copy = JSON.parse(JSON.stringify(obj));
// copy.b.c = 3;
// console.log(obj.b.c); // 2，原对象未受影响
// 优点：
// 简单易用，适用于大多数普通对象和数组。
// 不需要引入第三方库。
// 弊端（局限性）：
// 无法拷贝函数、Symbol、undefined

// 这些值在序列化过程中会被忽略或转为 null。
// const obj = { a: () => {}, b: Symbol('x'), c: undefined };
// const copy = JSON.parse(JSON.stringify(obj));
// console.log(copy); // { a: undefined, b: undefined, c: undefined } 或直接丢失
// 无法处理循环引用（Circular Reference）

// 如果对象中存在循环引用（如 obj.a = obj），会抛出错误：
// const obj = { a: 1 };
// obj.self = obj;
// JSON.parse(JSON.stringify(obj)); // TypeError: Converting circular structure to JSON
// 特殊对象类型丢失或出错

// 如 Date 对象会被转成字符串，RegExp、Map、Set、Blob、File 等都会丢失或变成空对象 {}。
// const obj = { date: new Date() };
// const copy = JSON.parse(JSON.stringify(obj));
// console.log(copy.date); // 字符串，不是 Date 对象

//2.使用第三方库--如lodash
// 手写深拷贝
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  // 解决循环引用
  if (hash.has(obj)) return hash.get(obj);

  const clone = Array.isArray(obj) ? [] : {};
  hash.set(obj, clone);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], hash);
    }
  }
  return clone;
}

let obj = [1, 2, 3, 4, { a: 1, b: 2 }];
let newObj = deepClone(obj);
obj[4].a = 2;
console.log(newObj);
