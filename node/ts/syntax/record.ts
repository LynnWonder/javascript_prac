// references: https://blog.csdn.net/weixin_38080573/article/details/92838045
// Record 会将一个类型的所有属性值都映射到另一个类型上并创造一个新的类型，先看下Record的源码。
/**
 * Construct a type with a set of properties K of type T
 */
// type Record<K extends keyof any, T> = {
//     [P in K]: T;
// };
// 好像源码也比较简单，即将K中的每个属性([P in K]),都转为T类型。常用的格式如下：
// type proxyKType = Record<K,T>
// 会将K中的所有属性值都转换为T类型，并将返回的新类型返回给proxyKType，K可以是联合类型、对象、枚举…

type petsGroup = 'dog' | 'cat' | 'fish';
interface IPetInfo {
    name:string,
    age:number,
}

type IPets = Record<petsGroup, IPetInfo>;

const animalsInfo:IPets = {
    dog:{
        name:'dogName',
        age:2
    },
    cat:{
        name:'catName',
        age:3
    },
    fish:{
        name:'fishName',
        age:5
    }
};

// type IPetsPlus = Record<petsGroup | ‘otherAnamial’, IPetInfo>; 中除了petsGroup的值之外，还追加了 'otherAnimal’这个值。
type IPetsPlus = Record<petsGroup | 'otherAnimal', IPetInfo>;

const animalsInfoPlus:IPetsPlus = {
    dog:{
        name:'dogName',
        age:2
    },
    cat:{
        name:'catName',
        age:3
    },
    fish:{
        name:'fishName',
        age:5
    },
    otherAnimal:{
        name:'otherAnimalName',
        age:10
    }
};
// 经典的适用 Record 的 Case

enum IHttpMethods {
    GET = 'get',
    POST = 'post',
    DELETE = 'delete',
    PUT = 'put',
}

const methods = ["get", "post", "delete", "put"];

interface IHttpFn {
    <T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
}

type IHttp = Record<IHttpMethods, IHttpFn>;

const httpMethods: IHttp = methods.reduce((map: any, method: string) => {
    map[method] = (url: string, options: AxiosRequestConfig = {}) => {
        const { data, ...config } = options;
        return (axios as any)[method](url, data, config)
            .then((res: AxiosResponse) => {
                if (res.data.errCode) {
                    //todo somethins
                } else {
                    //todo somethins
                }
            });
    }
    return map
}, {})

export default httpMethods;

console.info('animalsInfo===>',animalsInfo);
console.info('animalsInfoPlus===>',animalsInfoPlus);