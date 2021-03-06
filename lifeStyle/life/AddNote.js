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
    TouchableOpacity,
    Dimensions,
    ListView,
    ScrollView
} from 'react-native';
import NavigationBar from '../component/NavigationBar';
import LongLine from '../component/LongLine';
import TextButton from '../component/TextButton';
import AddNotebook from '../life/AddNotebook';
import NotebookDetail from '../life/NotebookDetail';
import Util from '../utils/Util';
import Global from '../utils/Global';
import NetUtil from '../utils/NetUtil';
import StorageUtil from '../utils/StorageUtil';
import JsonUtil from '../utils/JsonUtil';

class AddNote extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            username: '',
            title: '',
            subTitle: '',
            noteTitle: '',
            notebook: '',
            noteContent: '',
            height: 30,
            notebooks: ds,
            notePosition: 0,
            noteArray: []
        }
    }

    componentDidMount() {
        this.setState({
            title: '新增笔记',
            subTitle: '完成',
            notebook: '我的第一个笔记本',
            notePosition: 0
        });
        StorageUtil.get('username').then((username) => {
            this.setState({
                username: username
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps');
    };

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
                <ScrollView >
                    <TouchableOpacity onPress={() => this._goNotebookDetail()}>
                        <View style={styles.note}>
                            <Image style={styles.noteImg} source={require('../img/noteflag.png')}/>
                            <Text style={styles.noteType}>{this.state.notebook}</Text>
                        </View>
                    </TouchableOpacity>
                    <LongLine/>
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
                </ScrollView>
            </View>
        )
    }

    _goBack = () => {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    };

    _goNotebookDetail = ()=> {
        this.props.navigator.push({
            name: 'NotebookDetail',
            component: NotebookDetail,
            params: {
                notebook:this.state.notebook,
                notePosition: this.state.notePosition,
                getNotebookPosition: (notebookPosition) => {
                    this.setState({
                        notePosition: notebookPosition
                    })
                },
                getNotebook:(notebook) => {
                    this.setState({
                        notebook:notebook
                    })
                }
            }
        });
    };

    _completeNote = () => {
        const {navigator} = this.props;
        let username = this.state.username;
        let noteTitle = this.state.noteTitle;
        let noteContent = this.state.noteContent;
        let notebook = this.state.notebook;
        let params = {
            author: username,
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
            if (response.hasOwnProperty('objectId')) {
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

    _getMyNoteBook = () => {
        let _this = this;
        let username = this.state.username;
        let params = {
            "author": username
        };
        let url = Global.NOTEBOOK + JsonUtil.jsonToStr(params);
        NetUtil.get(url, function (response) {
            console.log(response);
            _this.setState({
                notebooks: _this.state.notebooks.cloneWithRows(response.results),
                noteArray: response.results
            });
        });
    };
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
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
        paddingRight: 20,
        fontSize: 16,
        color: 'black'
    },
    notebookModal: {
        flex: 1,
        backgroundColor: 'white',
    },
    notebookAll: {
        flexDirection: 'row',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    notebookAllText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    notebookItem: {
        flexDirection: 'column',
        height: 51
    },
    notebookItemContent: {
        flexDirection: 'row',
        height: 50
    },
    notebookItemContentLeft: {
        flexDirection: 'column',
        flex: 4,
        paddingLeft: 20
    },
    notebookItemContentTitle: {
        fontSize: 16,
        color: 'black',
        marginTop: 8,
        marginBottom: 5
    },
    notebookItemContentDate: {
        fontSize: 14,
        color: '#ffde00',
        marginTop: 1,
        marginBottom: 5
    },
    notebookItemRight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    notebookItemRightImage: {
        height: 20,
        width: 20
    },
    notebookAdd: {
        position: 'absolute',
        bottom: 10,
        left: 20,
        color: "#ffde00",
        backgroundColor: 'transparent',
        fontSize: 18
    }
});

export default AddNote;