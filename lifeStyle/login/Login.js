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
    TextInput,
    TouchableOpacity
} from 'react-native';

import LifeStyle from '../App';
import Register from '../login/Register';
import ResetPwd from '../login/ResetPwd';
import TextButton from '../component/TextButton';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    componentWillMount() {
        this.setState({
            name: 'zhang'
        });
        console.log('componentWillMount');
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    render() {
        console.log('render' + this.state.name);
        return (
            <View style={styles.container}>
                <Image source={require('../img/logo.png')} style={styles.image}/>
                <TextInput
                    style={styles.user_input}
                    placeholder={'请输入用户名'}
                    autoFocus={true}
                    numberOfLines={1}
                    underlineColorAndroid={'transparent'}
                    textAlign="center"/>
                <View style={styles.long_line}/>
                <TextInput
                    style={styles.pwd_input}
                    placeholder={'请输入密码'}
                    numberOfLines={1}
                    secureTextEntry={true}
                    underlineColorAndroid={'transparent'}
                    textAlign="center"/>

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
            </View>
        )
    }

    componentWillReceiveProps(nextProps) {
        // console.log('componentWillReceiveProps', nextProps);
    }

    shouldComponentUpdate() {
        console.log('shouldComponentUpdate');
        return true;
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    _login = () => {
        this.props.navigator.push({//还记得navigator作为属性传给了每一个scene吗！对了，就是这样取到他
            name: 'lifeStyle',
            component: LifeStyle,//通过push方法将一个component入栈，push方法接收一个route，其中必须包含一个component
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
    },
    pwd_input: {
        backgroundColor: '#fff',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 5,
        height: 35,
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