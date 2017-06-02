/**
 * Created by Cral-Gates on 2017/4/27.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Switch,
    Dimensions,
    Image,
    WebView
} from 'react-native';
import Header from './component/Header';
import ViewPager from 'react-native-viewpager';

const BANNER_IMG = [require('./img/bannerOne.png'),
    require('./img/bannerTwo.png'),
    require('./img/bannerThr.png'),
    require('./img/bannerFour.png'),];
class Activity extends Component {
    constructor(props) {
        super(props);
        var dataSource = new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2});
        this.state = {
            title: '活动',
            switchIsOn: false,
            viewPagerDataSource: dataSource.cloneWithPages(BANNER_IMG),
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={this.state.title}
                    backState={'false'}/>
                <View style={styles.viewPagerStyle}>
                    <ViewPager
                        dataSource={this.state.viewPagerDataSource}
                        renderPage={this._renderPage}
                        isLoop={true}
                        autoPlay={true}/>
                </View>
                <View style={styles.switchStyle}>
                    <Switch
                        onValueChange={(value) => this._onValueChange(value)}
                        value={this.state.switchIsOn}/>
                </View>
            </View>
        )
    }

    _renderPage(data, pageID) {
        console.log(pageID);
        return (
            <Image
                source={data}
                style={styles.page}/>
        );
    }

    _onValueChange = (value) => {
        this.setState({
            switchIsOn: value
        })
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1,
    },
    switchStyle: {
        height: 40,
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 10
    },
    viewPagerStyle: {
        height: 220,
        width: Dimensions.get('window').width,
        flexDirection: 'row'
    },
    page: {
        height: 220,
        width: Dimensions.get('window').width,
    },
});

export default Activity;