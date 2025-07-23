// 语法
// js
// Copy to Clipboard
// call(thisArg)
// call(thisArg, arg1)
// call(thisArg, arg1, arg2)
// call(thisArg, arg1, arg2, /* …, */ argN)
// 参数
// thisArg
// 在调用 func 时要使用的 this 值。如果函数不在严格模式下，null 和 undefined 将被替换为全局对象，并且原始值将被转换为对象。

// arg1, …, argN 可选
// 函数的参数。

// 返回值
// 使用指定的 this 值和参数调用函数后的结果

// 手写call
/**
 *
 * @param {*} context 调用func要使用的 this 值
 * @param  {...any} args 函数的参数
 * @returns {*} 使用指定的 this 值和参数调用函数后的结果
 */
Function.prototype.myCall = function (context, ...args) {
  // 	获取调用的func
  const fn = this;
  // 判断是不是函数
  if (typeof fn !== "function") {
    throw new TypeError("Error");
  }
  // 通过传入的值，获取在哪个元素使用func
  context = Object(context) || window;
  // 给context添加一个属性，属性值为func,使它可以调用
  context.fn = fn;
  // 执行func，并传入参数
  let result = context.fn(...args);
  // 删除添加的属性
  delete context.fn;
};

// 测试
function fn(name) {
  console.log(this.name + 1, arguments);
}
fn.myCall({ name: 1 }, 2);
fn.call({ name: 1 }, 2);
