import React  from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator, StackNavigationOptions} from "@react-navigation/stack";
import { SignInScreen } from "../auth/sign-in-screen";
import { SignUpScreen } from "../auth/sign-up-screen";
import { Splash } from "../splash";
import {IUnauthNavParamList} from "../../types/unauth-navigation";
import {Home} from "../home";
import {isReactNative} from "../../framework/is-react-native";

console.log(`----- ${isReactNative()}`)

const Stack = createStackNavigator<IUnauthNavParamList>();


const splashOpts: StackNavigationOptions = {
    title: "Splash",
    headerShown: false
};

const signInOpts: StackNavigationOptions = {
    title: "Sign In",
    headerStyle: {backgroundColor: "#444"},
    headerTitleStyle: {fontSize: 20, fontWeight: "bold"},
    headerTintColor: "white",
    headerTitleAlign: "center",
    //headerLeft: null
};

const signUpOpts: StackNavigationOptions = {
    title: "Sign Up",
    headerStyle: {backgroundColor: "#444"},
    headerTitleStyle: {fontSize: 20, fontWeight: "bold"},
    headerTintColor: "white",
    headerTitleAlign: "center"
};


const homeOpts: StackNavigationOptions = {
    title: "Home",
    headerShown: false,
};

const Main = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="splash"
            >
                <Stack.Screen 
                    name="splash"
                    component={Splash}
                    options={splashOpts}
                />
                <Stack.Screen 
                    name="signInScreen"
                    component={SignInScreen}
                    options={signInOpts}
                />
                <Stack.Screen 
                    name="signUpScreen"
                    component={SignUpScreen}
                    options={signUpOpts}
                />
                <Stack.Screen 
                    name="home"
                    component={Home}
                    options={homeOpts}
                />
                
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export {Main};
