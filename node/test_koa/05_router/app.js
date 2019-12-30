const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
const bodyParser = require('koa-bodyparser');

router.get('/', async (ctx, next) => {
    // ctx.router available
    ctx.body='index page';
})
    .post('/post', async ctx=>{
        ctx.body=ctx.request.body;
    });

app
    .use(bodyParser())
    .use(router.routes())
    //Returns separate middleware for responding to OPTIONS requests with an Allow header containing the allowed methods,
    // as well as responding with 405 Method Not Allowed and 501 Not Implemented as appropriate.
    .use(router.allowedMethods());
app.listen(3000,()=>{
    console.info('server is on 3000');
});