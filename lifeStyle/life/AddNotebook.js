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
import Header from '../component/Header';
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
            notebookName: '',
            title: '新建笔记本',
            subTitle: '完成'
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={this.state.title}
                    subTitle={this.state.subTitle}
                    backState={'true'}
                    onPress={() => this._goBack()}
                    onPressRight={() => this._completeNote()}/>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TextInput
                        style={styles.notebookInput}
                        numberOfLines={1}
                        underlineColorAndroid={'transparent'}
                        placeholder={'请输入笔记本名称'}
                        placeholderTextColor={'#333'}
                        value={this.state.notebookName}
                        onChangeText={(notebookName) => this.setState({notebookName})}/>
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
        let username = this.state.username;
        let notebookName = this.state.notebookName;
        let params = {
            author: username,
            title: noteTitle,
        };
        let url = Global.ADDNOTE;
        if (Util.isEmpty(notebookName)) {
            Util.showToast('请输入笔记本名称');
            return;
        }
        NetUtil.postJson(url, params, function (response) {
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
    notebookInput: {
        height:40,
        width: Dimensions.get('window').width,
        textAlign:'center',
        color:'#ffde00',
        fontSize:20,
    }
});

export default AddNotebook;