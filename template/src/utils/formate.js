const formatDate = function(getDate, fmt = 'yyyy-MM-dd hh:mm:ss') {
    if (typeof getDate === 'string') return getDate   // 过滤字符串
    if (!getDate) return
    let date = new Date(getDate)
    let o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds(), // 毫秒
    }
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length),
        )
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1
                    ? o[k]
                    : ('00' + o[k]).substr(('' + o[k]).length),
            )
    }
    return fmt
}

const getFormatParams = function(noPage = '', dateStatus = true) {
    // noPage 不传分页
    // dateStatus 时间格式，默认时间戳
    const isDateFormate = /^(\d{4})-(\d{2})-(\d{2})$/
    const data = this.$refs.VipayTable.getParams()
    const assignData = {...Object.assign(data.form, data.page)}
    const timeArr = []

    Object.keys(assignData).map((item, index) => {
        if (isDateFormate.test(assignData[item]) && dateStatus) {
            timeArr.push(item)
        }
    })
    if (timeArr.length === 1) {
        // type='date'
        assignData[timeArr[0]] = Date.parse(new Date(assignData[timeArr[0]]))
    } else if (timeArr.length === 2) {
        // type='dateRange'
        timeArr.forEach(item => {
            formatTime(assignData, item)
        })
    } else if (timeArr.length > 2) {
        // type='date' &&  type='dateRange'
        timeArr.forEach(item => {
            formatTime(assignData, item)
             if (item.toLowerCase().indexOf('start') === -1 && item.toLowerCase().indexOf('end') === -1) {
                assignData[item] = Date.parse(new Date(assignData[item]))
            }
        })
    }
    if (noPage) {
        delete assignData.pageNum
        delete assignData.pageSize
    }
    return assignData
}

function formatTime (assignData, item) {
    if (item.toLowerCase().indexOf('start') > -1) {
        assignData[item] = new Date(new Date(assignData[item]).toLocaleDateString()).getTime()
    } else if (item.toLowerCase().indexOf('end') > -1) {
        assignData[item] = new Date(new Date(assignData[item]).toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1
    }
}

export {
    formatDate,
    getFormatParams
}
