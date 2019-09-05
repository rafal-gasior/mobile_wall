## instalacja projektu: ##
react-native init --version="react-native@0.55.0" YOUR_APP_NAME
cd YOUR_APP_NAME

##zalecana wersja gradle w projekcie (gradle-wrapper.properties):
set gradle-wrapper.properties:
distributionUrl=https\://services.gradle.org/distributions/gradle-4.1-all.zip

set build.gradle:
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    repositories {
        jcenter()
        google()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.0.1'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        mavenLocal()
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url "$rootDir/../node_modules/react-native/android"
        }
        google()
        jcenter()
    }
}

cd YOUR_APP_NAME/android
gradlew clean
###############################################################################################


## w razie bledu przy buildowaniu lub po dodaniu nowej biblioteki: ##
unplug device
adb kill-server
adb start-server
plug device
android gradlew clean

## dodatkowe biblioteki INSTALACJA: ##
npm install --save react-navigation

npm install react-native-image-picker

react-native link react-native-image-picker

npm install --save prop-types

npm install --save moment

npm install --save react-native-elements
npm i --save react-native-vector-icons
react-native link react-native-vector-icons

## build ##
react-native run-android

# jesli blad po dodaniu react-native-camera, dodac do app/build.gradle:#
dependencies {
    implementation (project(':react-native-camera')){
        exclude group: "com.google.android.gms"
        exclude group: "com.android.support"
    }
    ...
}

configurations.all {
    resolutionStrategy {
        force 'com.android.support:support-v4:27.1.0'
    }
}

###################################################################
##react-native atom: ##
zainstalowac w atom linter-eslint i linter
npm install --save-dev babel-eslint eslint eslint-plugin-react
utworzyc w projekcie plik '.eslintrc' z zawartoscia:
{
    "parser": "babel-eslint",
    "env": {
        "browser": true
    },
    "plugins": [
        "react"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "rules": {
        // overrides
        "no-console": 0,
    }
}



## Odpalenie aplikacji na urz�dzeniu: ##
cd C:\Users\Medialine\AppData\Local\Android\Sdk\platform-tools
adb devices
cd C:\Users\Medialine\myproject
react-native run-android
cd C:\Users\Medialine\AppData\Local\Android\Sdk\platform-tools
adb reverse tcp:8081 tcp:8081
