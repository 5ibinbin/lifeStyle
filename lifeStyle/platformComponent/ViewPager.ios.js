/**
 * Created by Cral-Gates on 2017/6/1.
 */
import React, {Component} from 'react';
import {
    SwitchIOS
} from 'react-native';

class Switch extends Component {

    static propTypes = {
        value: PropTypes.bool
    };

    static defaultProps = {
        value: false
    };

    render() {
        return (
            <SwitchIOS
            onValueChange=></SwitchIOS>
        )
    }

    _onValueChange =(value) =>{

    }
}

const styles = StyleSheet.create({
    container:{
        height: 1,
        width: Dimensions.get('window').width,
        backgroundColor: '#f5f5f5',
    }
});

export default Switch;