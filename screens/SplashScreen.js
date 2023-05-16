import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import { StackActions } from '@react-navigation/native';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.dispatch(StackActions.replace('Login'));
        }, 5000);
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ADB3BC' }}>
                <Image source={require('../assets/logo.png')} style={{ width: 200, height: 200 }}/>
            </View>
        );
    }
}

export default Home;