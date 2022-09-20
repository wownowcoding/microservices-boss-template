
export default  {
    branchStatus: (state, getter) => code => getter['enumStatus']('branchStatus', code),
    counterStatus: (state, getter) => code => getter['enumStatus']('counterStatus', code),
    counterRole: (state, getter) => code => getter['enumStatus']('counterRole', code),
    signType: (state, getter) => code => getter['enumStatus']('signType', code),
    branchOperate: (state, getter) => code => getter['enumStatus']('branchOperate', code),
    counterOperate: (state, getter) => code => getter['enumStatus']('counterOperate', code),
    schedulingStatus: (state, getter) => code => getter['enumStatus']('schedulingStatus', code),
}
