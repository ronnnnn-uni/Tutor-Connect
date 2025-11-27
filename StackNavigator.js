import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import StudentHome from "./screens/StudentHome";
import TutorHome from "./screens/TutorHome";
import AdminHome from "./screens/AdminHome";



const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="LoginScreen"
              screenOptions={{ headerShown: false }} >
            
            <Stack.Group>
                <Stack.Screen name = "LoginScreen" component = {LoginScreen}/>
                <Stack.Screen name = "SignUpScreen" component = {SignUpScreen}/>
                <Stack.Screen name = "StudentHome" component = {StudentHome}/>
                <Stack.Screen name = "TutorHome" component = {TutorHome}/>
                <Stack.Screen name = "AdminHome" component = {AdminHome}/>

            </Stack.Group>
        </Stack.Navigator>
    );
};

export default StackNavigator;