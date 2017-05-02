/**
 * Created by Cral-Gates on 2017/5/2.
 */
'use strict';
import React, {Component} from 'react';

class Util extends Component {
    /*
    * 格式化日期
    * */
    static formatDate(){
        var moment = require('moment');
        return moment.format("YYYY-MM-DD");
    }

    /*
    * 格式化时间
    * */
    static formatTime() {
        var moment = require('moment');
        return moment.format("HH:mm:ss");
    }
}

export default Util;