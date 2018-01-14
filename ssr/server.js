const fs = require('fs')
const path = require('path')
const express = require('express')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
// 引用express-session模块
var session = require('express-session')
const app = express()
//服务端渲染
const distPath = path.resolve(__dirname, './dist')
const { createBundleRenderer } = require('vue-server-renderer')
const templatePath = path.resolve(distPath, 'index.server.html')
const fileServerPath = path.resolve(distPath, 'vue-ssr-server-bundle.json')
//const fileClientPath = path.resolve(distPath, 'vue-ssr-client-manifest.json')
const LRU = require('lru-cache')

//
const template = fs.readFileSync(templatePath, 'utf-8')
const bundle = require(fileServerPath)
//const clientManifest = require(fileClientPath)
let renderer = createRenderer(bundle, {
    template,
    //clientManifest
})

//post body体解析
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
//实例化cookie
app.use(cookieParser())

//实例化session
app.use(session({
    name: 'cookieName',
    secret: 'cookieSignName',
    cookie: {'maxAge':30*1000},//多长时间过期
    resave: true, // 即使 session 没有被修改，也保存 session 值，默认为 true
    saveUninitialized: false //
}))

//将静态资源文件所在的目录作为参数传递给 express.static 中间件就可以提供静态资源文件的访问了
app.use('/',express.static(distPath))
app.use('/css/fonts',express.static(path.resolve(distPath,'fonts')))
app.use('/favicon.ico',express.static(path.resolve(distPath,'favicon.ico')))
app.use('/service-worker.js', express.static(path.resolve(distPath,'service-worker.js')))
//
app.use(function(req, res) {

    //
    if(req.url == '/login') {
        if(req.body.user == 'sheng'&&req.body.password=='123') {
            req.session.name = req.body.user+req.body.password
            res.send('ok')
        }else {
            if(req.body.user == 'sheng') {
                res.status(300).send('密码错误')
            }else {
                res.status(300).send('用户名错误')
            }  
        }
        
    }else {
        //
        if(req.url == '/index' || req.session.name) {
            //
            render(req, res)
        }else {
            res.redirect('/index')
        }
    }
    
})
//
function createRenderer (bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    // for component caching
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: distPath,
    // recommended for performance
    runInNewContext: false
  }))
}
//
function render(req, res) {
    if(!renderer) {
        res.end("服务器正在渲染，请等待！！！")
    }
    //
    const context = {
        title: 'Vue HN 2.0', // default title
        url: req.url
    }
    //
    renderer.renderToString(context,(err, html) => {
        if (err) {
            console.log(err.message)
            res.send("服务器渲染错误")
        }
        res.send(html)
    })
}
//
const port = process.env.PORT || 9000
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})