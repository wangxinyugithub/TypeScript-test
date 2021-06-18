// 引入一个包
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // 入口文件
    entry: './src/index.ts',
    // 打包文件所在目录
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        // 不实用箭头函数 兼容ie
        environment: {
            arrowFunction: false,
            const: false
        }
    },
    // 打包时所使用的模块
    module: {
        // 指定加载的规则
        rules: [
            {
                // 规则生效的文件
                test: /\.ts$/,
                // 要是用的loader
                use: [
                    {
                        // 配置loader
                        loader: 'babel-loader',
                        options: {
                            // 设置预定义环境
                            presets: [
                                [
                                    // 指定环境插件
                                    '@babel/preset-env',
                                    // 配置信息
                                    {
                                        // 要兼容的目标管理器
                                        targets: {
                                            chrome: '58',
                                            ie: '11'
                                        },
                                        // 指定corejs的版本 兼容老版本浏览器
                                        'corejs': '3',
                                        // 使用corejs的方式 usage => 按需加载
                                        'useBuiltIns': 'usage'
                                    }
                                ]
                            ]
                        }
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            // 指定特定的ts编译配置，为了区分脚本的ts配置
                            configFile: path.resolve(__dirname, './tsconfig.json'),
                        }
                    }
                ],
                // 要排除的文件
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    },
    // 配置webpack插件
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ],
    // 用来设置引用模块
    resolve: {
        extensions: ['.ts', '.js']
    }
};
