// 引入一个包
const path = require("path")
// 引入html插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

// webpack中的所有的配置信息都应该写在 module.exports中
module.exports = {

    optimization:{
        minimize: false // 关闭代码压缩，可选
    },

    // 指定入口文件
    entry: "./src/index.ts",

    // 指定打包文件所在目录
    output: {
        // 指定打包文件的目录
        path: path.resolve(__dirname,'dist'),
        // 打包后的文件
        filename: "bundle.js",
        environment: {
            arrowFunction: false // 关闭webpack的箭头函数，可选
        }
    },

    // 指定webpack打包时要使用的模块
    module: {
        // 指定要加载的规则
        rules: [
            {
                // test指定的是规则生效的文件
                test: /\.ts$/,
                // 要使用的loader
                use: [
                    // 配置babel
                    {
                        // 指定加载器
                        loader: 'babel-loader',
                        // 设置babel
                        options: {
                            // 设置预定义环境
                            presets: [
                                [
                                    // 指定环境插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的目标浏览器
                                        "targets": {
                                            "chrome":"88",
                                            "ie": "11"
                                        },
                                        // 指定corejs的版本
                                        "corejs": "3",
                                        // 使用corejs的方法 "usage"表示按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader',
                ],
                //要排除的文件夹
                exclude: /node_modules/
            },

            // 设置less文件处理
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    // 引入 postcss
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ],
                            }
                        }
                    },
                    "less-loader"
                ]// 先经过less-loader，再经过css-loader, style-loader
            }
        ]
    },

    // 配置webpack插件
    plugins: [
        
        new CleanWebpackPlugin(),
        // 自动生成index.html
        new HtmlWebpackPlugin({
            // 按照模板生成index.html
            template: './src/index.html'
        })
    ],

    // 用来设置引用模块
    resolve: {
        extensions: ['.ts','.js'] // 这两种文件可以作为模块来引用
    },

    mode: 'development'//设置mode
}