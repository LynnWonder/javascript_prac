const jq=require('jquery');
// 获取加载机制中某个包的入口
/**
 * 当然一般情况下可以通过这种require.resolve('jquery')方式知道一个包的入口文件，
 * 可以通过看package.json里面的main属性
 * main属性失效的时候，一般默认查找index.js
 */
console.info('entry is:',require.resolve('jquery'));
console.info(jq);