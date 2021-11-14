// @ts-ignore
type RepeatN<Item, N extends number, Tuple extends any[] = []> = Tuple['length'] extends N ? Tuple : RepeatN<Item, N, [...Tuple, Item]>;


// @ts-ignore
type res = RepeatN<'a', 3>;

const ttt:res = [1,2];

console.info(ttt);