/**
 * Created by Cral-Gates on 2017/5/11.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';
import Header from '../component/Header';
import NetUtil from '../utils/NetUtil';
import Global from '../utils/Global';

class NoteDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            noteDetail: '',
            noteTitle: '',
            noteContent: '',
            height: 50,
            subTitle: ''
        }
    }

    componentDidMount() {
        this.setState({
            title: '笔记详情',
            subTitle: '完成',
            noteDetail: this.props.noteDetail,
            noteTitle: this.props.noteDetail.title,
            noteContent: this.props.noteDetail.content,
        });
    }

    render() {
        console.log(this.state.minHeight);
        return (
            <View>
                <Header
                    title={this.state.title}
                    backState={'true'}
                    onPress={() => this._goBack()}
                    subTitle={this.state.subTitle}
                    onPressRight={() => this._updateNote()}/>
                <TextInput
                    style={styles.noteDetailTitle}
                    numberOfLines={1}
                    secureTextEntry={false}
                    underlineColorAndroid={'transparent'}
                    value={this.state.noteTitle}
                    onChangeText={(noteTitle) => this.setState({noteTitle})}/>
                <TextInput
                    style={[styles.noteDetailContent, {height: this.state.height}]}
                    multiline={true}
                    secureTextEntry={false}
                    underlineColorAndroid={'transparent'}
                    value={this.state.noteContent}
                    onChangeText={(noteContent) => this.setState({noteContent})}
                    onChange={() => this.onChange.bind(this)}
                    onContentSizeChange={(event) => this.onContentSizeChange(event)}/>
            </View>
        )
    }

    _goBack = () => {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    };

    _updateNote = () => {
        let _this = this;
        const {navigator} = this.props;
        let url = Global.NoteUpdate + _this.state.noteDetail.objectId;
        let params = {
            "title":_this.state.noteTitle,
            "content":_this.state.noteContent
        };
        console.log(url);
        console.log(params);
        NetUtil.putJson(url, params, function (res) {
            console.log(res);
            if (res.hasOwnProperty('objectId')){
                if (navigator) {
                    navigator.pop();
                }
            }
        });
    };

    onChange = (event) => {
        this.setState({
            noteContent: event.nativeEvent.text,
            height: event.nativeEvent.contentSize.height
        });
    };

    onContentSizeChange = (event) => {
        this.setState({
            height: event.nativeEvent.contentSize.height
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    noteDetailTitle: {
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        height: 35,
        fontSize: 18,
        fontWeight: '600'
    },
    noteDetailContent: {
        backgroundColor: 'white',
        marginLeft: 20,
        marginRight: 20,
        lineHeight: 20,
        fontSize: 16
    }
});

export default NoteDetail;