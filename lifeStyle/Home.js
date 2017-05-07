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
    Navigator,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import StorageUtil from './utils/StorageUtil';
import NetUtil from './utils/NetUtil'
import Header from './component/Header';
import MovieDetail from './home/MovieDetail';

class Home extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            username: 'ibinbin',
            movieId: '',
            title: '豆瓣电影Top250',
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
                    renderRow={this.renderMovie.bind(this)}
                    style={styles.listView}/>
            </View>
        )
    }

    renderMovie(movie) {
        return (
            <TouchableOpacity onPress={() => this.goMovieDetail(movie)}>
                <View style={styles.movieItem}>
                    <View>
                        <Image source={{uri: movie.images.medium}} style={styles.movieImg}></Image>
                    </View>
                    <View style={styles.movieItemRight}>
                        <Text style={styles.movieTitle}
                              numberOfLines={1}>{movie.title} &nbsp;&nbsp;{movie.original_title}</Text>
                        <Text style={styles.movieSummary}
                              numberOfLines={1}>{'导演：'} {this.getMovieCasts(1, movie.directors)}</Text>
                        <Text style={styles.movieSummary}
                              numberOfLines={1}>{'主演：'} {this.getMovieCasts(1, movie.casts)}</Text>
                        <Text style={styles.movieSummary}
                              numberOfLines={1}>{'类型：'} {this.getMovieCasts(2, movie.genres)}</Text>
                        <Text style={styles.movieSummary} numberOfLines={1}>{'年份：' + movie.year}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    /*
     * 获取列表数据
     * */
    getMovieData() {
        fetch(NetUtil.DouB_Api + NetUtil.movie_Top250)
            .then((response) => (response.json()))
            .then((responseData) => {
                this.setState({
                    title: responseData.title,
                    movieId: responseData.id,
                    dataSource: this.state.dataSource.cloneWithRows(responseData.subjects),
                    loaded: true
                })
            })
            .done();
    }
    /*
     * 数据之间添加 '/'
     * */
    getMovieCasts = (type, casts) => {
        let castsName = '';
        if (type === 1) {
            for (var i in casts) {
                castsName = castsName + casts[i].name + '/';
            }
        } else if (type === 2) {
            for (var i in casts) {
                castsName = castsName + casts[i] + '/';
            }
        }
        return castsName.substring(0, castsName.length - 1);
    };
    /*
     * 跳转到详情页
     * */
    goMovieDetail = (movie) => {
        this.props.navigator.push({
            name: 'MovieDetail',
            component: MovieDetail,
            params: {
                id: movie.id,
                title: movie.title
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    listView: {
        margin: 0,
        padding: 0
    },
    movieItem: {
        marginTop: 10,
        marginRight: 8,
        marginBottom: 0,
        marginLeft: 8,
        padding: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 5,
    },
    movieItemRight: {
        flexDirection: 'column',
        alignSelf: 'center'
    },
    movieImg: {
        height: 120,
        width: 90,
        marginRight: 6
    },
    movieTitle: {
        marginLeft: 4,
        marginTop: 4,
        marginBottom: 4,
        fontSize: 16,
        color: '#333',
        width: Dimensions.get('window').width - 136,
    },
    movieSummary: {
        marginLeft: 4,
        marginTop: 4,
        marginBottom: 4,
        fontSize: 14,
        color: '#666',
        width: Dimensions.get('window').width - 136,
    }
});

export default Home;