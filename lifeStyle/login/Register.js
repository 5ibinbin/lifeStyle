/**
 * Created by Cral-Gates on 2017/4/28.
 */
'user strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import TextButton from "../component/TextButton";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'zhang'
        };
    }

    componentDidMount() {
        this.setState({
            name: this.props.name
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../img/logo.png')} style={styles.image}/>
                <TextInput
                    style={styles.user_input}
                    placeholder={'请输入手机号'}
                    autoFocus={true}
                    numberOfLines={1}
                    underlineColorAndroid={'transparent'}
                    textAlign="left"/>
                <TextInput
                    style={styles.pwd_input}
                    placeholder={'请输入密码'}
                    numberOfLines={1}
                    secureTextEntry={true}
                    underlineColorAndroid={'transparent'}
                    textAlign="left"/>

                <View style={styles.register}>
                    <TouchableOpacity>
                        <TextButton
                            text="注册"
                            onPress={() => this._goBack()}
                            color={'black'}
                            backgroundColor={'#FFDE00'}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _register = () => {
        this._goBack();
    };
    _goBack = () => {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
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
    user_input: {
        backgroundColor: '#fff',
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 10,
        borderRadius: 5,
        height: 35,
    },
    pwd_input: {
        backgroundColor: '#fff',
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 10,
        borderRadius: 5,
        height: 35,
    },
    register: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#FFDE00',
        height: 35,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Register;