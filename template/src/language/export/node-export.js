/*
 * @Description: node导出语言文件
 * @Author: 管铭钊
 * @Date: 2019/11/2
 */
import zh from '../zh'

const nodeXlsx = require('node-xlsx')
const fs = require('fs')
const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}


// 接收参数
rl.setPrompt('请输入要导出的模块名> ')
rl.prompt()

rl.on('line', function (line) {
    if (line.trim() in zh) {
        // 准备数据
        const data = Object.keys(zh[line]).map(key => {
            return [key, zh[line][key]]
        })
        const buffer = nodeXlsx.build([{ name: 'lang', data }])

        const storeDirectory = resolve('export/resource')

        if (fs.existsSync(storeDirectory)) {
            fs.writeFileSync(`${storeDirectory}/${line}_${+new Date()}.xlsx`, buffer)
            rl.close()
        } else {
            fs.mkdir(storeDirectory, function (err) {
                if (err) {
                    return err
                }
                fs.writeFileSync(`${storeDirectory}/${line}_${+new Date()}.xlsx`, buffer)
                rl.close()
            })
        }
    } else {
        console.log('没有找到模块！')
        rl.prompt()
    }
})
rl.on('close', function () {
    console.log('--文件已导出至src/language/export/resource--')
    process.exit(0)
})
