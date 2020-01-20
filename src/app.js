const Koa = require('koa');
const Router = require('@koa/router');
const render = require('koa-ejs');
const path = require('path');
const bodyParser = require('koa-bodyparser');

const verify = require('./verify');

const app = new Koa();
const router = new Router();

app.use(bodyParser());

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'base',
    viewExt: 'html',
    cache: false,
    debug: false
});

router.get('/', async ctx => {
    await ctx.render('index');
});

router.post('/signin', async ctx => {
    const { nation, code } = ctx.request.body;
    const verified = await verify(nation, code);
    ctx.body = verified;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(8080, () => (console.log('Server starting in port 8080...')));
