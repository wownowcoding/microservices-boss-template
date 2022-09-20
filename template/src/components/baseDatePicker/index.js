import baseDatePicker from './datePicker'

export default {
    install: (Vue) => {
        Vue.component('DatePicker', baseDatePicker)
    }
}
