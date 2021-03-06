/**
 * Created by Cral-Gates on 2017/4/28.
 */
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    ToastAndroid,
    TouchableOpacity
} from 'react-native';

import Global from '../utils/Global';
import NetUtil from '../utils/NetUtil';
import JsonUtil from '../utils/JsonUtil';
import Util from '../utils/Util';
import StorageUtil from '../utils/StorageUtil';

import LifeStyle from '../App';
import Register from '../login/Register';
import ResetPwd from '../login/ResetPwd';
import TextButton from '../component/TextButton';
import LoadingView from '../component/LoadingView';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            showLoading: false
        }
    }

    componentWillMount() {
        console.log('login componentWillMount');
    }

    componentDidMount() {
        this.setState({
            name: 'zhang'
        });
        console.log('login componentDidMount');
    }

    render() {
        console.log(this.state.name);
        return (
            <View style={styles.container}>
                <Image source={require('../img/logo.png')} style={styles.image}/>
                <TextInput
                    style={styles.user_input}
                    placeholder={'请输入用户名'}
                    autoFocus={true}
                    numberOfLines={1}
                    autoCapitalize={'none'}
                    underlineColorAndroid={'transparent'}
                    textAlign="center"
                    onChangeText={(username) => this.setState({username})}/>
                <View style={styles.long_line}/>
                <TextInput
                    style={styles.pwd_input}
                    placeholder={'请输入密码'}
                    numberOfLines={1}
                    secureTextEntry={true}
                    underlineColorAndroid={'transparent'}
                    textAlign="center"
                    onChangeText={(password) => this.setState({password})}/>
                <TouchableOpacity onPress={() => this._login()}>
                    <View style={styles.commit}>
                        <TextButton
                            text="登录"
                            color={'black'}
                            onPress={() => this._login()}
                            backgroundColor={'#FFDE00'}/>
                    </View>
                </TouchableOpacity>

                <View style={styles.fun_Item}>
                    <TextButton
                        text={'忘记密码'}
                        onPress={() => this._resetPwd()}
                        color={'#FFDE00'}
                        backgroundColor={'transparent'}/>

                    <TextButton
                        style={styles.register}
                        text={'用户注册'}
                        onPress={() => this._register()}
                        color={'#FFDE00'}
                        backgroundColor={'transparent'}/>
                </View>
                <LoadingView
                    showLoading={this.state.showLoading}/>
            </View>
        )
    }

    shouldComponentUpdate() {
        console.log('login shouldComponentUpdate');
        return true;
    }

    componentWillUpdate() {
        console.log('login componentWillUpdate');
    }

    componentWillReceiveProps(nextProps, nextState) {
        console.log('login componentWillReceiveProps')
    }

    componentDidUpdate() {
        console.log('login componentDidUpdate');
    }

    _login = () => {
        let _this = this;
        let username = this.state.username;
        let password = this.state.password;
        let url = Global.LOGIN + "username=" + username + "&password=" + password;
        if (Util.isEmpty(username)) {
            Util.showToast('请输入用户名');
            return;
        }
        if (Util.isEmpty(password)) {
            Util.showToast('请输入密码');
            return;
        }
        this.setState({
            showLoading: true
        });
        NetUtil.get(url, function (res) {
            _this.setState({
                showLoading: false
            });
            if (res.hasOwnProperty('code')) {
                Util.showToast(res.error);
            } else {
                StorageUtil.save('username', res.username, function () {
                    console.log('成功');
                });
                _this.props.navigator.push({
                    name: 'lifeStyle',
                    component: LifeStyle,
                    params: {
                        username: _this.state.username
                    }
                });
            }
        });
    };
    _register = () => {
        this.props.navigator.push({
            name: 'register',
            component: Register,
            params: {
                name: 'ibinbin'
            }
        });
    };
    _resetPwd = () => {
        this.props.navigator.push({
            name: 'resetPwd',
            component: ResetPwd,
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    image: {
        borderRadius: 50,
        height: 100,
        width: 100,
        marginTop: 80,
        alignSelf: 'center',
    },
    long_line: {
        height: 1,
        backgroundColor: '#f4f4f4'
    },
    user_input: {
        backgroundColor: '#fff',
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 5,
        height: 35,
        fontSize: 15
    },
    pwd_input: {
        backgroundColor: '#fff',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 5,
        height: 35,
        fontSize: 15
    },
    commit: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#FFDE00',
        height: 35,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fun_Item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    reset_pwd: {
        fontSize: 14,
        color: '#FFDE00',
        backgroundColor: 'white'
    },
    register: {
        fontSize: 14,
        color: '#FFDE00',
        textAlign: 'right',
    }

});

export default Login;