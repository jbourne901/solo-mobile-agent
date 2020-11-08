import React from "react";
import {RInputField} from "../rinput-field";
import FAIcon from 'react-native-vector-icons/FontAwesome';

interface IPasswordFieldProps {
    value: string;
    title?: string;
    err?: string;
    onChange: (t: string) => void;
}

const passwordIcon = (
    <FAIcon
        name="lock"
        color="#05375a"
        size={20}
    />
);

const PasswordField = (props: IPasswordFieldProps) => {
    const title = props.title || "Enter password";
    return (
        <RInputField 
            icon={passwordIcon}
            placeholder={title}
            minLength={4}
            value={props.value}
            onChange = {(t: string) => props.onChange(t)}
            type="password"
            err={props.err}
        />
    )
}

export {PasswordField};