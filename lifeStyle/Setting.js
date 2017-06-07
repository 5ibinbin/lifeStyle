/**
 * Created by Cral-Gates on 2017/4/27.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import NavigationBar from './component/NavigationBar';
import MyNote from './setting/MyNote';
import AboutMe from './setting/AboutMe';
import LongLine from './component/LongLine';
import TextButton from './component/TextButton';
import Util from './utils/Util';
import Global from './utils/Global';
import NetUtil from './utils/NetUtil';
import StorageUtil from './utils/StorageUtil';
import JsonUtil from './utils/JsonUtil';

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '设置',
        }
    }

    componentDidMount() {
        StorageUtil.get('username').then((username) => {
            this.setState({
                username: username
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.state.title}
                    showLeftState ={false}/>
                <LongLine/>
                <TouchableOpacity onPress={()=> this._goMyNote()}>
                    <View style={styles.item}>
                        <Image style={styles.imageLeft} source={require('./img/note-list.png')}></Image>
                        <Text style={styles.textMiddle}>{'我的笔记足迹'}</Text>
                        <Image style={styles.imageRight} source={require('./img/black-right.png')}></Image>
                    </View>
                </TouchableOpacity>
                <LongLine/>
                <TouchableOpacity onPress={()=> this._goAboutMe()}>
                    <View style={styles.item}>
                        <Image style={styles.imageLeft} source={require('./img/about-me.png')}></Image>
                        <Text style={styles.textMiddle}>{'关于我'}</Text>
                        <Image style={styles.imageRight} source={require('./img/black-right.png')}></Image>
                    </View>
                </TouchableOpacity>
                <LongLine/>
            </View>
        )
    }

    _goMyNote = () => {
        this.props.navigator.push({
            name: 'MyNote',
            component: MyNote,
            params: {}
        });
    };
    _goAboutMe = () => {
        this.props.navigator.push({
            name: 'AboutMe',
            component: AboutMe,
            params:{}
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: 'white'
    },
    imageLeft: {
        height: 30,
        width: 30,
        marginLeft: 18,
        marginRight: 18
    },
    textMiddle: {
        fontSize: 18,
        color: 'black',
        flex: 1
    },
    imageRight: {
        height: 20,
        width: 20,
        marginRight: 15,
    }
});

export default Setting;