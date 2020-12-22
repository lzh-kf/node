'use strict';

const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let name = null;

const dirname = __dirname + '/module';

const baseDirName = __dirname.replace(/\\create/, '');

const templateSteMap = {
  'service.js': [ '{{service}}', '{{tableName}}' ],
  'route.js': [ '{{route}}' ],
  'model.js': [ '{{model}}', '{{tableName}}' ],
  'controller.js': [ '{{ControllerName}}' ],
};


const fileMap = {
  'service.js': '/service/',
  'route.js': '/routes/',
  'model.js': '/model/',
  'controller.js': '/controller/',
};


const isNeedFirstWordCapitalized = [ '{{service}}', '{{model}}', '{{tableName}}', '{{ControllerName}}' ];

rl.question('请输入模块名字?', async moduleName => {
  console.log(`模块名字：${moduleName}`);
  name = moduleName;
  console.log('生成文件中...');
  writeFile();
  rl.close();
});

async function getFiles() {
  const files = await fs.readdirSync(dirname);
  return files;
}

async function writeFile() {
  try {
    const files = await getFiles();
    const { length } = files;
    for (let i = 0; i < length; i++) {
      const item = files[i];
      let currentFiles = await fs.readFileSync(`${dirname}/${item}`);
      const templateArray = templateSteMap[item];
      if (templateArray) {
        currentFiles = currentFiles.toString();
        // eslint-disable-next-line no-loop-func
        templateArray.forEach(template => {
          currentFiles = recursionFindTemplate(currentFiles, template, setWord(name, template));
        });
      }
      const path = baseDirName + fileMap[item] + name + '.js';
      await fs.writeFileSync(path, currentFiles);
    }
    console.log('生成成功');
  } catch (error) {
    console.log(error);
    console.log('生成失败');
  }
}

function setWord(word, value) {
  if (isNeedFirstWordCapitalized.includes(value)) {
    word = word.toUpperCase().substring(0, 1) + word.substring(1);
  }
  return word;
}


function recursionFindTemplate(str, template, value) {
  let flag = true;
  while (flag) {
    if (str.includes(template)) {
      str = str.replace(template, value);
    } else {
      flag = false;
    }
  }
  str = str.replace(/`/g, '');
  return str;
}
