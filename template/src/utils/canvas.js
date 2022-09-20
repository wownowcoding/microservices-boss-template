/*
 * @Description: canvas相关工具函数
 * @Author: 管铭钊
 * @Date: 2019/6/17
 */

export const drawWrapText = (ctx, text, options = {}) => {
    // 解析处理参数
    let { x, y, maxWidth, lineHeight } = options
    const canvas = ctx.canvas

    // 参数默认值
    if (maxWidth === undefined) {
        maxWidth = (canvas && canvas.width) || 300
    }
    if (lineHeight === undefined) {
        const canvasLineHeight = canvas || parseInt(window.getComputedStyle(canvas).lineHeight)
        const bodyLineHeight = parseInt(window.getComputedStyle(document.body).lineHeight)
        lineHeight = canvasLineHeight || bodyLineHeight || 16
    }
    // 参数是否合法
    const paramsValidator = {
        ctx: () => !ctx,
        text: () => typeof text !== 'string',
        options: () => !options,
        optionsX: () => typeof options.x !== 'number',
        optionsY: () => typeof options.y !== 'number',
    }
    for (let key in paramsValidator) {
        const isIllegal = paramsValidator[key]()
        if (isIllegal) {
            return false
        }
    }

    // 累加每个字符宽度并和maxWidth对比
    // 大于则换行绘制，小于则绘制第一行/最后一行
    const charArr = text.split('');
    let lineCount = 1
    let currentLine = ''

    charArr.forEach(char => {
        const compareLine = currentLine + char
        const textWidth = ctx.measureText(compareLine).width
        if (textWidth > maxWidth) {
            lineCount++
            ctx.fillText(currentLine, x, y)
            // 重新累加
            currentLine = char
            y += lineHeight
        } else {
            currentLine = compareLine
        }
    })
    ctx.fillText(currentLine, x, y)

    return lineCount
}
