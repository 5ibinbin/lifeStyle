/**
 * Created by Cral-Gates on 2017/5/7.
 */
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import NavigationBar from '../component/NavigationBar';
import NetUtil from '../utils/NetUtil';
import Util from '../utils/Util';

class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            image: '',
            content: '',
            avatar: [],
            director: []
        }
    }

    componentDidMount() {
        this.setState({
            id: this.props.id,
            title: this.props.title
        });
        this.getMovieDetail();
    }

    render() {
        let movieContent = this.state.content;
        let movieImage = this.state.image;
        let original_title = movieContent.original_title;
        let movie_title = movieContent.title;
        if (movie_title === original_title) {
            movie_title = '';
        }
        let _this = this;

        var images = [];
        var director = [];
        if (!Util.isEmpty(this.state.avatar) && !Util.isEmpty(this.state.director)) {
            for (var i = 0; i < this.state.avatar.length; i++) {
                images.push(
                    <View key={this.state.avatar[i].avatars.medium} style={styles.movie_detail_view}>
                        <Image style={styles.movie_detail_view_img}
                               source={{uri: this.state.avatar[i].avatars.medium}}></Image>
                    </View>
                )
            }
            for (var i = 0; i < this.state.director.length; i++) {
                director.push(
                    <View key={this.state.director[i].avatars.medium} style={styles.movie_detail_view}>
                        <Image style={styles.movie_detail_view_img}
                               source={{uri: this.state.director[i].avatars.medium}}></Image>
                    </View>
                )
            }
        }

        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.state.title}
                    showLeftState={true}
                    onPress={() => this._goBack()}/>
                <ScrollView>
                    <View style={[styles.movie_Detail_Bg, {justifyContent: 'center'}]}>
                        <Text style={styles.movie_fontSize}>{movie_title} {original_title}</Text>
                    </View>
                    <View style={styles.movie_Detail_Bg}>
                        <View>
                            <Image source={{uri: movieImage.medium }} style={styles.movie_Detail_Img}></Image>
                        </View>
                        <View style={styles.movie_detail_col}>
                            <Text
                                style={styles.movieSummary}>{'导演：'}{this.getMovieCasts(1, movieContent.directors)}</Text>
                            <Text style={styles.movieSummary}>{'主演：'}{this.getMovieCasts(1, movieContent.casts)}</Text>
                            <Text style={styles.movieSummary}>{'类型：'}{this.getMovieCasts(2, movieContent.genres)}</Text>
                            <Text
                                style={styles.movieSummary}>{'制片国家/地区：'}{this.getMovieCasts(2, movieContent.countries)}</Text>
                            <Text style={styles.movieSummary}>{'又名：'}{this.getMovieCasts(2, movieContent.aka)}</Text>
                            <Text style={styles.movieSummary}>{'年份：' + movieContent.year}</Text>
                        </View>
                    </View>

                    <View style={[styles.movie_Detail_Bg, {flexDirection: 'column'}]}>
                        <View style={styles.movie_Detail_row}>
                            <Text style={styles.movie_fontSize_14}>{this.state.title + '剧情简介'}</Text>
                        </View>
                        <View style={styles.movie_Detail_row}>
                            <Text style={styles.movie_Detail_Intro}>&nbsp;&nbsp;{movieContent.summary}</Text>
                        </View>
                    </View>


                    <View style={[styles.movie_Detail_Bg, {flexDirection: 'column'}]}>
                        <Text style={styles.movie_fontSize}>{'主演'}</Text>
                        <View style={styles.movie_detail_view_item}>
                            {images}
                        </View>
                    </View>

                    <View style={[styles.movie_Detail_Bg, {flexDirection: 'column'}]}>
                        <Text style={styles.movie_fontSize}>{'导演'}</Text>
                        <View style={styles.movie_detail_view_item}>
                            {director}
                        </View>
                    </View>
                </ScrollView>

            </View>
        )
    }

    _goBack = () => {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    };

    getMovieDetail() {
        let id = this.props.id;
        fetch(NetUtil.movieDetail + id)
            .then((response) => (response.json()))
            .then((responseData) => {
                console.log(responseData.images);
                this.setState({
                    content: responseData,
                    image: responseData.images,
                    avatar: responseData.casts,
                    director: responseData.directors
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    movie_Detail_row: {
        flexDirection: 'row'
    },
    movie_detail_col: {
        flexDirection: 'column'
    },
    movie_Detail_Bg: {
        flexDirection: 'row',
        marginTop: 8,
        marginLeft: 8,
        marginRight: 8,
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 4,
    },
    movie_Detail_Img: {
        height: 120,
        width: 90,
        marginRight: 6,
        marginLeft: 6,
        marginTop: 6
    },
    movie_fontSize: {
        fontSize: 16,
        color: '#333',
    },
    movie_fontSize_14: {
        fontSize: 14,
        color: '#333',
        margin: 4
    },
    movie_Detail_Intro: {
        fontSize: 14,
        color: '#666',
        marginLeft: 12,
        marginRight: 12,
        marginTop: 4,
        lineHeight: 20
    },
    movieSummary: {
        marginLeft: 4,
        marginTop: 4,
        marginBottom: 4,
        fontSize: 14,
        color: '#666',
        flexWrap: 'nowrap',
        width: Dimensions.get('window').width - 136,
    },
    movie_detail_view_item: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        // alignItems: 'center',
        flex: 1
    },
    movie_detail_view: {
        flexDirection: 'column',
        // alignSelf: 'center',
        // alignItems: 'center',
        // flex:1
    },
    movie_detail_view_img: {
        height: 120,
        width: 90,
        margin: 2
    }
});
export default MovieDetail;