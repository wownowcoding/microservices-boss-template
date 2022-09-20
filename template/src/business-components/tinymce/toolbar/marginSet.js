import { getUid } from '@/page/cms/page-content/utils.js'

export const marginSet = 'marginSet'

export const marginFormats = {}

const fs = [10, 15, 20, 30, 50]
fs.forEach(item => {
  marginFormats[`margin${item}`] = {
    value: item,
    inline: 'span',
    styles: {
      margin: `0 ${item}px`
    }
  }
})

export const marginSetRegistered = function (editor) {
  const title = this.$t('scriptv1.findPagesetMargins')
  editor.ui.registry.addMenuButton(marginSet, {
    icon: marginSet,
    fetch: function (callback) {
      const items = []
      for (const x in marginFormats) {
        items.push({
          type: 'menuitem',
          text: title + marginFormats[x].value,
          onAction: function () {
            editor.formatter.apply(x)
          }
        })
      }
      callback(items)
    }
  })
}
