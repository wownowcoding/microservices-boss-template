
export default  {
    counterProcessCode: (state, getter) => code => getter['enumStatus']('counterProcessCode', code),
    userProcessCode: (state, getter) => code => getter['enumStatus']('userProcessCode', code),
}
