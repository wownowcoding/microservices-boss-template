export default  {
    whiteList: (state, getter) => code => getter['enumStatus']('whiteList', code),
    activeState: (state, getter) => state.activeState,
    activeStateEnum: (state, getter) => code => getter['enumStatus']('activeState', code),
    adBanner: (state, getter) => state.adBanner,
    adBannerEnum: (state, getter) => code => getter['enumStatus']('adBanner', code),
    bannerNoEnum: (state, getter) => code => getter['enumStatus']('bannerNo', code),
    // whiteList: (state) => state.whiteList,
}
