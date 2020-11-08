import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, StatusBar } from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import {IUnauthNavParamList} from "../../types/unauth-navigation";
import {RButton} from "../rbutton";
const logoPng = require("../../assets/images/logo.png");


type ISplashScreenNavProps = StackNavigationProp<IUnauthNavParamList, "signInScreen">;

interface ISplashProps {
    navigation: ISplashScreenNavProps;
}

 
const Splash = (props: ISplashProps) => {
    const handleSignIn = () => {
        console.log("handleSignIn")
       props.navigation.navigate("signInScreen");
    };

    const lgColors = [ "#08d4c4", "#01ab9d" ];    
    const miColors="white";

    return (
            <View style={splashStyle.container}>
                <View style={splashStyle.header}>
                    <Image 
                        source={logoPng}
                        style={splashStyle.logo}
                        
                    />
                </View>
                <View style={splashStyle.footer}>
                    <Text style={splashStyle.mottoText}>
                        Stay connected with everyone
                    </Text>
                    <Text style={splashStyle.signInText}>
                        Sign In with Account
                    </Text>
                    <RButton
                        onPress={() => handleSignIn()}
                    >
                        <Text style={splashStyle.getStartedText}>
                            Get Started
                        </Text>
                        <MaterialIcons 
                            name="navigate-next"
                            color={miColors}
                            size={20}
                        />
                    </RButton>
                </View>
                <StatusBar backgroundColor='#009387' barStyle="light-content"/>
            </View>            
        
    );
};
 
 
const {width: screenWidth} = Dimensions.get("screen");
const logoSize = screenWidth * 0.28;

const splashStyle = StyleSheet.create({
    topContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center", 
        marginTop: 24,
        marginBottom: 20,
        backgroundColor: "#009387", 
    },
    container: {
        flex: 1,
        backgroundColor: "#009387", 
    },
    header: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center", 
    },
    logo: {
        height: logoSize,
        width: logoSize,
    },
    footer: {
        backgroundColor: "white",
        borderRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    mottoText: {
        color: "#05375a",
        fontSize: 30,
        fontWeight: "bold"
    },
    signInText: {
        color: "black",
        fontWeight: "bold",
    },
    getStartedText : {
        color: "white",
    },
     
});

export {Splash};
