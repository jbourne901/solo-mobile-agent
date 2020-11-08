import React from "react";
import {View, Text, StyleSheet} from "react-native";

const GroupScreen = () => {
    return (
        <View style={groupScreenStyle.container}>
            <Text style={groupScreenStyle.text}>
            GroupScreen
            </Text>
        </View>
    );
};

const groupScreenStyle = StyleSheet.create({
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

export {GroupScreen};
