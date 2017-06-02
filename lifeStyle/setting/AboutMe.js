/**
 * Created by Cral-Gates on 2017/6/2.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    WebView
} from 'react-native';
import Header from '../component/Header';
import ViewPager from 'react-native-viewpager';

class AboutMe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '我的博客',
            url: 'http://www.5ibinbin.com'
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={this.state.title}
                    backState={'true'}
                    onPress={() => this._goBack()}/>
                <View style={styles.webViewStyle}>
                    <WebView
                        source={{uri: this.state.url}}
                        startInLoadingState={true}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}>
                    </WebView>
                </View>
            </View>
        )
    }

    _goBack = () => {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1,
    },
    webViewStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
});

export default AboutMe;