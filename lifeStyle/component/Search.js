/**
 * Created by Cral-Gates on 2017/5/1.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Image,
    TextInput
} from 'react-native';

class Search extends Component {
    static propTypes = {
        txtValue: PropTypes.string,
        isPassword: React.PropTypes.bool,
        txtHide: React.PropTypes.string,
        onPress: React.PropTypes.func
    };

    static defaultProps = {
        textValue: '',
        txtHide: '请输入搜索内容',
        isPassword: false,
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <Image style={styles.image} source={require('../img/life-search.png')}></Image>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        style={styles.textInput}
                        multiline={false}
                        placeholder={this.props.txtValue}
                        password={this.props.txtHide}
                        onChangeText={(text) => {
                            this.setState({
                                txtValue: text
                            })
                        }}
                        value={this.props.txtValue}/>
                    <TouchableOpacity onPress={this.props.onPress}>
                        <Text style={styles.textFunc}>{'搜索'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#f5f5f5'
    },
    innerContainer: {
        height: 50,
        // flex: 1,
        borderWidth: 1,
        borderColor: '#51A7F9',
        marginLeft: 50,
        marginRight: 50,
        borderRadius: 25,
        flexDirection: 'row',
        backgroundColor:'white'
    },
    image: {
        height: 20,
        width: 20
    },
    textInput: {
        height: 50,
        width: 200
    },
    textFunc: {
        fontSize: 16,
        color: '#FFDE00'
    }
});
export default Search;