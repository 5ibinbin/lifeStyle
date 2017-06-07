/**
 * Created by Cral-Gates on 2017/5/11.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import NavigationBar from '../component/NavigationBar';
import LongLine from '../component/LongLine';
import TextButton from '../component/TextButton';
import Util from '../utils/Util';
import Global from '../utils/Global';
import NetUtil from '../utils/NetUtil';
import StorageUtil from '../utils/StorageUtil';
import JsonUtil from '../utils/JsonUtil';

class AddNotebook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            notebook: '',
            title: '新建笔记本',
            subTitle: '完成'
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
                    subTitle={this.state.subTitle}
                    showLeftState ={true}
                    showRightState={true}
                    showRightImage={false}
                    rightItemTitle={'完成'}
                    onPress={() => this._goBack()}
                    onPressRight={() => this._completeNote()}/>
                <View style={styles.notebookContent}>
                    <TextInput
                        style={styles.notebookInput}
                        numberOfLines={1}
                        underlineColorAndroid={'transparent'}
                        placeholder={'请输入笔记本名称'}
                        placeholderTextColor={'#ffde00'}
                        value={this.state.notebook}
                        onChangeText={(notebook) => this.setState({notebook})}/>
                </View>
            </View>
        )
    }

    _goBack = () => {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    };

    _completeNote = () => {
        const {navigator} = this.props;
        let username = this.state.username;
        let notebookName = this.state.notebook;
        let params = {
            author: username,
            notebook: notebookName,
        };
        let url = Global.ADDNOTEBOOK;
        if (Util.isEmpty(notebookName)) {
            Util.showToast('请输入笔记本名称');
            return;
        }
        NetUtil.postJson(url, params, function (response) {
            console.log(response);
            if (response.hasOwnProperty('objectId')) {
                if (navigator) {
                    navigator.pop();
                }
            }
        });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    notebookContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    notebookInput: {
        height:40,
        width: Dimensions.get('window').width,
        textAlign:'center',
        color:'#ffde00',
        fontSize:20,
    }
});

export default AddNotebook;