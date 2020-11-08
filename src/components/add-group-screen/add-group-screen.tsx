import React from "react";
import {View, Text, StyleSheet} from "react-native";

const AddGroupScreen = () => {
    return (
        <View style={addGroupScreenStyle.container}>
            <Text style={addGroupScreenStyle.text}>
            AddGroupScreen
            </Text>
        </View>
    );
};

const addGroupScreenStyle = StyleSheet.create({
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

export {AddGroupScreen};
