import React  from "react";
import {StyleSheet, Text} from "react-native";

interface IValidationError {
    err?: string;
}

const ValidationError = (props: IValidationError) => {
    const err = props.err||""; //"Invalid username";
    return (
        <Text style={validationErrorStyle.error}>
            {err}
        </Text>
    );
};

const validationErrorStyle = StyleSheet.create({     
    error: {
        color: "red",
    }    
})

export {ValidationError};