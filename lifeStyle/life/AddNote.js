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
        }
    }

    componentDidMount() {
        this.setState({
            title: '新增笔记',
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
            </View>
        )
    }

    _goBack = () => {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
});

export default AddNote;