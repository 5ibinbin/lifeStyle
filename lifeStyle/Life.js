/**
 * Created by Cral-Gates on 2017/4/27.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableOpacity
} from 'react-native';
import Header from "./component/Header";
import Global from "./utils/Global";
import NetUtil from "./utils/NetUtil";
import JsonUtil from "./utils/JsonUtil";
import StorageUtil from "./utils/StorageUtil";
import Util from './utils/StorageUtil';
import Search from './component/Search';

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
            searchContent:''
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
                <ListView
                    style={styles.listView}
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
            <TouchableOpacity>
                <View>
                    <Text>{note.title}</Text>
                    <Text>{note.content}</Text>
                    <Text>{note.createdAt}</Text>
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
        console.log('78' + url);
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
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    listView: {}
});

export default Life;