// json 平铺展开
function getKey(v, k) {
    if (k === void 0) { k = ''; }
    var obj = {};
    for (var key in v) {
        var rKey = k + key;
        if (k.indexOf('[') !== -1) {
            rKey += ']';
        }
        if (v[key] instanceof Array) {
            obj[rKey] = getKey(v[key], rKey + "[");
        }
        else {
            obj[rKey] = v[key];
        }
    }
    return obj;
}
var a = {
    name: '124',
    ang: 1,
    arr: [1, 2, 3, 4, 5, 6],
    arr1: [['a', 'b'], ['c', 'd']]
};
console.info(a, getKey(a));
