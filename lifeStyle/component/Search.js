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
    Dimensions,
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
                    <View style={styles.imageView}>
                        <Image style={styles.image} source={require('../img/life-search.png')}></Image>
                    </View>
                    <View>
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
                    </View>
                    <View style={styles.textView}>
                        <TouchableOpacity onPress={this.props.onPress}>
                            <Text style={styles.textFunc}>{'搜索'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5'
    },
    innerContainer: {
        height: 40,
        borderWidth: 1,
        borderColor: '#FFDE00',
        marginLeft: 40,
        marginRight: 40,
        marginTop: 5,
        marginBottom:5,
        borderRadius: 20,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    imageView: {
        height: 40,
        width: 40
    },
    image: {
        height: 20,
        width: 20,
        margin: 10,
    },
    textInput: {
        height: 40,
        width: Dimensions.get('window').width - 180
    },
    textView: {
        height: 40,
        width: 60
    },
    textFunc: {
        fontSize: 16,
        color: '#FFDE00',
        margin: 10,
        textAlign: 'left'
    }
});
export default Search;