# vue

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

<br>

**项目结构**

```
swiming-vue
├─ public  静态资源文件夹
│    ├─ favicon.ico  图标
│    └─ index.html  网页
├─ src  源代码文件夹
│    ├─ assets  资源文件夹
│    │    ├─ globals.css  全局样式文件
│    │    └─ logo.png  logo图片
│    ├─ components  组件文件夹
│    │    └─ mouseMove.vue  鼠标组件
│    ├─ routes  路由文件夹
│    │        └─ index.js  路由文件
│    ├─ utils  工具文件夹
│    │        └─ request.js  请求文件
│    ├─ views  页面文件夹
│    │    ├─ camera  摄像头页面
│    │    │    └─ deviceList.vue  摄像头列表页面
│    │    ├─ data  数据页面
│    │    │    ├─ device  设备页面
│    │    │    │    ├─ deviceInfo.vue  设备信息页面
│    │    │    │    ├─ editDeviceInfo.vue  修改设备信息页面
│    │    │    │    └─ addDeviceInfo.vue  添加设备信息页面
│    │    │    └─ event  事件页面
│    │    │        ├─ eventInfo.vue  事件信息页面
│    │    │        ├─ editEventInfo.vue  修改事件信息页面
│    │    │        └─ addEventInfo.vue  添加事件信息页面
│    │    ├─ system  系统页面
│    │    │    ├─ systemDictionary.vue  系统字典页面
│    │    │    └─ systemMenu.vue  系统菜单页面
│    │    ├─ user  用户页面
│    │    │    ├─ roleManage.vue  角色管理页面
│    │    │    └─ userManage.vue  用户管理页面
│    │    ├─ login  登录页面
│    │    │           └─ login.vue  登录页面
│    │    ├─ register  注册页面
│    │    │           └─ register.vue   注册页面
│    │    └─ home  主页
│    │           └─ HomeView.vue  主页
│    ├─ 404.vue  404页面
│    └─ Layout.vue  布局文件
├─ App.vue  入口文件
├─ main.js  入口文件
├─ babel.config.js  配置文件
├─ jsconfig.json  配置文件
├─ package.json  配置文件
├─ package-lock.json  配置文件
├─ vue.config.js  配置文件
└─ README.md  自述文件
```


