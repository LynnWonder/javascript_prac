## javascript 设计模式与开发实践

备注：

1. `js/` 下每个文件夹对应《javascript 设计模式与开发实践》中每个章节的一些示例代码或一些衍生例子
2. 部分 es7 才支持的属性使用的 ts 文件，直接运行 `tsc` 即会应用 `tsconfig.json` 中的配置。如果直接运行 `tsc xx.ts` 也会导致无法使用一些新特性（比如 decorator），
这种情况可以使用 [Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html) 中介绍的 `tsc --target ES5 --experimentalDecorators xx.ts`
