const https = require('https');
const process = require('process');
const fs = require('fs');
const g = require('./utils/map')

function main(w = 200, h = 200, fg = '666666', bg = 'cccccc') {
  const args = process.argv.splice(2);
  
  const m = {};
  args.forEach(function(item) {
    g(item, m);
  })

  w = m.w || w;
  h = m.h || h;
  fg = m.fg || fg;
  bg = m.bg || bg;

  https.get(`https://iph.href.lu/${w}x${h}?fg=${fg}&bg=${bg}`, (res) => {
    //用来存储图片二进制编码
    let imgData = '';
    //设置图片编码格式
    res.setEncoding("binary");
    //检测请求的数据
    res.on('data', (chunk) => {
      imgData += chunk;
    })
    //请求完成执行的回调
    res.on('end', () => {
      // 通过文件流操作保存图片
      const exists = fs.existsSync('./img');
      if (!exists) {
        fs.mkdirSync('./img');
      }
      fs.writeFile(
        `./img/${w}x${h}-fg=${fg}&bg=${bg}.png`,
        imgData, 
        'binary',
        (error) => {
          if (error) {
            console.log('下载失败');
          } else {
            console.log('下载成功！')
          }
        }
      )
    })
  }).on('error', (e) => {
    console.error(e);
  });
}

main();