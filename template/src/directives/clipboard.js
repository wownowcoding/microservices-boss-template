import Clipboard from 'clipboard'
Vue.directive('clipboard', {
  bind(el, binding, vnode) {
    const clip = new Clipboard(el)
    el.dataset.clipboardText = binding.value
    clip.on('success', e => {
      console.dir(Vue)
      Vue.prototype.$Message.success('复制成功')
      console.info('Action:', e.action)
      console.info('Text:', e.text)
      console.info('Trigger:', e.trigger)
    })
    clip.on('error', e => {
      Vue.prototype.$Message.error('复制失败')
      console.error('Action:', e.action)
      console.error('Trigger:', e.trigger)
    })
  },
  update(el, binding) {
    el.dataset.clipboardText = binding.value
    console.log('binding')
    console.log(binding)
  }
})
