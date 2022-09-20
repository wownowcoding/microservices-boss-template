export default {
    setEnumStatus(state, enumMap) {
        Object.keys(enumMap).forEach(key => {
            state[key] = enumMap[key]
            // state[key].splice(0, state[key].length)
            // enumMap[key].forEach((item) => {
            //     state[key].push(item)
            // })
        })
    }
}
