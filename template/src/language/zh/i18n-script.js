// 勿删，自动跑国际化
export const Inject = function (objs) {
  const inject = {}
  if (typeof objs === 'object') {
    for (const x in objs) {
      if (typeof objs[x] === 'object') {
        for (const y in objs[x]) {
          inject[y] = objs[x][y]
        }
      }
    }
  }
  return inject
}