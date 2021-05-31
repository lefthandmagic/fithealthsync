import React from 'react';
import {  ImageBackground, 
    StyleSheet, 
} from 'react-native';

import FitbitConnect from '../components/fitbit';
function FitHealthHome(props) {

    return (
        <ImageBackground
        style = {styles.background}
        blurRadius={4}
        source={require("../assets/fitback-background.jpeg")}>
        <FitbitConnect />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex:1,
        alignItems: "center"
    }
})

export default FitHealthHome;