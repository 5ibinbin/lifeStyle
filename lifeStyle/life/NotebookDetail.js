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
    ListView
} from 'react-native';
import Header from '../component/Header';
import LongLine from '../component/LongLine';
import TextButton from '../component/TextButton';
import AddNotebook from '../life/AddNotebook';
import Util from '../utils/Util';
import Global from '../utils/Global';
import NetUtil from '../utils/NetUtil';
import StorageUtil from '../utils/StorageUtil';
import JsonUtil from '../utils/JsonUtil';

class NotebookDetail extends Component {
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
            animationType: 'slide',
            modalVisible: false,
            transparent: false,
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
        console.log(nextProps);
    };

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType={this.state.animationType}
                    transparent={this.state.transparent}
                    visible={this.state.modalVisible}>
                    <View style={styles.notebookModal}>
                        <Header
                            title={this.state.notebook}
                            subTitle={this.state.subTitle}
                            backState={'false'}
                            onPressRight={() => this._hideNoteModal()}/>
                        <View
                            style={styles.notebookAll}>
                            <Text style={styles.notebookAllText}>{'所有笔记'}</Text>
                        </View>
                        <ListView
                            dataSource={this.state.notebooks}
                            renderRow={this.renderNoteBookItem.bind(this)}/>
                        <TouchableOpacity onPress={()=> this._goAddNotebook()}>
                            <Text style={styles.notebookAdd}>{'新建笔记本'}</Text>
                        </TouchableOpacity>
                    </View>
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

    renderNoteBookItem(notebook, selectId, rowId) {
        console.log(selectId + '.....' + rowId);
        console.log(this.state.notePosition);
        return (
            <TouchableOpacity onPress={() => this._chooseNoteBook(notebook)}>
                <View style={styles.notebookItem}>
                    <LongLine/>
                    <View style={styles.notebookItemContent}>
                        <View style={styles.notebookItemContentLeft}>
                            <Text style={styles.notebookItemContentTitle}>{notebook.notebook}</Text>
                            <Text style={styles.notebookItemContentDate}>{notebook.createdAt.substring(0, 10)}</Text>
                        </View>
                        <View style={styles.notebookItemRight}>
                            {
                                this.state.notePosition == rowId ?
                                    (<Image style={styles.notebookItemRightImage}
                                            source={require('../img/check-radio.png')}/>) :
                                    (<Text/>)
                            }
                        </View>
                    </View>
                    {
                        this.state.noteArray == rowId ? (<LongLine/>) : (<Text/>)
                    }
                </View>
            </TouchableOpacity>
        )
    };

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

    _goAddNotebook = () => {
        this.props.navigator.push({
            name: 'AddNotebook',
            component: AddNotebook,
            params: {
                title: ''
            }
        });
    };

    _showNoteModal = () => {
        this.setState({
            modalVisible: true,
        });
        this._getMyNoteBook();
    };

    _hideNoteModal = () => {
        this.setState({
            modalVisible: false
        })
    };

    _chooseNoteBook = (notebook) => {
        let noteArray = this.state.noteArray;
        for (let i in noteArray) {
            if (notebook.notebook === noteArray[i].notebook) {
                this.setState({
                    notePosition: i,
                    notebook: notebook.notebook
                });
            }
        }
    };
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

export default NotebookDetail;