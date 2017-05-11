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
    TouchableOpacity
} from 'react-native';
import Header from "./component/Header";
import Global from "./utils/Global";
import NetUtil from "./utils/NetUtil";
import JsonUtil from "./utils/JsonUtil";
import StorageUtil from "./utils/StorageUtil";
import Util from './utils/StorageUtil';
import Search from './component/Search';
import NoteDetail from './life/NoteDetail';

import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';


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

    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={this.state.title}
                    backState={'false'}/>
                <Search
                    textValue={this.state.searchContent}/>
                <View style={styles.line}/>
                <ListView
                    contentContainerStyle={styles.listView}
                    renderScrollComponent={(props) => <PullRefreshScrollView
                        onRefresh={(PullRefresh) => this.onRefresh(PullRefresh)}
                        {...props}/>}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderNote.bind(this)}
                    enableEmptySections={true}/>
            </View>
        )
    }

    renderNote(note) {
        return (
            <TouchableOpacity onPress={()=>this.goNoteDetail(note)}>
                <View style={styles.listViewItem}>
                    <Text style={styles.noteDate}>{note.createdAt.substring(0, 10)}</Text>
                    <Text style={styles.noteTitle}>{note.title}</Text>
                    <Text style={styles.noteContent}>{note.content}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    onRefresh(PullRefresh) {
        let _this = this;
        let username = this.state.username;
        let where = {
            "author": username
        };
        let url = Global.NOTES + JsonUtil.jsonToStr(where);
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
        let url = Global.NOTES + JsonUtil.jsonToStr(params);
        NetUtil.get(url, function (response) {
            console.log(response);
            _this.setState({
                dataSource: _this.state.dataSource.cloneWithRows(response.results),
                load: true
            });
        });
    };

    goNoteDetail = (note) =>{
        this.props.navigator.push({
            name: 'NoteDetail',
            component: NoteDetail,
            params: {
                noteDetail: note,
            }
        });
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
        margin:0,
        padding:0
    },
    listViewItem: {
        width: Dimensions.get('window').width - 20,
        backgroundColor: 'white',
        borderRadius:10,
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        padding:10
    },
    noteDate: {
        fontSize:12,
        color:'#ffde00',
        margin:2
    },
    noteTitle: {
        fontSize:16,
        color:'black',
        marginTop:4,
        marginBottom:4,
        marginLeft:2,
        fontWeight:'bold'
    },
    noteContent: {
        fontSize:14,
        color:'#666',
        margin:2,
        maxHeight:48,
        lineHeight:14
    }
});

export default Life;