// try {
//     (async () => {
//         throw new Error("err"); // uncaught
//     })();
// }catch(e) {
//     console.log(e)
// }

(async () => {
    throw new Error("err");
})().catch((e) => {
    console.log('===>error:',e); // caught
});