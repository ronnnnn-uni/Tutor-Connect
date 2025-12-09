import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import StudentHome from "./screens/StudentHome";
import TutorHome from "./screens/TutorHome";
import AdminHome from "./screens/AdminHome";
import ScheduleScreen from "./screens/ScheduleScreen";
import TutorSchedule from "./screens/TutorSchedule";
import BookAppointment from "./screens/BookAppointment";
import ManageAppointment from "./screens/ManageAppointment";
import UserRecords from "./screens/UserRecords";
import Appointments from "./screens/Appointments";
import PendingTutors from "./screens/PendingTutors";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="LoginScreen"
              screenOptions={{ headerShown: false}} >
            
            <Stack.Group>
                <Stack.Screen name = "LoginScreen" component = {LoginScreen}/>
                <Stack.Screen name = "SignUpScreen" component = {SignUpScreen}/>
                <Stack.Screen name = "StudentHome" component = {StudentHome}/>
                <Stack.Screen name = "TutorHome" component = {TutorHome}/>
                <Stack.Screen name = "AdminHome" component = {AdminHome}/>
                <Stack.Screen name = "ScheduleScreen" component = {ScheduleScreen}/>
                <Stack.Screen name = "TutorSchedule" component = {TutorSchedule}/>
                <Stack.Screen name = "BookAppointment" component = {BookAppointment}/>
                <Stack.Screen name = "ManageAppointment" component = {ManageAppointment}/>
                <Stack.Screen name = "UserRecords" component = {UserRecords}/>
                <Stack.Screen name = "Appointments" component = {Appointments}/>
                <Stack.Screen name = "PendingTutors" component = {PendingTutors}/>
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default StackNavigator;