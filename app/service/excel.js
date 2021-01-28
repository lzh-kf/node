'use strict';

const Service = require('egg').Service;
const path = require('path');
const ExcelJS = require('exceljs');
const fs = require('fs');

class ExportExcelService extends Service {
  constructor(ctx) {
    super(ctx);
    const baseDir = ctx.app.baseDir;
    const basePath = path.join(baseDir, '/app/public/');
    this.basePath = basePath;
  }
  // 下载
  async downlaod(data, fileName) {
    try {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet('sheet');
      const sheets = [ sheet ];
      sheets.forEach(item => {
        item.columns = [
          { header: '名字', key: 'name', width: 10 },
          { header: '班级', key: 'class', width: 15 },
          { header: '兴趣', key: 'interest', width: 20 },
          { header: '创建时间', key: 'createTime', width: 15 },
          { header: '更新时间', key: 'updateTime', width: 15 },
          { header: '性别', key: 'gender', width: 10 },
        ];
      });
      data.forEach(item => {
        sheets.forEach(element => {
          element.addRow({
            name: item.name,
            class: item.class,
            interest: item.interest,
            createTime: item.createTime,
            updateTime: item.updateTime,
            gender: item.gender === '0' ? '女' : '男',
          });
        });
      });
      await workbook.xlsx.writeFile(this.basePath + fileName);
      const buffer = await fs.readFileSync(this.basePath + fileName);
      return buffer;
    } catch (error) {
      return error;
    } finally {
      fs.unlink(this.basePath + fileName, () => { });
    }
  }
}
module.exports = ExportExcelService;
