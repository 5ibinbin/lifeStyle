/**
 * Created by Cral-Gates on 2017/5/11.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Modal,
    TouchableOpacity
} from 'react-native';
import Header from '../component/Header';
import Util from '../utils/Util';
import Global from '../utils/Global';
import NetUtil from '../utils/NetUtil';
import StorageUtil from '../utils/StorageUtil';
import JsonUtil from '../utils/JsonUtil';

class AddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            title: '',
            subTitle: '',
            noteTitle: '',
            notebook:'',
            noteContent: '',
            height: 30,
            animationType: 'slide',
            modalVisible: false,
            transparent: false,
            notebooks:[],
        }
    }

    componentDidMount() {
        this.setState({
            title: '新增笔记',
            subTitle: '完成',
            notebook:'我的第一个笔记本'
        });
        StorageUtil.get('username').then((username) => {
            this.setState({
                username: username
            });
            this._getMyNoteBook();
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType={this.state.animationType}
                    transparent={this.state.transparent}
                    visible={this.state.modalVisible}>
                    <Header
                        title={this.state.title}
                        subTitle={this.state.subTitle}
                        backState={'false'}
                        onPressRight={() => this._hideNoteModal()}/>
                </Modal>
                <Header
                    title={this.state.title}
                    subTitle={this.state.subTitle}
                    backState={'true'}
                    onPress={() => this._goBack()}
                    onPressRight={() => this._completeNote()}/>
                <TouchableOpacity onPress={() => this._showNoteModal()}>
                    <View style={styles.note}>
                        <Image style={styles.noteImg} source={require('../img/noteflag.png')}/>
                        <Text style={styles.noteType}>{this.state.notebook}</Text>
                    </View>
                </TouchableOpacity>
                <TextInput
                    style={styles.noteTitle}
                    numberOfLines={1}
                    secureTextEntry={false}
                    underlineColorAndroid={'transparent'}
                    value={this.state.noteTitle}
                    placeholder={'标题'}
                    placeholderTextColor={'#999'}
                    onChangeText={(noteTitle) => this.setState({noteTitle})}/>
                <TextInput
                    style={[styles.noteContent, {height: this.state.height}]}
                    placeholder={'内容'}
                    multiline={true}
                    value={this.state.noteContent}
                    underlineColorAndroid={'transparent'}
                    onChange={() => this._onChange.bind(this)}
                    onContentSizeChange={(event) => this._onContentSizeChange(event)}
                    onChangeText={(noteContent) => this.setState({noteContent})}/>
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
        let noteTitle = this.state.noteTitle;
        let noteContent = this.state.noteContent;
        let notebook = this.state.notebook;
        let params = {
            author:username,
            title: noteTitle,
            content: noteContent,
            notebook: notebook
        };
        let url = Global.ADDNOTE;
        if (Util.isEmpty(noteTitle)) {
            Util.showToast('请输入笔记标题');
            return;
        }
        if (Util.isEmpty(noteContent)) {
            Util.showToast('请输入笔记内容');
            return;
        }
        NetUtil.postJson(url, params, function (response) {
            if (response.hasOwnProperty('objectId')){
                if (navigator) {
                    navigator.pop();
                }
            }
        });
    };

    _onChange = (event) => {
        this.setState({
            noteContent: event.nativeEvent.text,
            height: event.nativeEvent.contentSize.height
        });
    };

    _onContentSizeChange = (event) => {
        this.setState({
            height: event.nativeEvent.contentSize.height
        });
    };

    _getMyNoteBook = ()=> {
        let _this = this;
        let username = this.state.username;
        let params = {
            "author": username
        };
        let url = Global.NOTEBOOK + JsonUtil.jsonToStr(params);
        NetUtil.get(url, function (response) {
            console.log(response);
            _this.setState({
                notebooks:response.results
            });
        });
    };

    _showNoteModal = () => {
        this.setState({
            modalVisible: true,
        });
    };

    _hideNoteModal = () => {
        this.setState({
            modalVisible: false
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    note: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    noteImg: {
        height: 25,
        width: 25,
        marginLeft: 10
    },
    noteType: {
        height: 16,
        fontSize: 16,
        marginLeft: 10
    },
    noteTitle: {
        backgroundColor: 'white',
        paddingLeft: 25,
        paddingRight: 25,
        height: 35,
        fontSize: 18,
        fontWeight: '500',
        color: 'black'
    },
    noteContent: {
        backgroundColor: 'white',
        paddingLeft: 25,
        paddingRight: 25,
        fontSize: 16,
        color: 'black'
    }
});

export default AddNote;