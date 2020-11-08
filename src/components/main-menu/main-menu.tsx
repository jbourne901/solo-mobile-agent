import React from "react";
import { View, Text, StyleSheet,  StatusBar } from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {IAuthNavParamList} from "../../types/auth-navigation";


type IMainMenuNavProps = StackNavigationProp<IAuthNavParamList, "mainMenu">;

interface IMainMenuProps {
    navigation: IMainMenuNavProps;
}

 
const MainMenu = (props: IMainMenuProps) => {

    return (
            <View style={mainMenuStyle.container}>
                <Text>Main menu</Text>
                <StatusBar backgroundColor='#009387' barStyle="light-content"/>
            </View>            
        
    );
};
  

const mainMenuStyle = StyleSheet.create({
     
    container: {
        flex: 1,
        backgroundColor: "#009387", 
    },
     
     
});

export {MainMenu};
