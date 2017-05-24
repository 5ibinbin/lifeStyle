/**
 * Created by Cral-Gates on 2017/4/27.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import Header from './component/Header';

class Activity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '活动',
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <View>
                <Header
                    title={this.state.title}
                    backState={'false'}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({});

export default Activity;