# demo


## egg + mongodb + redis

## json-web-token
token生成

## 主要功能（基础功能）

1. 菜单管理
2. 权限管理
3. 角色管理
4. 用户管理
5. 上传图片

## 开发注意
```
运行npm run create 命令 可自动生成 controller model service route对应的文件
接口权限映射关系在app/utils/const.js文件里面

```

## QuickStart

先启动redis

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org