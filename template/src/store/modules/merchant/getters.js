
export default  {
    collectionMethod: (state, getter) => code => getter['enumStatus']('collectionMethod', code),
    deductMethod: (state, getter) => code => getter['enumStatus']('deductMethod', code),
    ruleType: (state, getter) => code => getter['enumStatus']('ruleType', code),
    signObject: (state, getter) => code => getter['enumStatus']('signObject', code),
    serviceType: (state, getter) => code => getter['enumStatus']('serviceType', code),
    settlement: (state, getter) => code => getter['enumStatus']('settlement', code),
    renewState: (state, getter) => code => getter['enumStatus']('renewState', code),
    merchantType: (state, getter) => code => getter['enumStatus']('merchantType', code),
    merStatus: (state, getter) => code => getter['enumStatus']('merStatus', code),
    identificationType: (state, getter) => code => getter['enumStatus']('identificationType', code),
    merchantCategory: (state, getter) => code => getter['enumStatus']('merchantCategory', code),
    reviewedStatus: (state, getter) => code => getter['enumStatus']('reviewedStatus', code),
    operationStatus: (state, getter) => code => getter['enumStatus']('operationStatus', code),
    poundageRule: (state, getter) => code => getter['enumStatus']('poundageRule', code),
    merchantBillLanguage: (state, getter) => code => getter['enumStatus']('merchantBillLanguage', code),
}
