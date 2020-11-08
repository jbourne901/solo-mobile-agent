import React, {useLayoutEffect}  from "react";
import {View, Text, StyleSheet, Alert} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {IUnauthNavParamList} from "../../types/unauth-navigation";
import {DashboardHeaderRight} from "./dashboard-header-right";

type IDashboardNavProps = StackNavigationProp<IUnauthNavParamList, "dashboard">;

interface IDashboardProps {
    navigation: IDashboardNavProps;
}

const Dashboard = (props: IDashboardProps) => {

    
    const queryLogout = () => {
        const logout = () => {
            alert("You logged out");
        };

        const cancelLogout = () => {

        };

        Alert.alert('Logout', 
                    'Are you sure you want to logout?', 
                    [ {
                        text: 'Yes', 
                        onPress: () => logout()
                      }, 
                      {
                        text: 'No', 
                        onPress: () => cancelLogout()
                      }, 
                    ],
                    {
                        cancelable: false
                    }
        );
    };
    useLayoutEffect( () => {
        props.navigation.setOptions({
            headerRight: () => <DashboardHeaderRight onLogout={() => queryLogout()}/>
        })
    }, [props.navigation]);


    return (
        <View style={dashboardStyle.container}>
            <Text style={dashboardStyle.text}>
                Dashboard2
            </Text>
        </View>
    );
};

const dashboardStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {

    }
});

export {Dashboard};
