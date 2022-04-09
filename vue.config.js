module.exports = {
    publicPath: "/", //打包后的配置文件 (启动页的地址)
    outputDir: 'dist', //打包之后的目录
    lintOnSave: true, //保存的时候监测语法格式
    devServer: {
        open: true, //默认打开页面
        host: '127.0.0.1', //0.0.0.0 本机地址
        port: 5000,
        https: false, //不支持https
        proxy: {
            "/myApi": {
                target: "http://127.0.0.1:3000", //目标地址
                changeOrigin: true, //是否跨域
                pathRewrite: {
                    //对什么类的服务器匹配
                    "^/myApi": ''
                }
            }
        }

    }
}