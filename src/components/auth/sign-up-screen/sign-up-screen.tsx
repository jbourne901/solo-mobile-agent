import React, {useState} from "react";
import {Text, ScrollView, View, StyleSheet} from "react-native";
import {IUnauthNavParamList} from "../../../types/unauth-navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import {RButton} from "../../rbutton";
import {UsernameField} from "../username-field";
import {PasswordField} from "../password-field";
import { CancelTokenSource } from "axios";
import {Service} from "../../../service/service";
import {IErrors} from "../../../model/errors";
import {IRegistration} from "../../../model/login";
import { getCancelToken } from "../../../framework/transport";

type ISignUpScreenNavProps = StackNavigationProp<IUnauthNavParamList, "signUpScreen">;

interface ISignUpScreenProps {
    navigation: ISignUpScreenNavProps;
}

const SignUpScreen = (props: ISignUpScreenProps) => {
    const [username, setUsername] = useState<string>("");    
    const [password, setPassword] = useState<string>("");    
    const [confirmPassword, setConfirmPassword] = useState<string>("");    
    const [cancelToken, setCancelToken] = useState<CancelTokenSource|undefined>(undefined);
    const [errors, setErrors] = useState<IErrors>({});

    const handleSignUp = async () => {
        const [errors, setErrors] = useState<IErrors>({});
        const registration: IRegistration = {
                username,
                password,
                confirmPassword
        };
        if(cancelToken) {
            cancelToken.cancel();
        }
        const promise = Service.auth().register(registration);
        setCancelToken(getCancelToken(promise));
        try {
            const res = await promise;
            if(res.errors) {
                setErrors(res.errors);
                return;
            }
            if(res.result!=="OK") {
                setErrors({...errors, username: "An error occured"});
                return;
            }
            props.navigation.navigate("signInScreen");
        } catch(err) {
            setErrors({...errors, username: "An error occured"});
        }                
    };
        
    const usernameError = errors.username;
    const passwordError = errors.password;
    const confirmPasswordError = errors.confirmPassword;
    return (
        <View style={signUpScreenStyle.container}>
            <View style={signUpScreenStyle.header}>
                <Text style={signUpScreenStyle.headerText}>
                    Register Now!
                </Text>
            </View>
            <ScrollView style={signUpScreenStyle.footer}>
                <UsernameField 
                    value={username}
                    onChange = {(t: string) => setUsername(t)}
                    err = {usernameError}
                />
                <PasswordField 
                    value={password}
                    onChange = {(t: string) => setPassword(t)} 
                    err = {passwordError}
                />
                <PasswordField 
                    value={confirmPassword}
                    onChange = {(t: string) => setConfirmPassword(t)} 
                    title="Confirm password"
                    err = {confirmPasswordError}
                />
                <RButton 
                    title="Sign Up"
                    buttonType="big"
                    onPress = {() => handleSignUp()}
                />
            </ScrollView>
        </View>
    );
};

const signUpScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#009387",
    },
    header: {
        flex: 2,
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingBottom: 50,
        marginTop: 30,
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
        flex: 0,
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

export {SignUpScreen};
