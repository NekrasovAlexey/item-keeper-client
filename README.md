## О проекте
Проект реализован на React Native с использованием react-native-cli и взаимодействием с нативным Android-кодом.

## Как запустить
### Подготовка
- Необходимо установить node, JDK

- Необходимо react-native-cli
	```bash
	npm install -g react-native-cli
	```
- Для сборки нативного кода нужно установить Android SDK
	Самый простой способ это сделать - установить [Android Studio](https://developer.android.com/studio/index.html)
	При установке выбрать пункты:
	-   `Android SDK`
	-   `Android SDK Platform`
	-   `Performance (Intel ® HAXM)`
	-   `Android Virtual Device`
	При разработке использовалась Android SDK Platform 28
- Установить переменные окружения для компилирования нативного кода:
	```bash
	export  ANDROID_HOME=$HOME/Library/Android/sdk
	export  PATH=$PATH:$ANDROID_HOME/emulator
	export  PATH=$PATH:$ANDROID_HOME/tools
	export  PATH=$PATH:$ANDROID_HOME/tools/bin
	export  PATH=$PATH:$ANDROID_HOME/platform-tools
	```
- Для загрузки зависимостей выполнить в корне проекта
	```bash
	npm i
	```
- Нужно либо подключить Android устройство в режиме ***USB debugging*** или запустить эмулятор в Android Studio

### Запуск приложения
Для запуска приложения в корневой папке выполните
```bash
react-native run-android
```

## Настройка
Текущая реализация содержит в себе токен аккаунта.
Найти их можно в файлах ***[consts.js](https://github.com/NekrasovAlexey/item-keeper-client/blob/master/consts.js)*** и ***[/android/app/src/main/java/com/awesomeproject/ToastModule.java](https://github.com/NekrasovAlexey/item-keeper-client/blob/master/android/app/src/main/java/com/awesomeproject/ToastModule.java)*** в переменных myAccount и seed соответственно.

## Back-end
[Репозиторий](https://bitbucket.org/execc/item-keeper-backend/src/master/)

Адрес сервера для приложения указывается в файле ***[consts.js](https://github.com/NekrasovAlexey/item-keeper-client/blob/master/consts.js)*** в переменной ***server***

## Контакты
Telegram: ***@avnekr***