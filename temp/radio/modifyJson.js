let data1 = require('./data1.json')

const fs = require('fs');

console.log(data1)
function modifyJson(data){
    var out = []
    data.forEach(dat=>{
        var obj = {};
        obj.name = dat.station_name;
        if(dat.media_url)
        obj.urls = [...dat.media_url]
        out.push(obj)
    })
    out.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    return out;
}
fs.writeFileSync('output.json',JSON.stringify(modifyJson(data1)))

