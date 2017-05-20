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

class AddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            subTitle: '',
            noteTitle: '',
            noteContent: '',
            height: 30,
            animationType: 'slide',
            modalVisible: false,
            transparent: false,
        }
    }

    componentDidMount() {
        this.setState({
            title: '新增笔记',
            subTitle: '完成'
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
                        backState={'true'}
                        onPress={() => this._goBack()}
                        onPressRight={() => this._completeNote()}/>
                    <TouchableOpacity onPress={() => this._hideNoteModal()}>
                        <Text style={{fontSize:20}}>{'关闭modal'}</Text>
                    </TouchableOpacity>
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
                        <Text style={styles.noteType}>{'我的第一个笔记本'}</Text>
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
        let noteTitle = this.state.noteTitle;
        let noteContent = this.state.noteContent;
        if (Util.isEmpty(noteTitle)) {
            Util.showToast('请输入笔记标题');
            return;
        }
        if (Util.isEmpty(noteContent)) {
            Util.showToast('请输入笔记内容');
            return;
        }
        if (navigator) {
            navigator.pop();
        }
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