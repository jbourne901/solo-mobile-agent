import React from "react";
import {RInputField} from "../rinput-field";
import FAIcon from 'react-native-vector-icons/FontAwesome';

interface IUsernameFieldProps {
    value: string;
    err: string;
    onChange: (t: string) => void;
}

const usernameIcon = (
    <FAIcon
        name="user-o"
        color="#05375a"
        size={20}
    />
);
const UsernameField = (props: IUsernameFieldProps) => {
    return (
        <RInputField 
            icon={usernameIcon}
            placeholder="Enter username"
            minLength={4}
            value={props.value}
            onChange = {(t: string) => props.onChange(t)}
            err={props.err}            
        />
    )
}

export {UsernameField};