export default {
    enumByKeys: (state, getter) => state.enumByKeys,
    /**
     * @argument: moduleName 枚举模块名
     * @argument: enumName 枚举名
     * @author: 黄博方
     * @description:
     *  通过传入枚举的code值获取其message
     *  声明:
     * computed: {
     *   currencyEnum(){ return this.$store.getters.enumGetter('trade','currency') }
     * }
     *  使用例:
     *   this.currencyEnum(code)
     */
    enumGetter: (state, getter) => (moduleName, enumName) => code => getter['enumStatus'](moduleName, enumName, code),
    /**
     * @description: 处理枚举code的方法,供enumGetter使用
     * @author: 黄博方
     */
    enumStatus: (state, getter) => (moduleName, enumName, code) => {
        if (code instanceof Object) { //code是枚举对象的情况
            return code["message"] || code
        } else { //code是枚举值的情况
            let matchingState;
            try {
                // todo 处理枚举比getter调用早的问题
                matchingState = state.enumByKeys[moduleName][enumName]
            } catch (e) {
                // TODO 取值时不一定加载完成枚举,不应该提示
                // console.log(`${moduleName}/${enumName} not found!`);
                return code;
            }
            // 匹配不到对应的state
            if (!!!matchingState) return code;
            let matchingEnum = matchingState.find((item) => {
                return item.code == code
            })
            return matchingEnum ? matchingEnum["message"] : code
        }
    },

    /**
     * @description: 获取枚举数组
     * 形如 [{code: '1',message: '出金'}, {code: '2',message: '入金'}]
     * 用法：
     * 1、引入mapState
     * 2、...mapState({
     *   xxxEnumArr: (state,getter) => getter.enumStateArr('模块名','枚举名')
     * })
     * 3、<Options
     *      v-for="item in xxxEnumArr"
     *      :key="item.code"
     *      :label="item.message"
     *      :value="item.code"
     *    >
     * @param state
     * @param getter
     * @returns {function(*, *): Array}
     */
    enumStateArr: (state, getter) => (moduleName, enumName) => {
        let enumModule = state.enumByKeys[moduleName]
        return !!enumModule && !!enumModule[enumName] ? enumModule[enumName] : []
            // .map(item => ({
            //     code: String(item.code),
            //     message: item.message,
            // }))
    }
}

