/**
 * Created by Cral-Gates on 2017/5/2.
 */
'use strict';
import React, {Component} from 'react';

class NetUtil extends Component {

    static DouB_Api = 'https://api.douban.com/v2/';
    static movie_Top250 = 'movie/top250?';
    static movieDetail = 'movie/subject/1292052';
    /**
     * post请求
     * url : 请求地址
     * data : 参数(Json对象)
     * callback : 回调函数
     * */
    static postJson(url, data, callback) {
        var fetchOption = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-LC-Id':'M401fErHUPYhDKmgp0wjqVRX-gzGzoHsz',
                'X-LC-Key':'Jqnvt1Lmt34vQh1JDRUpRAqq'
            },
            body: JSON.stringify(data)
        };

        fetch(url, fetchOption)
            .then((response) => response.text())
            .then((responseText) => {
                callback(JSON.parse(responseText))
            })
            .done();
    }

    /**
     * get请求
     *url : 请求地址
     *callback : 回调函数
     */
    static get(url, callback) {
        var fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-LC-Id':'M401fErHUPYhDKmgp0wjqVRX-gzGzoHsz',
                'X-LC-Key':'Jqnvt1Lmt34vQh1JDRUpRAqq'
            }
        };
        fetch(url, fetchOptions)
            .then((response) => response.text())
            .then((responseText) => {
                callback(JSON.parse(responseText));
            }).done();
    }
}

export default NetUtil;