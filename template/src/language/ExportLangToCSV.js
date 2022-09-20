// import zh from './zh';
// import en from './en';
import zh from './zh/take_out1_6';
console.log("zh", zh)
import en from './en/take_out1_6';
console.log("en", en)
let list = [`键,中文,英文\n`]
for (let k in zh) {
    if (k !== 'v1_6') {
        continue;
    }
    for (let _k in zh[k]) {
        list.push(`${k}.${_k},${zh[k][_k]},${en && en[k] && en[k][_k] || ''}\t,\n`)
    }
}
console.log("list", list)
// console.log(JSON.stringify({list}))
//encodeURIComponent解决中文乱码
let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(list.join(""))
// var blob = new Blob([list.join(",")]);
var a = document.createElement("a");
// a.href = window.URL.createObjectURL(blob);
a.href = uri;
a.download = "content.csv";
a.textContent = "Download";

document.body.appendChild(a);
