import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

 
const Loading = () => {
    return (
        <View style={loadingStyle.container}>
            <ActivityIndicator size="large" />
        </View>
    );
};

const loadingStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"    
    }
});
 
export {Loading};
