import React  from "react";
import {View, Text, StyleSheet} from "react-native";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";

interface IDashboardHeaderRightProps {
    onLogout: () => void;
}

const DashboardHeaderRight = (props: IDashboardHeaderRightProps) => {
    const handleLogout = () => {
        console.log('handle Logout')
        props.onLogout();
    };

    return (
        <View style={dashboardHeaderRightStyle.container}>
            <SimpleLineIcon 
                name="logout"
                size={26}
                color="white"
                style={dashboardHeaderRightStyle.icon}
                onPress = { () => handleLogout() }
            />            
        </View>
    );
};

const dashboardHeaderRightStyle = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    icon: {
        color: "white",
        right: 10
    }
})

export {DashboardHeaderRight};
