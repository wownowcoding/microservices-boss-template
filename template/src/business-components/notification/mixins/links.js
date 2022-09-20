const zhLinks = [{
  code: '立即下单',
  message: '立即下单',
}, {
  code: '立即分享',
  message: '立即分享',
}, {
  code: '立即抽奖',
  message: '立即抽奖',
}, {
  code: '立即签到',
  message: '立即签到',
}]

const enLinks = [{
  code: 'Order', message: 'Order',
}, {
  code: 'Share',
  message: 'Share',
}, {
  code: 'Draw',
  message: 'Draw',
}, {
  code: 'Sign',
  message: 'Sign',
}]
const cbLinks = [{
  code: 'ធ្វើការបញ្ជាទិញឥឡូវនេះ',
  message: 'ធ្វើការបញ្ជាទិញឥឡូវនេះ',
}, {
  code: 'ចែករំលែកឥឡូវនេះ',
  message: 'ចែករំលែកឥឡូវនេះ',
}, {
  code: 'គូរឥឡូវនេះ',
  message: 'គូរឥឡូវនេះ',
}, {
  code: 'ចូលឥឡូវនេះ',
  message: 'ចូលឥឡូវនេះ',
}]

export default {
  computed: {
    links() {
      switch (this.language) {
        case 'zh':
          return zhLinks
        case 'en':
          return enLinks
        case 'cb':
          return cbLinks
      }
    }
  }
}
