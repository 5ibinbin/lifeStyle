/**
 * Created by Cral-Gates on 2017/4/27.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import StorageUtil from './utils/StorageUtil';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'ibinbin'
        }
    }

    componentDidMount() {
        // StorageUtil.get('sessionToken').then((username) => {
        //     this.setState({
        //         username:username
        //     })
        // });
        this.setState({
            username: this.props.username
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.username}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    }
});

export default Home;