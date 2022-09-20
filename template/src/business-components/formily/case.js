export const config = [
  {
    type: 'select',
    label: this.$t('v3_1_1.tier1Merchant'),
    key: 'firstM',
    options: [
      { message: '一级商户A', code: 1 },
      { message: '商户B', code: 2 }
    ],
    required: true
  },
  {
    type: 'text',
    label: this.$t('application.appName'),
    key: 'name',
    attrs: {
      placeholder: '最多50字',
      maxlength: 50,
      showWordLimit: true
    }
  },
  {
    // type: 'upload',
    type: 'imagesBeforeUpload',
    key: 'icon',
    label: this.$t('application.appIcon'),
    default: 'https://tinhnow.oss-ap-southeast-1.aliyuncs.com/wownow/files/sit/app/MFF/FF/D8/FF/ec5d8570bedb11eca72bbd94fd49352f.k1650261231114',
    attrs: {
      isCut: true,
      tips: '支持jpg、png格式，宽高200*200像素，小于200k (账单所显iIcon)',
      maxSize: 200,
      pictureResolution: {
        width: 200,
        height: 200
      }
    }
  },
  {
    type: 'textarea',
    label: this.$t('v8_1_1.applicationIntroduction'),
    key: 'intro',
    attrs: {
      placeholder: '最多200字',
      maxlength: 200,
      showWordLimit: true
    }
  },
  {
    type: 'buttons',
    label: this.$t('v8_1_1.radio'),
    key: 'introd',
    required: true,
    options: [
      { message: '11111', code: 1 },
      { message: '22222', code: 212 }
    ]
  },
  {
    type: 'buttons',
    label: this.$t('v8_1_1.multipleChoice'),
    key: 'introqqq',
    required: true,
    options: [
      { message: '11111', code: 1 },
      { message: '22222', code: 3 },
      { message: '3333', code: 4 },
      { message: '4444', code: 5 }
    ],
    attrs: {
      isSingle: false
    }
  },
  {
    type: 'custom',
    key: 'slot',
    label: this.$t('v8_1_1.applicationIntroduction')
  }
]
