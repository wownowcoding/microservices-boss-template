
export default  {
    currency: (state, getter) => code => getter['enumStatus']('currency', code),
    billConfirmStatus: (state, getter) => code => getter['enumStatus']('billConfirmStatus', code),
    billStatus: (state, getter) => code => getter['enumStatus']('billStatus', code),
    billType: (state, getter) => code => getter['enumStatus']('billType', code),
    billOperate: (state, getter) => code => getter['enumStatus']('billOperate', code),
}
