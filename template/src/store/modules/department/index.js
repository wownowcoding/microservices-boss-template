import { 
  departmentTreeList as departmentTreeListApi
} from '@/api/business-components/department-management';
export default {
	namespaced: true,
	state: {
    departmentTreeList: []
  },
	mutations: {
    clearDepartmentTreeList(state) {
      state.departmentTreeList.length = 0;
      state.departmentTreeList = [];
    },
    getDepartmentTreeList(state) {
      const operatorInfo = this.state?.account?.operatorInfo ?? undefined;
      if (!operatorInfo) {
        this.commit(`account/initOperatorInfo`);
      }
      departmentTreeListApi({
        departmentNo: this?.$store?.state?.account?.operatorInfo?.departmentNo ?? ''
      }, {
        success: departmentTreeList => {
          if (departmentTreeList?.length) {
            state.departmentTreeList = departmentTreeList.map(e => Object.assign({}, e, {
              createTime: new Date(e.createTime).valueOf()
            }));
          }
        }
      });
    }
  }
}