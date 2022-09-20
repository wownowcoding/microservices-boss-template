export const unit = 86400000
const style = 'DD/MM'

/**
 * 获取按天统计的列
 * @param {*} start 
 * @param {*} end 
 * @param {*} format 
 * @returns [10/21, 10/22, ...]
 */
export const getDayxAxis = (start, end, format = style) => {
  const sDate = new Date(start)
  const eDate = new Date(end)
  const distance = Math.ceil((eDate.valueOf() - sDate.valueOf()) / unit)
  const result = []

  result.push(window.Vue.filter('DateFormat')(sDate, format))
  for (let i = 1; i < distance; i++) {
    let date = new Date(sDate.valueOf() + unit * i)
    result.push(window.Vue.filter('DateFormat')(date, format))
  }

  return result
}

/**
 * 获取按特定天数的列
 * @param {*} start 
 * @param {*} end 
 * @param {*} count 
 * @param {*} format 
 * @returns [10/21-10/23, 10/24-10/30, ...]
 */
export const getDayxAxisWithX = (start, end, count, format = style) => {
  const sDate = new Date(start)
  const eDate = new Date(end)
  let from = eDate.valueOf()
  let result = []
  while (from > sDate.valueOf()) {
    let date = window.Vue.filter('DateFormat')(new Date(from), format)
    let s = window.Vue.filter('DateFormat')(new Date(from - (count - 1) * unit), format)
    result.push(`${s}-${date}`)
    from = from - unit * count
  }
  return result.reverse()
}
