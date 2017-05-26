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
    TouchableOpacity
} from 'react-native';
import Header from "../component/Header";
import LongLine from "../component/LongLine";
import Global from "../utils/Global";
import NetUtil from "../utils/NetUtil";
import JsonUtil from "../utils/JsonUtil";
import StorageUtil from "../utils/StorageUtil";
import Util from '../utils/StorageUtil';
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
            color:['red', 'blue', 'yellow', 'pink', 'green', 'brown', 'purple']
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

    renderNote(note) {
        let randomColor = this.state.color[Math.round(Math.random()*7)];
        console.log(randomColor);
        return (
            <TouchableOpacity>
                <View style={{width:Dimensions.get('window').width, flexDirection: 'row', marginLeft:10}}>
                    <View style={{alignSelf:'center', width:80, alignItems:'center'}}>
                        <View style={{width:1, backgroundColor:'#dddddd', maxHeight:33}}/>
                        <View style={{height:30, width:30, backgroundColor:'red', borderRadius:15}}/>
                        <View style={{width:1, maxHeight:33, backgroundColor:'#dddddd'}}/>
                    </View>
                    <View style={styles.listViewItem}>
                        <Text style={styles.noteTitle}>{note.title}</Text>
                        <Text style={styles.noteContent}>{note.content}</Text>
                        <Text style={styles.noteDate}>{note.createdAt.substring(0, 10)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
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
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#f5f5f5'
    },
    listView: {
        margin: 0,
        padding: 0
    },
    listViewItem: {
        width: Dimensions.get('window').width-100,
        backgroundColor: 'white',
        borderRadius: 10
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

export default MyNote;