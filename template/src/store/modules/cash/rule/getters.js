
export default  {
    branchControl: (state, getter) => code => getter['enumStatus']('branchControl', code),
    counterControl: (state, getter) => code => getter['enumStatus']('counterControl', code),
    userControl: (state, getter) => code => getter['enumStatus']('userControl', code),
    operate: (state, getter) => code => getter['enumStatus']('operate', code),
}
