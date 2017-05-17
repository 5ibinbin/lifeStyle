/**
 * Created by Cral-Gates on 2017/5/2.
 */
'use strict';
import React, {Component} from 'react';

var API_ADDRESS = 'https://leancloud.cn:443/1.1';
var GLOBAL = {
    HOST: API_ADDRESS,
    LOGIN: API_ADDRESS + '/login?',
    REGISTER: API_ADDRESS + '/users',
    NOTES:API_ADDRESS + '/classes/note?where=',
    NoteUpdate: API_ADDRESS + '/classes/note/'
};
export default GLOBAL;