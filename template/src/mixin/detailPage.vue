<template>
    <div> </div>
</template>
<script>
const { mapState, mapGetters } = Vuex;
export default {
    name: "detail",
    props: ["query"],
    data() {
        return {
            fetchApi: () => {},
            form: {}
        };
    },
    created() {
        this.fetchData();
    },
    computed: {
        ...mapState({
            rolePart: state => state.rolePart.rolePart,
        })
    },
    methods: {
        review() {},
        fetchSuccess(res){},
        fetchFail(res){},
        /**
         * @description 在fetchData之后,对form对象的合并处理
         */
        mergeForm(data){
            return Object.assign({},this.form,data)
        },
        async fetchData() {
            let res = await this.fetchApi(this.$route.query);
            if (res.rspCd === "00000") {
                let {data} = res
                this.form = this.mergeForm(data)
                this.fetchSuccess(res)
            }else {
                this.fetchFail(res)
            }
        },
        stateSelectFilter(value,list){
            let matchItem = list.find((item) => {
                return item.value == value
            })
            return matchItem ? this.$t(matchItem.label) : '-'
        },
        back(){
            this.$router.go(-1)
        }
    }
};
</script>

