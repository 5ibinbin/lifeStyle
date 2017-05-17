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

class AddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            subTitle: ''
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
            <View>
                <Header
                    title={this.state.title}
                    subTitle={this.state.subTitle}
                    backState={'true'}
                    onPress={() => this._goBack()}
                    onPressRight={() => this._completeNote()}/>
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
        if (navigator) {
            navigator.pop();
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
});

export default AddNote;