import React from "react";
import {View, Text, StyleSheet} from "react-native";

const ChatScreen = () => {
    return (
        <View style={chatScreenStyle.container}>
            <Text style={chatScreenStyle.text}>
            ChatScreen
            </Text>
        </View>
    );
};

const chatScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center", 
        backgroundColor: "#ebebeb",
    },
    text: {
        color: "#101010",
        fontSize: 24,
        fontWeight: "bold"
    }
});

export {ChatScreen};
