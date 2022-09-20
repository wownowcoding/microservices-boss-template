const axios = require('axios');
const fs = require('fs')
const path = require('path')
const ProgressBar = require("progress")
const humps = require('humps');
const crypto = require('crypto');

const _key = process.env.key;
const _fileName = process.env.fileName

var bar = new ProgressBar("[:bar] :rate/bps :percent :etas :step", { total: 8 })
const md5 = (msg) => crypto.createHash('md5').update(msg).digest('hex');

const targetPath = path.resolve(__dirname, './src')
const i18nEnPath = path.resolve(__dirname, `./src/language/en/${_fileName}.js`)
const i18nZhPath = path.resolve(__dirname, `./src/language/zh/${_fileName}.js`)
const i18nEnInjectPath = path.resolve(__dirname, `./src/language/en/i18n-script.js`)
const i18nZhInjectPath = path.resolve(__dirname, `./src/language/zh/i18n-script.js`)
let allLanguages = [];

//  获取线上的所有国际化
const getAllLanguage = async (params = {}) => {
  const getLangageUrl = (params = {}) => {
    const { pageNum = 1, pageSize = 20 } = params;
    const compositionUrl = `/node-composition/boss-language/list.do?pageNum=${pageNum}&pageSize=${pageSize}`;
    return `https://boss.lifekh.com/boss/api/order/go-composition-path?urlPath=${encodeURIComponent(compositionUrl)}`;
  };
  try {
    const { pageNum = 1, pageSize = 200 } = params;
    const { data } = await axios({
      method: 'get',
      timeout: 6000,
      url: getLangageUrl({ pageNum, pageSize }),
      headers: {
        cookie: 'open-key=U2FsdGVkX18XAoqe6btetFddh2F2SJmhbsnq4GxapzOOAPyXaktqR6PB24x0CZLO;'
      }
    });
    const { data: page } = data;
    const jobs = [];
    for (let i = pageNum + 1; i <= page.pages; i++) {
      jobs.push(axios({
        method: 'get',
        timeout: 6000,
        url: getLangageUrl({ pageNum: i, pageSize }),
        headers: {
          cookie: 'open-key=U2FsdGVkX18XAoqe6btetFddh2F2SJmhbsnq4GxapzOOAPyXaktqR6PB24x0CZLO;'
        }
      }));
    }
    const res = await Promise.all(jobs);
    for (const e of res) {
      const { data: resData } = e;
      const { data: pageData } = resData;
      page.list = page.list.concat(pageData.list);
    }
    return page.list;
  } catch(error) {
    console.log('error: ', error.toString())
    if (error && error.errno && error.errno === 'ENOTFOUND' || error && error.toString && error.toString().indexOf('Request failed with status code 403') !== -1) {
      console.error('无法访问 BOSS!');
      process.exit(0);
    }
    console.log('访问 boss 所有国际化错误: ', error);
  }
};
const proAllLanguage = new Map();
const proAllLanguageLanguageKey = new Map();
const startGetAllLanguage = async () => {
  //  将国际化做映射去重等
  allLanguages = await getAllLanguage();
  // console.log('allLanguages: ', allLanguages);
  for (const e of allLanguages) {
    proAllLanguageLanguageKey.set(e.languageKey, e);
    proAllLanguage.set(e.zh.toLocaleLowerCase(), e);
    proAllLanguage.set(e.en.toLocaleLowerCase(), e);
    proAllLanguage.set(e.km.toLocaleLowerCase(), e);
  }
};
//  获取路径下的所有文件
const getFilePathV2 = targetPath => {
  const fileList = fs.readdirSync(targetPath);
  let filesPath = [];
  for (const file of fileList) {
    const filePath = path.resolve(targetPath, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      filesPath = filesPath.concat(getFilePathV2(filePath));
    } else {
      filesPath.push(filePath);
    }
  }
  return filesPath;
};

// 遍历文件内容
const getFilePath = function (targetPath) {
  const fileList = getFilePathV2(targetPath);
  let textList = [];
  for (let i = 0; i < fileList.length; i++) {
    try{
      const fileText = fs.readFileSync(fileList[i], 'utf-8');
      if (fileText.indexOf('$t') !== -1) {
        const list = fileText
          .split('$t(')
          .filter((e, i) => i !== 0 && !(e.indexOf('${') !== -1 && e.indexOf('}') !== -1))
          .map(e => e.split(/(\"\))|(\'\))|(\`\))/)[0].split(/(',)|(",)|(`,)/)[0].replace(/^['"`]|['"`]$/g, ''))
          .filter((e, i) => !proAllLanguageLanguageKey.get(e) && !!(fileText.indexOf(`$t('${e}'`) !== -1 || fileText.indexOf(`$t("${e}"`) !== -1 || fileText.indexOf('$t(`' + e + '`') !== -1))
          .map(e => ({ text: e, from: e || /[\u4e00-\u9fa5]+/g.exec(e), filePath: fileList[i] }));
        if (list && list.length) {
          textList = textList.concat(list);
        }
      }
    } catch(err) {}
  }
  return textList;
}
const translationAxios = q => new Promise(resolve => {
  axios.post(`https://translation.googleapis.com/language/translate/v2?key=AIzaSyCZI8BADH7-kvnEDXpnrUmK33a1xCfxjPs`, {
    q,
    target: 'en'
  }, {
    timeout: 6000
  }).then(({ data: axiosRes }) => {
    let result = '';
    if (axiosRes && axiosRes.data && axiosRes.data.translations && axiosRes.data.translations[0] && axiosRes.data.translations[0].translatedText) {
      const keyItem = getKeyAndEn(axiosRes.data.translations[0].translatedText.replace(/&#39;/g, '\''));
      result = {
        en: keyItem.en,
        zh: q,
        key: keyItem.key
      };
    }
    resolve({ data: result });
  }).catch(err => {
    if (err && err.errno && err.errno === 'ENOTFOUND') {
      console.error('无法访问谷歌!');
      process.exit(0);
    }
    console.log('\n\n curl translation.googleapis.com is error: ', err);
    resolve({
      data: ''
    });
  });
});
//  翻译不成功则重试 3 次
translationCurl = async q => {
  let result = await translationAxios(q);
  if (!(result && result.data)) {
    await new Promise(re => {
      const __timeout = setTimeout(() => {clearTimeout(__timeout);re();}, 50);
    });
    result = await translationAxios(q);
  }
  if (!(result && result.data)) {
    await new Promise(re => {
      const __timeout = setTimeout(() => {clearTimeout(__timeout);re();}, 50);
    });
    result = await translationAxios(q);
  }
  return result;
};
//  去谷歌翻译
const translationData = async textList => {
  const results = [];
  const jobs = [];
  const jobMap = new Map();
  for (let i = 0, len = textList.length; i < len; i++) {
    const e = textList[i];
    if (proAllLanguage.get(e.text.toLocaleLowerCase())) {
      results.push({
        ...e,
        en: proAllLanguage.get(e.text.toLocaleLowerCase()).en,
        zh: e.text,
        key: proAllLanguage.get(e.text.toLocaleLowerCase()).languageKey,
        languageKey: proAllLanguage.get(e.text.toLocaleLowerCase()).languageKey
      });
      continue;
    }
    // console.log(`go to google txt => `, e.text);
    if (!jobMap.get(e.text)) {
      jobs.push({
        item: e, itemIndex: i
      });
      jobMap.set(e.text, []); 
    } else {
      const __list = jobMap.get(e.text);
      __list.push({ item: e, itemIndex: i });
      jobMap.set(e.text, __list); 
    }
  }
  const res = await Promise.all(jobs.map(e => translationCurl(e.item.text)));
  for (let i = 0, len = jobs.length; i < len; i++) {
    if (res[i] && res[i].data) {
      results.push({
        ...jobs[i].item,
        ...res[i].data
      });
      proAllLanguage.set(res[i].data.zh.toLocaleLowerCase(), {
        en: res[i].data.en,
        languageKey: res[i].data.key,
        zh: res[i].data.zh
      });
    }
  }
  [...jobMap.keys()].forEach(txt => {
    const mapRes = jobMap.get(txt);
    mapRes.forEach(e => {
      const { item } = e;
      results.push({
        ...item,
        ...JSON.parse(JSON.stringify(proAllLanguage.get(txt.toLocaleLowerCase())).replace('languageKey":', 'key":'))
      });
    });
  });
  return results;
};
//  写入文件
const writeFile = function (path, data) {
  try {
    fs.writeFileSync(path, data, 'utf-8')
  } catch (error) {
    console.log('writeFile：异常了')
  }
}

// 读写文件的国际化，中文转为i18n的变量key
const getZhToEn = function (item) {
  try {
    const contents = [];
    let data = fs.readFileSync(item.filePath, 'utf-8').split(/\n/);
    data.forEach(e => {
      let str = e;
      let isTest = str.indexOf('在统计周期内') !== -1;
      isTest && console.log('\n\nstr: ', str);
      try {
        if (str.indexOf(`$t('${item.text}'`) !== -1 || str.indexOf(`$t("${item.text}"`) !== -1 || str.indexOf(`$t(\`${item.text}\``) !== -1) {
          if (str.indexOf(`$t('${item.text}'`) !== -1) {
            str = decodeURIComponent((encodeURIComponent(str)).replace(new RegExp(encodeURIComponent(`$t('${item.text}'`), 'g'), `$t('${item.languageKey || _key + '.' + item.key}'`));
          } else if (str.indexOf(`$t("${item.text}"`) !== -1) {
            str = decodeURIComponent((encodeURIComponent(str)).replace(new RegExp(encodeURIComponent(`$t("${item.text}"`), 'g'), `$t("${item.languageKey || _key + '.' + item.key}"`));
          } else {
            str = decodeURIComponent((encodeURIComponent(str)).replace(new RegExp(encodeURIComponent(`$t(\`${item.text}\``), 'g'), `$t(\`${item.languageKey || _key + '.' + item.key}\``));
          }
        }
      } catch(err) {
        if (str.indexOf(`$t('${item.text}'`) !== -1 || str.indexOf(`$t("${item.text}"`) !== -1 || str.indexOf(`$t(\`${item.text}\``) !== -1) {
          if (str.indexOf(`$t('${item.text}'`) !== -1) {
            str = str.replace(`$t('${item.text}'`, `$t('${item.languageKey || _key + '.' + item.key}'`);
          } else if (str.indexOf(`$t("${item.text}"`) !== -1) {
            str = str.replace(`$t("${item.text}"`, `$t("${item.languageKey || _key + '.' + item.key}"`);
          } else {
            str = str.replace(`$t(\`${item.text}\``, `$t(\`${item.languageKey || _key + '.' + item.key}\``);
          }
        }
      }
      isTest && console.log('2str: ', str);
      contents.push(str);
    });
    writeFile(item.filePath, contents.join('\n'));
  } catch (error) {
    console.log('getZhToEn: 异常了' + error)
  }
}

// 读写文件的国际化，中文转为i18n的变量key
const i18nToProject = function (filePath, i18nObject) {
  let fileObject = {}
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, 'utf-8')
    const jsText = fileData.replace('export default ', '')
    fileObject = JSON.parse(jsText)
  }
  if (fileObject[_key]) {
    fileObject[_key] = { ...fileObject[_key], ...i18nObject }
  } else {
    fileObject[_key] = i18nObject
  }
  writeFile(filePath, `export default ${JSON.stringify(fileObject, undefined, 2)}`)
}

// 写入导入到导出
const i18nInjectProject = function (filePath) {
  try {
    let data = fs.readFileSync(filePath, 'utf-8')
    const injectPath = `export { default as ${_fileName} } from './${_fileName}'`
    if (data.indexOf(injectPath) === -1) {
      data = data + '\n' + injectPath
      writeFile(filePath, data)
    }
  } catch (error) {
    console.log('i18nInjectProject: 异常了' + error)
  }
}
const getMd5Key = txt => {
  if (txt.length < 20) {
    return txt;
  }
  const randomNum = ('abcdefghijklnmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(e => [e, parseInt(Math.random() * 10000, 10)]).filter(e => !(e[1] % 2)).map(e => e[0]).join(''));
  // const key = md5(txt).replace(/[^a-zA-Z]/g, '') + ('abcdefghijklnmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(e => [e, parseInt(Math.random() * 10000, 10)]).filter(e => !(e[1] % 2)).map(e => e[0]).join(''));
  return randomNum[0] + md5(txt);
}
// 获取翻译，key改为驼峰命名，英语为大写+空格
const getKeyAndEn = txt => {
  let key = humps.camelize(txt).replace(/[^a-zA-Z0-9]/g, '');
  return { en: txt, key: `${getMd5Key(key)}` };
};

// 收集的变量，回写到项目国际化配置
const callbackToi18n = function (files) {
  let zhs = {}
  let ens = {}
  files.filter(e => !e.languageKey).forEach(item => {
    zhs[item.key] = item.zh
    ens[item.key] = item.en
  })
  bar.tick(4, { step: '开始替换项目的国际化变量' })
  i18nToProject(i18nZhPath, zhs)
  bar.tick(5, { step: '开始新建项目的国际化变量文件-en' })
  i18nInjectProject(i18nEnInjectPath)
  bar.tick(6, { step: '国际化en转义成功' })
  i18nToProject(i18nEnPath, ens)
  bar.tick(7, { step: '开始新建项目的国际化变量文件-zh' })
  i18nInjectProject(i18nZhInjectPath)
  bar.tick(8, { step: '国际化zh转义成功' })
};

(async () => {
  await startGetAllLanguage();
  bar.tick(0, { step: '开始遍历匹配文件' })
  const textList = getFilePath(targetPath);
  writeFile(path.join(__dirname, 'textList.json'), JSON.stringify(textList, null, 2))
  // console.log('发现需要国际化文本: ', textList.length);
  const translationResults = await translationData(textList);
  bar.tick(1, { step: '开始翻译' })
  writeFile(path.join(__dirname, 'check-i18n.json'), JSON.stringify(translationResults, null, 2))
  for (const e of translationResults) {
    getZhToEn(e)
  }
  bar.tick(3, { step: '中英对比' });
  callbackToi18n(translationResults)
})();
