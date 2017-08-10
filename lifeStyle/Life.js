/**
 * Created by Cral-Gates on 2017/4/27.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';
import NavigationBar from "./component/NavigationBar";
import LongLine from "./component/LongLine";
import Global from "./utils/Global";
import NetUtil from "./utils/NetUtil";
import JsonUtil from "./utils/JsonUtil";
import StorageUtil from "./utils/StorageUtil";
import Util from './utils/StorageUtil';
import Search from './component/Search';
import NoteDetail from './life/NoteDetail';
import AddNote from './life/AddNote';

import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';
import SwipeOut from 'react-native-swipeout';

class Life extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            username: '',
            title: '笔记',
            dataSource: ds,
            load: false,
            searchContent: ''
        };
    }

    componentDidMount() {
        StorageUtil.get('username').then((username) => {
            this.setState({
                username: username
            });
            this.getNoteData();
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps');
        this.getNoteData();
    };

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.state.title}
                    showLeftState ={false}/>
                {/*<Search*/}
                    {/*textValue={this.state.searchContent}*/}
                    {/*onPress={() => this.searchNote()}/>*/}
                <View style={styles.line}/>
                <ListView
                    contentContainerStyle={styles.listView}
                    renderScrollComponent={(props) => <PullRefreshScrollView
                        onRefresh={(PullRefresh) => this.onRefresh(PullRefresh)}
                        {...props}/>}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderNote.bind(this)}
                    enableEmptySections={true}/>

                <TouchableOpacity style={styles.addNote} onPress={() => this.goAddNote()}>
                    <View>
                        <Image style={styles.addImg} source={require('./img/addimg.png')}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    renderNote(note) {
        var swipeOutBtn = [{
            text: '删除',
            backgroundColor: '#ffde00',
            color: 'black',
            onPress: () => this.deleteNote(note),
        }];
        return (
            <SwipeOut right={swipeOutBtn} autoClose={true} style={{backgroundColor:'#f5f5f5'}}>
                <TouchableOpacity onPress={() => this.goNoteDetail(note)}>
                    <View>
                        <View style={styles.listViewItem}>
                            <Text style={styles.noteTitle}>{note.title}</Text>
                            <Text numberOfLines={3} style={styles.noteContent}>{note.content}</Text>
                            <Text style={styles.noteDate}>{note.createdAt.substring(0, 10)}</Text>
                        </View>
                        <LongLine/>
                    </View>
                </TouchableOpacity>
            </SwipeOut>
        )
    }

    goNoteDetail = (note) => {
        this.props.navigator.push({
            name: 'NoteDetail',
            component: NoteDetail,
            params: {
                noteDetail: note,
            }
        });
    };

    goAddNote = () => {
        this.props.navigator.push({
            name: 'AddNote',
            component: AddNote,
            params: {
                title: ''
            }
        });
    };

    onRefresh(PullRefresh) {
        let _this = this;
        let username = this.state.username;
        let where = {
            "author": username
        };
        let url = Global.NOTES + JsonUtil.jsonToStr(where) + '&order=-updatedAt';
        NetUtil.get(url, function (response) {
            console.log(response);
            _this.setState({
                dataSource: _this.state.dataSource.cloneWithRows(response.results),
                load: true
            });
            PullRefresh.onRefreshEnd();
        });
    }

    /*
     * 获取列表数据
     * */
    getNoteData = () => {
        let _this = this;
        let username = this.state.username;
        let params = {
            "author": username
        };
        let url = Global.NOTES + JsonUtil.jsonToStr(params) + '&order=-updatedAt';
        NetUtil.get(url, function (response) {
            _this.setState({
                dataSource: _this.state.dataSource.cloneWithRows(response.results),
                load: true
            });
        });
    };
    /*
     * 笔记搜索
     * */
    searchNote = () => {
        let _this = this;
        let username = this.state.username;
        let title = _this.state.searchContent;
        let params = {
            "author": username,
            "title": title
        };
        console.log(params);
        let url = Global.NOTES + JsonUtil.jsonToStr(params);
        NetUtil.get(url, function (response) {
            console.log(response);
            _this.setState({
                dataSource: _this.state.dataSource.cloneWithRows(response.results),
                load: true
            });
        });
    };
    /*
     * 删除笔记
     * */
    deleteNote = (note) => {
        let _this = this;
        let url = Global.DELETENOTE + note.objectId;
        NetUtil.delete(url, function (response) {
            _this.getNoteData();
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    line: {
        height: 1,
        width: Dimensions.get('window').width,
        backgroundColor: '#dddddd'
    },
    listView: {
        margin: 0,
        padding: 0
    },
    listViewItem: {
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        padding: 8
    },
    noteDate: {
        fontSize: 12,
        color: '#ffde00',
        margin: 2
    },
    noteTitle: {
        fontSize: 16,
        color: 'black',
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 2,
        fontWeight: 'bold'
    },
    noteContent: {
        fontSize: 14,
        color: '#666',
        margin: 2,
        maxHeight: 46,
        lineHeight: 14
    },
    addNote: {
        backgroundColor: '#ffde00',
        borderRadius: 25,
        right: 40,
        bottom: 40,
        position: 'absolute',
    },
    addImg: {
        height: 50,
        width: 50
    }
});

export default Life;