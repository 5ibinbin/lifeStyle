/**
 * Created by Cral-Gates on 2017/5/5.
 */
'use strict';
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

class Header extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        backState: PropTypes.string,
        onPress: PropTypes.func,
        onPressRight: PropTypes.func,
        subTitle: PropTypes.string
    };

    static defaultProps = {
        title: '标题',
        backState: 'true',
        subTitle: ''
    };

    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.backState === 'true' ? (
                        <TouchableOpacity onPress={this.props.onPress}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={styles.header_back} onPress={this.props.onPress}>
                                    <Image onPress={this.props.onPress} style={styles.header_img}
                                           source={require('../img/black-left.png')}></Image>
                                </View>
                                <View style={styles.header_back_text}>
                                    <Text style={{fontSize:16}}>{'返回'}</Text>
                                </View>
                            </View>

                        </TouchableOpacity>) : <View style={{width: 70}}/>
                }
                <View style={styles.header_text}>
                    <Text style={styles.textStyle}>{this.props.title}</Text>
                </View>
                <View style={styles.textRight}>
                    <TouchableOpacity onPress={this.props.onPressRight}>
                        <Text style={{fontSize:16}}>{this.props.subTitle}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 64,
        paddingTop:20,
        backgroundColor: '#FFDE00',
        alignItems: 'center'
    },
    header_back: {
        marginLeft: 10,
        marginRight: 10,
        height: 20,
        width: 10
    },
    header_back_text: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: 44,
    },
    header_img: {
        flexDirection: 'row',
        height: 20,
        width: 20
    },
    header_text: {
        flex: 1,
        alignSelf: 'center',
        backgroundColor: 'transparent',
    },
    textStyle: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center'
    },
    textRight: {
        width: 40,
        marginLeft:10,
        marginRight:10,
        flexDirection: 'row',
        alignSelf: 'center',
    }
});

export default Header;