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

class NoteDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            noteDetail: '',
            noteTitle: '',
            noteContent: '',
            height: 100
        }
    }

    componentDidMount() {
        this.setState({
            title: '',
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
                    onPress={() => this._goBack()}/>
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
                    onChange={this.onChange.bind(this)}
                    onContentSizeChange={this.onContentSizeChange}/>
            </View>
        )
    }

    _goBack = () => {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    };

    onChange(event){
        this.setState({
            height: event.nativeEvent.contentSize.height
        });
    };

    onContentSizeChange(params) {
        // console.log(params)
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
    },
    noteDetailContent: {
        backgroundColor: '#ffde00',
        marginLeft: 20,
        marginRight: 20,
        lineHeight: 20,
    }
});

export default NoteDetail;