const onlyNumber = (el) => {
  el.addEventListener('keypress', (e) => {
    e = e || window.event
    let charcode = typeof e.charcode == 'number' ? e.charcode : e.keyCode
    let re = /\d/
    if (!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        e.returnValue = false
      }
    }
  })
}
Vue.directive('onlyNumber', {
  inserted: function (el) {
    onlyNumber(el)
  }
})
Vue.directive('onlyPositiveInteger',{
  inserted: function (el){
    el.handler = function(el) {
      el.value = Number(el.value.replace(/\D+/, ''))
    }
    el.addEventListener('input', el.handler)
  }
})
