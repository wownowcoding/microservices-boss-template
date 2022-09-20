<template>
    <Button
        v-bind="$attrs"
        :loading="_loading"
        @click="asyncClickHandle"
        style="text-transform: capitalize;"
    >
        <slot/>
    </Button>
</template>
<script>
const { Button } = iview;

export default {
    name: 'VButton',
    props: {
        /**
         * 防重复点击的函数,要求返回一个promise
         * 例如: async ()=>{
         *     if(flag){
         *         //.. 正常业务完成
         *         await Promise.resolve()
         *     }else{
         *         await Promise.reject()
         *     }
         * }
         * 组件会根据Promise的返回来控制loading
         *
         */
        asyncClick: {
            type: Function,
        },
        // 异步函数超时时间,缺省10s
        loadingTimeout: {
            type: Number,
            default: 10000
        },
    },
    data() {
        return {
            loading: false
        }
    },
    computed: {
      _loading() {
          return this.$attrs['loading'] || this.loading
      }
    },
    methods: {
        onClick() {
            return this.asyncClick ? this.asyncClick.apply(this, arguments) : this.$listeners.click.apply(this, arguments)
        },
        async asyncClickHandle() {
            this.loading = true
            // loading的超时处理
            this.$nextTick(() => {
                setTimeout(() => {
                    // 超时后,如果还是loading状态,就取消掉loading
                    if (!!this.loading) {
                        this.loading = false
                    }
                }, this.loadingTimeout)
            })
            try {
                // 正常
                await this.onClick.apply(this, arguments)
                this.loading = false
            } catch (error) {
                this.loading = false
            }
        },
    },
    components: { Button }
};
</script>