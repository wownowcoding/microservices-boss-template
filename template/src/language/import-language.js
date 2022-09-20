const path = require('path');
const fs = require('fs');
function getLanguage(language) {
  return fs.readFileSync(path.resolve(__dirname, `${language}/take_out.js`), 'utf8').replace('export default', '');
}
const languangenew = {};
fs.readFileSync(path.resolve(__dirname, `language.txt`), 'utf8').split(/\n/).map(e => e.split('	')).filter(e => e.length === 3).forEach(e => {
  languangenew[e[0]] = {
    key: e[0],
    en: e[2],
    zh: e[1]
  };
});
function strToJsonStr(contents, currentLanguage) {
  return contents.split(/\n/).map(e => {
    if (e.indexOf(':') !== -1 && e.indexOf('v1') === -1) {
      let str = e.split(/\:/);
      const key = str[0].replace(/\s/g, '');
      if (str[1].indexOf(`,`) !== -1) {
        str[1] = str[1].substring(0, str[1].length - 1).replace(/\s/, '');
      }
      if (str[1].indexOf(`'`) === str[1].length - 1) {
        str[1] = str[1].substring(0, str[1].length - 1).replace(/\s/, '');
      }
      const __list = str[1].split(/\'|\"/);
      // console.log('key: ', key)
      if (__list.length !== 3 && str[1].indexOf('`') !== -1) {
        // console.log('__list: ', __list)
        str[1] = str[1].replace(/\`/g, '');
      }
      if (languangenew[`v1.${key}`]) {
        const newValue = languangenew[`v1.${key}`][currentLanguage];
        // console.log('newValue: ', newValue)
        e = `${str[0]}: "${newValue}",`;
      }
      // console.log('new value: ', languangenew[`v1.${key}`]);
    }
    // const key = e.split(':')[0]
    return e;
  });
}
const en = strToJsonStr(getLanguage('en'), 'en').join('\n');
const zh = strToJsonStr(getLanguage('zh'), 'zh').join('\n');
fs.writeFileSync(path.resolve(__dirname, 'en', `new_take_out.js`), `export default ${en}`, { 'flag': 'w' });
fs.writeFileSync(path.resolve(__dirname, 'zh', `new_take_out.js`), `export default ${zh}`, { 'flag': 'w' });