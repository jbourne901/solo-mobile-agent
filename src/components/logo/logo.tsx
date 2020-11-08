import React  from "react";
import {View, StyleSheet, Text} from "react-native";
 

const Logo = () => {
    return (
        <View style={logoStyle.container}>
            <Text style={logoStyle.text}>S</Text>
        </View>
    );
};

const logoStyle = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: 120,
        height: 120,
        borderRadius: 40,
        backgroundColor: "gray"
    },
    text: {
        fontSize: 70,
        fontWeight: "bold",
        color: "white"
    }
});

export {Logo};
