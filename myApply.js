// 语法
// js
// Copy to Clipboard
// apply(thisArg)
// apply(thisArg, argsArray)
// 参数
// thisArg
// 调用 func 时提供的 this 值。如果函数不处于严格模式，则 null 和 undefined 会被替换为全局对象，原始值会被转换为对象。

// argsArray 可选
// 一个类数组对象，用于指定调用 func 时的参数，或者如果不需要向函数提供参数，则为 null 或 undefined。

// 返回值
// 使用指定的 this 值和参数调用函数的结果。

// 手写apply

Function.prototype.myApply = function (context, args) {
  if (typeof this !== "function") {
    throw new Error(
      "Function.prototype.apply - what is trying to be applied is not callable"
    );
  }
  context = Object(context) || window;
  context.fn = this;
  let result;
  result = context.fn(...args);
  delete context.fn;
  return result;
};

// test
function test(...args) {
  console.log(this, ...args);
}

test.myApply("test", [1, 2, 3]);
