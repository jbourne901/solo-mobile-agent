import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator, StackNavigationOptions} from "@react-navigation/stack";
import {IAuthNavParamList} from "../../types/auth-navigation";
import { GroupScreen } from "../group-screen";
import { AddGroupScreen } from "../add-group-screen";
import { ChatScreen } from "../chat-screen";
import { Dashboard } from "../dashboard";
import { MainMenu } from "../main-menu";


const Stack = createStackNavigator<IAuthNavParamList>();

const groupOpts: StackNavigationOptions = {
    title: "Groups",    
};

const addGroupOpts: StackNavigationOptions = {
    title: "Add Group"
};

const chatOpts: StackNavigationOptions = {
    title: "Chats"
};


const dashboardOpts: StackNavigationOptions = {
    title: "Dashboard",
    //headerLeft: null,
    headerStyle: {backgroundColor: "#444"},
    headerTitleStyle: {color: "white"},
    headerTitleAlign: "center"
};

const Home = () => {
    
    return (
        <Stack.Navigator 
            initialRouteName="mainMenu"
        >
            <Stack.Screen 
                name="mainMenu"
                component={MainMenu}
                options={groupOpts}
            />
        </Stack.Navigator>
    );
};
 
 

export {Home};
