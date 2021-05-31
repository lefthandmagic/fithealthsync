import React from 'react';
import { Image, 
    ImageBackground, 
    StyleSheet, 
    View, 
    Text,
    TouchableOpacity
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';


function FitHealthHome(props) {

    const syncFitHealth = () => {
        console.log("testing")
    }

    return (
        <ImageBackground
        style = {styles.background}
        blurRadius={4}
        source={require("../assets/fitback-background.jpeg")}>
        <TouchableOpacity style={styles.actionContainer}
            onPress={syncFitHealth}>
            <AntDesign name="pluscircleo" size={50} color="white" />
            <Text style={styles.text}>Connect Fitbit</Text> 
            </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    actionContainer: {
        position: "absolute",
        top: 100,
        alignItems:"center",
    },
    background: {
        flex:1,
        alignItems: "center"
    },
    text: {
        paddingTop: 15,
        color: "white",
        fontSize: 20,
        fontWeight: '500',
    }
})

export default FitHealthHome;