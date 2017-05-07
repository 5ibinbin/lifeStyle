/**
 * Created by Cral-Gates on 2017/5/7.
 */
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Header from '../component/Header';
import NetUtil from '../utils/NetUtil';

class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            content: ''
        }
    }

    componentDidMount() {
        this.setState({
            id: this.props.id,
            title: this.props.title
        });
        this.getMovieDetail();
    }

    render() {
        return (
            <View style={styles.container}>
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

    getMovieDetail() {
        fetch(NetUtil.DouB_Api + NetUtil.movieDetail)
            .then((response) => (response.json()))
            .then((responseData) => {
                console.log(responseData);
                this.setState({
                    content: responseData
                })
            })
            .done();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    }
});
export default MovieDetail;