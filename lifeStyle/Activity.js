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
    NetInfo,
    AppState,
    TouchableOpacity,
} from 'react-native';
import NavigationBar from './component/NavigationBar';
import ViewPager from 'react-native-viewpager';
import ActionSheet from 'react-native-actionsheet-api';

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
            isConnect: false,
            connectionInfo: null,
            currentAppState: AppState.currentState
        }
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener(
            'change',
            this._handleConnectivityChange
        );
        AppState.addEventListener(
            'change',
            this._handleAppStateChange.bind(this)
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.state.title}
                    showLeftState ={false}/>
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
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Text>{this.state.connectionInfo}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Text>{this.state.currentAppState}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={() => this._actionSheet()}>
                        <Text>{'ActionSheet'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _renderPage(data, pageID) {
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

    _handleConnectivityChange = (isConnected) => {
        //检测网络是否连接
        NetInfo.isConnected.fetch().done(
            (isConnected) => {
                this.setState({isConnect: isConnected});
                console.log(this.state.isConnect)
            }
        );
        //检测网络连接信息
        NetInfo.fetch().done(
            (connectionInfo) => {
                this.setState({connectionInfo: connectionInfo});
                console.log(this.state.connectionInfo);
            }
        );
    };

    _handleAppStateChange = (appState) => {
        console.log(appState);
        this.setState({
            currentAppState: appState
        });
    };

    _actionSheet = () => {
        ActionSheet.showActionSheetWithOptions({
                title: '请选择您最喜欢的明星',
                options: ['科比布莱恩特', '勒布朗詹姆斯', '史蒂芬库里', '凯文杜兰特', '都不喜欢'],
                cancelButtonIndex: 4,
                // destructiveButtonIndex: 4,
                tintColor: 'black',
            },
            (buttonIndex) => {
                console.log(buttonIndex);
            }
        );
    };

    _leftItemAction = ()=> {
        console.log('left');
    };

    _rightItemAction = ()=> {
        console.log('right');
    }
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