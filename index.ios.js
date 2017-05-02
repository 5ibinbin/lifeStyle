/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import AV from 'leancloud-storage';

import {
    AppRegistry,
    Navigator
} from 'react-native';

import Login from './lifeStyle/login/Login'
AV.initialize('M401fErHUPYhDKmgp0wjqVRX-gzGzoHsz', 'Jqnvt1Lmt34vQh1JDRUpRAqq');


export default class lifeStyle extends Component {

    //第一次调用的时候，第一个参数route就是initialRoute
    renderScene = (route, navigator) => {
        // console.log(route);
        let Component = route.component;
        return <Component {...route.params} navigator={navigator}/>
    };

    initialRoute = {
        name: 'login',
        component: Login,
    };

    configureScene = (route) => {
        return Navigator.SceneConfigs.FloatFromRight;
    };

    render() {
        return (
            <Navigator
                initialRoute={this.initialRoute}
                renderScene={this.renderScene}
                configureScene={this.configureScene}/>
        );
    }
}

AppRegistry.registerComponent('lifeStyle', () => lifeStyle);