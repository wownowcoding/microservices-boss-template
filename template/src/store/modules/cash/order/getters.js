
export default  {
    bizType: (state, getter) => code => getter['enumStatus']('bizType', code),
    currency: (state, getter) => code => getter['enumStatus']('currency', code),
    orderStatus: (state, getter) => code => getter['enumStatus']('orderStatus', code),
}
