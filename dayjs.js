const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

const utc1 = dayjs('2021/11/14 18:26').utc(true).valueOf()
const utc2 = dayjs('2021/11/14 18:26').utc().valueOf()
console.info('utc1===>',utc1);
console.info('utc2===>',utc2);
