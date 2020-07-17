const test=()=>{
    console.info(1);
    setTimeout(async ()=>{
        await console.info(2);
        console.info(3);
    },100)
}
test();