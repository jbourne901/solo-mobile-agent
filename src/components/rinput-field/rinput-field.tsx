import React, {useState} from "react";
import {View, StyleSheet, TextInput, Text} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { ValidationError } from "../validation-error";

interface IRInputFieldProps {
    placeholder?: string;
    value?: string;
    err?: string;
    onChange: (t: string) => void;
    icon?: JSX.Element;
    type?: "text"|"password";    
    minLength?: number;
}

const RInputField = (props: IRInputFieldProps) => {
    const minLength = props.minLength || 0;
    const value = props.value || "";
    const placeholder = props.placeholder||"";
    const isOk = (props.err || value.length<minLength) ? false: true;
    const type = props.type || "text";    
    const [show, setShow] = useState<boolean>(false);

    let jsxOK: JSX.Element=null;
    if(isOk) {
        jsxOK = (
        <FAIcon
            name="check-circle"
            color="green"
            size={20}
            style={rinputFieldStyle.okIcon}
        />);
    };

    let jsxToggleShow: JSX.Element = null;
    if(type==="password") {
        let eyeIcon = "eye-slash";
        if(show) {
            eyeIcon="eye";
        }             
        jsxToggleShow = (
            <TouchableOpacity 
                onPress = {() => setShow(!show)}
            >
                <FAIcon
                    name={eyeIcon}
                    color="grey"
                    size={20}
                />
            </TouchableOpacity>
        );
    };     


    return (
    <View style={rinputFieldStyle.container}>
        <View style={rinputFieldStyle.inputContainer}>
            {props.icon}
            <TextInput 
                placeholder={placeholder} 
                style={rinputFieldStyle.input}  
                autoCapitalize="none"  
                secureTextEntry={props.type==="password" && !show}   
                value={value}
                onChangeText = {(t) => props.onChange(t)} 
            /> 
            {jsxToggleShow}             
            {jsxOK}
        </View> 
        <ValidationError err={props.err} />
    </View>
    );
};

const rinputFieldStyle = StyleSheet.create({
    container: {
        flexDirection: "column",
    },
    inputContainer: {
        flexDirection: "row", 
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
        paddingBottom: 5,        
    },
    input: {
        flex: 1,
        marginLeft: 10,
    },    
    okIcon: {
        marginLeft: 5,
    },      
});

export {RInputField};