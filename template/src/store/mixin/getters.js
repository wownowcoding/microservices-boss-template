export default {
    enumStatus: (state, getter) => (stateName, code) => {
        return  window.vm?
        window.vm.$store.getters.enumGetter(state['namespace'], stateName)(code) :
        ""
        // 如果存在namespace,则返回app.getters.enumStatus
        // if (!!state['namespace']) {
        //     return vm.$store.getters.enumGetter(state['namespace'], stateName)(code)
        // } else if (code instanceof Object) {
        //     //code是枚举对象的情况
        //     return code['message'] || code
        // } else {
        //     //code是枚举值的情况
        //     let matchingState
        //     try {
        //         matchingState = state[stateName]
        //     } catch (e) {
        //         console.log(stateName + ' not found!')
        //         return code
        //     }
        //     // 匹配不到对应的state
        //     if (!!!matchingState) return code
        //     let matchingEnum = matchingState.find(item => {
        //         return item.code == code
        //     })
        //     return matchingEnum ? matchingEnum['message'] : code
        // }
    },
}
