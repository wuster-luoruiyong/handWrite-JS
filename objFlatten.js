// 对象数组平铺

// 实现一个对象碾平方法 flatten

// function flatten(obj) {
//   // return xxx
// }

// // 用例如下：

const obj = {
  a: {
    b: { b1: 1 },

    c: 2,
  },

  d: [5, 6],

  e: [],

  f: "foo",
  g: [{ h: 7 }, { i: 8 }],
};

// flatten(obj);

// output:

// {

//   'a.b.b1': 1,

//   'a.c': 2,

//   'd[0]': 5,

//   'd[1]': 6,

//   'e[]': null,

//   f: 'foo',

//   g[0].h:7,

//   g[1].i:8

// }

function flatten(obj, parentKey = "", result = {}) {
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;

    const value = obj[key];
    // 构造当前层级的 key
    let currentKey = parentKey ? `${parentKey}.${key}` : key;

    if (typeof value === "object" && value !== null) {
      if (Array.isArray(value)) {
        if (value.length === 0) {
          // 空数组，按照你的示例，输出 'e[]': null
          result[currentKey + "[]"] = null;
        } else {
          // 数组，遍历每个元素
          value.forEach((item, index) => {
            if (typeof item === "object" && item !== null) {
              // 数组项是对象，比如 { h: 7 }
              flatten(item, `${currentKey}[${index}]`, result);
            } else {
              // 数组项是普通值，比如 5, 6
              result[`${currentKey}[${index}]`] = item;
            }
          });
        }
      } else {
        // 普通对象，比如 { b: { b1: 1 } }, { c: 2 }
        flatten(value, currentKey, result);
      }
    } else {
      // 基本类型值，直接记录
      result[currentKey] = value;
    }
  }

  return result;
}

console.log(flatten(obj));
