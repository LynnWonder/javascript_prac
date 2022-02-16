// 原数据结构
const baijingMap = {
    suzhoujie: 1,
    haidianhuangzhou:2,
    zhichunli:3,
};

const baijingMapNow = {
    suzhoujie: {
        name: 'suzhoujie',
        id: 1,
    },
    haidianhuangzhuang: {
        name: 'haidianhuangzhuang',
        id: 2,
    },
    zhichunlu: {
        name: 'zhichunlu',
        id: 3,
    }
};

function adapter(maps) {
    const res = {};
    Object.keys(maps).forEach(function(keys){
        const key = maps[keys].name;
        const val = maps[keys].id;
        res[key] = val;
    });
    return res;
}

console.info(adapter(baijingMapNow));