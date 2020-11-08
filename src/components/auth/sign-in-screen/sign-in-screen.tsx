import React, {useState, useEffect} from "react";
import {Text, View, StyleSheet} from "react-native";
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {IUnauthNavParamList} from "../../../types/unauth-navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import {RButton} from "../../rbutton";
import {Service} from "../../../service/service";
import {ILogin} from "../../../model/login";
import {UsernameField} from "../username-field";
import {PasswordField} from "../password-field";
import axios, { CancelTokenSource } from "axios";
import {IErrors} from "../../../model/errors";
import { ICancelContainer } from "../../../framework/transport";
import { BowLog } from "../../../framework/bow-log";
import { IServiceResult } from "../../../service/service-result";
import { ValidationError } from "../../validation-error";

type ISignInScreenNavProps = StackNavigationProp<IUnauthNavParamList, "signInScreen">;

interface ISignInScreenProps {
    navigation: ISignInScreenNavProps;
}

const SignInScreen = (props: ISignInScreenProps) => {
    const myself = "SignInScreen";
    const [username, setUsername] = useState<string>("");    
    const [password, setPassword] = useState<string>("");    
    const [cancelToken, setCancelToken]  = useState<CancelTokenSource|undefined>(undefined);
    const [errors, setErrors] = useState<IErrors>({});

    const handleSignIn = async () => {
         
//await fetch("https://192.168.2.242/api/auth/login")
//await axios.get("https://www.google.com" )
//  return;

        if(!username) {
            setErrors({...errors, username: "Username is required"});
            return;
        }
        if(!password) {
            setErrors({...errors, password: "Password is required"});
            return;
        }
        //auth
        const login: ILogin = {
            username,
            password
        };
        if(cancelToken) {
            cancelToken.cancel();
        }
        const cancelContainer: ICancelContainer = {};
        const promise = Service.auth().login(login, cancelContainer);
        BowLog.logobj(myself, "1: promise=", promise);
        setCancelToken(cancelContainer.cancelControl);
        try {
            const res: IServiceResult = await promise;
            BowLog.logobj(myself, "2: res=", res);
            if(res.result!=="OK") {
                setErrors(res.errors);
                console.log(res.errors)
                return;
            }
            BowLog.log(myself, " login successful - navigate home") ;
            props.navigation.navigate("home");
        } catch(err) {
            setErrors({...errors, username: "An error occured"});
        }                
    };

    useEffect(() => {        
        return () => {
            if(cancelToken) {
                cancelToken.cancel();
            }
        }
    }, []);


    const handleSignUp = () => {
        props.navigation.navigate("signUpScreen");
    };

    let jsxUsernameOK: JSX.Element=null;
    if(username) {
        jsxUsernameOK = (
        <FAIcon
            name="check-circle"
            color="green"
            size={20}
        />);
    }

    const changeUsername = (t: string) => {
        setUsername(t);
        setErrors({});
    };

    const changePassword = (t: string) => {
        setPassword(t);
        setErrors({});
    };

    const usernameError = errors.username;
    const passwordError = errors.password;

    return (
        <View style={signInScreenStyle.container}>
            <View style={signInScreenStyle.header}>
                <Text style={signInScreenStyle.headerText}>
                    Welcome!
                </Text>
            </View>
            <View style={signInScreenStyle.footer}>                
                <UsernameField 
                    value={username}
                    onChange = {(t: string) => changeUsername(t)}
                    err={usernameError}
                />
                <PasswordField 
                    value={password}
                    onChange = {(t: string) => changePassword(t)} 
                    err={passwordError}
                />
                <ValidationError err={errors.error} />
                <RButton 
                    title="Sign In"
                    buttonType="big"
                    onPress = {() => handleSignIn()}
                />
                <RButton 
                    title="Sign Up"
                    buttonType="bigflat"
                    onPress = {() => handleSignUp()}
                />
            </View>
        </View>
    );
};

const signInScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#009387",
    },
    header: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    headerText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    },
    input: {
        flex: 1,
        marginLeft: 10,
    },
    footer: {
        flex: 3,
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    signUpButton: {
        alignItems: "center",
        marginTop: 50,
    },
    action: {
        flexDirection: "row", 
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
        paddingBottom: 5
    },

});

export {SignInScreen};
