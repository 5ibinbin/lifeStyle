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
        onPress: PropTypes.func
    };

    static defaultProps = {
        title: '标题',
        backState: 'true'
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
                                <View>
                                    <Text>{'返回'}</Text>
                                </View>
                            </View>

                        </TouchableOpacity>) : <View style={{width: 70}}/>
                }

                <View style={styles.header_text}>
                    <Text style={styles.textStyle}>{this.props.title}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 44,
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
        width: 40
    },
    header_img: {
        flexDirection: 'row',
        height: 20,
        width: 20
    },
    header_text: {
        flex: 1,
        alignSelf: 'center',
        marginRight: 60,
        backgroundColor: 'transparent',
    },
    textStyle: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center'
    }
});

export default Header;