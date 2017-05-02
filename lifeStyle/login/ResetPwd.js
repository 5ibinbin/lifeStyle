/**
 * Created by Cral-Gates on 2017/4/28.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

class ResetPwd extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>
                    重置密码
                </Text>
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

export default ResetPwd;