// 语法
// js
// Copy to Clipboard
// bind(thisArg)
// bind(thisArg, arg1)
// bind(thisArg, arg1, arg2)
// bind(thisArg, arg1, arg2, /* …, */ argN)
// 参数
// thisArg
// 在调用绑定函数时，作为 this 参数传入目标函数 func 的值。如果函数不在严格模式下，null 和 undefined 会被替换为全局对象，并且原始值会被转换为对象。如果使用 new 运算符构造绑定函数，则忽略该值。

// arg1, …, argN 可选
// 在调用 func 时，插入到传入绑定函数的参数前的参数。

// 返回值
// 使用指定的 this 值和初始参数（如果提供）创建的给定函数的副本。

// 手写bind

Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new Error(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }
  const fn = this;
  // 返回的新函数,判断是否要返回新的函数，避免重复创建
  const boundFunction = function (...innerArgs) {
    const isNew = this instanceof boundFunction;
    return fn.apply(isNew ? this : context, args.concat(innerArgs));
  };
  // 确保绑定后的函数能够正确继承原函数的原型链
  if (fn.prototype) {
    boundFunction.prototype = Object.create(fn.prototype);
  }
  // 返回新函数
  return boundFunction;
};

//test
function test(...args) {
  console.log(this.name, ...args);
}

test.myBind({ name: "test" }, 1, 2, 3)();
