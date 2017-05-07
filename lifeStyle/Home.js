/**
 * Created by Cral-Gates on 2017/4/27.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import StorageUtil from './utils/StorageUtil';
import NetUtil from './utils/NetUtil'
import Header from './component/Header';

class Home extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            username: 'ibinbin',
            title: '首页',
            dataSource: ds,
            loaded: false
        }
    }

    componentDidMount() {
        // StorageUtil.get('sessionToken').then((username) => {
        //     this.setState({
        //         username:username
        //     })
        // });
        this.setState({
            username: this.props.username
        });

        this.getMovieData();
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={this.state.title}
                    backState={'false'}/>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderMovie}
                    style={styles.listView}/>
            </View>
        )
    }

    renderMovie(movie) {
        return (
            <TouchableOpacity>
                <View style={styles.movieItem}>
                    <View>
                        <Image source={{uri: movie.images.medium}} style={styles.movieImg}></Image>
                    </View>
                    <View style={styles.movieItemRight}>
                        <Text style={styles.movieTitle} numberOfLines={1}>{movie.title} &nbsp;&nbsp;{movie.original_title}</Text>
                        <Text style={styles.movieSummary} numberOfLines={1}>{'导演：' + movie.directors[0].name}</Text>
                        <Text style={styles.movieSummary} numberOfLines={1}>{'主演：' + movie.casts[0].name}</Text>
                        <Text style={styles.movieSummary} numberOfLines={1}>{'类型：' + movie.genres[0]}</Text>
                        <Text style={styles.movieSummary} numberOfLines={1}>{'年份：' +movie.year}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    getMovieData() {
        fetch(NetUtil.DouB_Api)
            .then((response) => (response.json()))
            .then((responseData) => {
                this.setState({
                    title: responseData.title,
                    dataSource: this.state.dataSource.cloneWithRows(responseData.subjects),
                    loaded: true
                })
            })
            .done();
    }

    getMovieCasts(casts){
        var castsName = '';
        for (let i in casts){
            castsName = casts[i].name + '/';
        }
        return castsName;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    listView: {
        margin:0,
        padding: 0
    },
    movieItem:{
        marginTop: 10,
        marginRight: 8,
        marginBottom: 0,
        marginLeft: 8,
        padding:10,
        flexDirection: 'row',
        backgroundColor:'white',
        borderRadius: 5,
    },
    movieItemRight:{
        flexDirection: 'column',
        alignSelf:'center'
    },
    movieImg: {
        height: 120,
        width: 90,
        marginRight:6
    },
    movieTitle: {
        marginLeft:4,
        marginTop: 4,
        marginBottom:4,
        fontSize: 16,
        color: '#333',
        width: Dimensions.get('window').width - 136,
    },
    movieSummary: {
        marginLeft:4,
        marginTop: 4,
        marginBottom:4,
        fontSize: 14,
        color: '#666',
        width: Dimensions.get('window').width - 136,
    }
});

export default Home;