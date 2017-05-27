/**
 * Created by Cral-Gates on 2017/5/24.
 */
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
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import Header from "../component/Header";
import LongLine from "../component/LongLine";
import Global from "../utils/Global";
import NetUtil from "../utils/NetUtil";
import JsonUtil from "../utils/JsonUtil";
import StorageUtil from "../utils/StorageUtil";
import Util from '../utils/Util';
import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';

class MyNote extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            username: '',
            dataSource: ds,
            load: false,
            title: '我的笔记',
            color: ['red', 'blue', 'yellow', 'pink', 'green', 'brown', 'purple', 'beige', 'chocolate', 'ivory', 'khaki'],
            noteStart: 0,
            noteEnd: 1
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
                    backState={'true'}
                    onPress={() => this._goBack()}/>
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

    renderNote(note, selectId, rowId) {
        let randomColor = this.state.color[Math.round(Math.random() * 7)];
        return (
            <TouchableHighlight>
                <View style={styles.listViewContainer}>
                    <View style={{alignSelf: 'center'}}>
                        <Text style={{width:50, color:randomColor}}>{note.updatedAt.substring(0, 4)}</Text>
                        <Text style={{width:50, color:randomColor}}>{note.updatedAt.substring(5, 10)}</Text>
                    </View>
                    <View style={styles.listViewLeft}>
                        {
                            this.state.noteStart == rowId ? (
                                <View style={styles.lineTopTrans}/>) : (
                                <View style={styles.lineTopDdd}/>)
                        }
                        <View style={[styles.listViewLeftView, {backgroundColor: randomColor,}]}>
                            <Text style={styles.listViewLeftText}>{note.title.substring(0, 1)}</Text>
                        </View>
                        {
                            this.state.noteEnd == rowId ? (
                                <View style={styles.lineTopTrans}/>) : (
                                <View style={styles.lineTopDdd}/>)
                        }
                    </View>
                    <View style={styles.listViewItem}>
                        <Text style={styles.noteTitle}>{note.title}</Text>
                        <Text numberOfLines={3} style={styles.noteContent}>{note.content}</Text>
                        <Text style={[styles.noteDate, {color:randomColor}]}>{new Date(note.updatedAt).toLocaleTimeString()}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    _goBack = () => {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    };
    /*
     * 刷新
     * */
    onRefresh(PullRefresh) {
        let _this = this;
        let username = this.state.username;
        let where = {
            "author": username
        };
        let url = Global.NOTES + JsonUtil.jsonToStr(where) + '&order=updatedAt';
        NetUtil.get(url, function (response) {
            console.log(response);
            _this.setState({
                dataSource: _this.state.dataSource.cloneWithRows(response.results),
                load: true,
                noteEnd: parseInt(response.results.length) - 1
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
        let url = Global.NOTES + JsonUtil.jsonToStr(params) + '&order=updatedAt';
        NetUtil.get(url, function (response) {
            _this.setState({
                dataSource: _this.state.dataSource.cloneWithRows(response.results),
                load: true,
                noteEnd: parseInt(response.results.length) - 1
            });
        });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    listView: {
        margin: 0,
        padding: 0
    },
    listViewContainer: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        marginLeft: 10
    },
    listViewLeft: {
        alignSelf: 'center',
        width: 60,
        alignItems: 'center'
    },
    listViewLeftView: {
        height: 35,
        width: 35,
        borderRadius: 20,
        padding: 5,
        justifyContent: 'center'
    },
    listViewLeftText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 20
    },
    lineTopTrans: {
        width: 1,
        backgroundColor: 'transparent',
        height: 40
    },
    lineTopDdd: {
        width: 1,
        backgroundColor: '#dddddd',
        height: 40
    },
    listViewItem: {
        width: Dimensions.get('window').width - 130,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 10,
        paddingLeft: 10
    },
    noteDate: {
        fontSize: 12,
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
        height: 48,
        lineHeight: 16
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

export default MyNote;