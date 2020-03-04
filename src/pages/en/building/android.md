---
previousText: '在 iOS 上运行'
previousUrl: '/building/ios'
# nextText: 'Testing'
# nextUrl: '/building/testing'
---


# 在 Android 上运行

## 项目配置

修改配置

```ts
export default {
- appType: 'h5',
+ appType: 'cordova',
+ packageId: '',
+ displayName: '',
  mobileLayout: true
};
```

## 初始化 Cordova 项目

> 如果已经初始化过，就不用再执行初始化了。

```bash
alita cordova --init
```

> Cli 创建的项目，可以执行 `yarn cordova-init` ("cordova-init": "alita cordova --init")

## 添加 Android 原生代码

```bash
alita cordova --android
```

> Cli 创建的项目，可以执行 `cordova-add-android` ("cordova-add-android": "alita cordova --android",
)

## 将代码编译到原生项目中

```bash
cross-env CORDOVA=android alita build
```

> 通过环境变量 CORDOVA=android 来匹配不同的平台，前面使用 cross-env 是为了消除电脑环境差异。在mac 上 执行的是 `CORDOVA=android alita build`，而在 windows 上需要执行`set CORDOVA=android alita build`

> Cli 创建的项目，可以执行 `cordova-add-ios` ("build-android": "cross-env CORDOVA=android alita build")

## 在 Android Studio 上运行代码

打开Android Studio，选择项目目录下的 Android 项目 `platforms/android`。

在Android Studio中，在编译器右上角，选择目标模拟器或设备（如果你都没有设备和模拟器，你可以根据指引添加一个模拟器），然后单击“播放”按钮。

![Android Studio Run Button Area](/assets/img/running/android-studio-run-button-area.png)

### 查看原生日志

可以在 Android Studio 的 **Logcat** 中，查看到项目运行日志。

> 如果你的 Android Studio **Logcat** 是隐藏的，可以设置 **View** &raquo; **Tool Windows** &raquo; **Logcat** 显示。

![Android Studio Logcat](/assets/img/running/android-studio-logcat.png)

## 实时开发调试

```bash
cross-env CORDOVA=android alita dev
```

> 直接启动开发服务器，Cli 创建的项目，可以执行 `start-android` ("start-android": "cross-env CORDOVA=android alita dev")

会开启一个web页面，会等待cordova加载完毕才会运行项目。你可以重新在 Android Studio 里面编译一下你的项目，就可以在设备上实时预览你的页面变更了。

## FAQ

待补充
