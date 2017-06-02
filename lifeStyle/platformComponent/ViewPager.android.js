/**
 * Created by Cral-Gates on 2017/6/1.
 */
'use strict';
import React, {Component} from 'react';
import {
    Switch
} from 'react-native';

class LongLine extends Component {

    render() {
        return (
            <Switch style={styles.container}></Switch>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        height: 1,
        backgroundColor: '#f5f5f5',
    }
});

export default LongLine;