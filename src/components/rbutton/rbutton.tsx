import React from "react";
import {View, Text, StyleSheet} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {LinearGradient} from "expo-linear-gradient";

interface IRButtonProps {
    title?: string;
    color1?: string;
    color2?: string;
    onPress: () => void;
    disabled?: boolean;
    children?: JSX.Element[];
    buttonType?: "big"|"rounded"|"bigflat";
}

const RButton = (props: IRButtonProps) => {
    const handlePress = () => {
        if(!props.disabled) {
            props.onPress();
        }
    };
    let colors: string[] = [];
    if(props.buttonType==="bigflat") {
        colors=["white","white"];
    } else {
        let color1=props.color1 || "#08d4c4";
        let color2=props.color2 || "#01ab9d";
        colors=[color1, color2];    
    }    

    let style;
    if(props.buttonType==="big") {
        style=bigButtonStyle;
    } else if(props.buttonType==="bigflat") {
        style=bigflatButtonStyle;
    } else {
        style=roundedCornerButtonStyle;
    }

    const children = props.children || (
        <Text style={style.text}>
            {props.title}
        </Text>
    );

    return (
        <View style={style.container}>
            <TouchableOpacity
                onPress = {() => handlePress()}
            >
                <LinearGradient
                    colors={colors}
                    style={style.lg}
                >
                    {children}                    
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};


const roundedCornerButtonStyle = StyleSheet.create({
    container: {
        alignItems: "flex-end",
        marginTop: 30,
    },
    lg: {
        width: 150,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        flexDirection: "row",
    },
    text: {
        color: "white",
    }
});


const bigButtonStyle = StyleSheet.create({
    container: {
        alignItems: "center",
        marginTop: 30,
        justifyContent: "center",
    },
    lg: {
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "yellow",        
    },
    text: {
        width: "100%",
        textAlign: "center",
        color: "white",
    }
});


const bigflatButtonStyle = StyleSheet.create({
    container: {
        alignItems: "center",
        marginTop: 30,
        justifyContent: "center",
        borderWidth: 1
    },
    lg: {
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "yellow",        
    },
    text: {
        width: "100%",
        textAlign: "center",
        color: "black",
    }
});
 
 
export {RButton};

 