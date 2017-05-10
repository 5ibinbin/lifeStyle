/**
 * Created by Cral-Gates on 2017/5/2.
 */
'use strict';
import React, {Component} from 'react';
import Toast from 'react-native-root-toast';

class Util extends Component {

    /*
    * 判断字符
    * */
    static isEmpty(v) {
        switch (typeof v) {
            case 'date':
                return true;
            case 'undefined' :
                return true;
            case 'string' :
                if (v.trim().length === 0)
                    return true;
                break;
            case 'boolean' :
                if (!v)
                    return true;
                break;
            case 'number' :
                if (0 === v)
                    return true;
                break;
            case 'object' :
                if (null === v) {
                    return true;
                }
                else if (undefined !== v.length && v.length === 0) {
                    return true;
                }
                else {
                    return false;
                }
                break;
        }
        return false;
    }
    /*
    * toast
    * */
    static showToast(value){
        Toast.show(value, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            onShow: () => {
                // calls on toast\`s appear animation start
            },
            onShown: () => {
                // calls on toast\`s appear animation end.
            },
            onHide: () => {
                // calls on toast\`s hide animation start.
            },
            onHidden: () => {
                // calls on toast\`s hide animation end.
            }
        });
        return false;
    }
}

export default Util;