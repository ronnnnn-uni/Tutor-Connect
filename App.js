import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import  {NavigationContainer}  from "@react-navigation/native";
import StackNavigator from './StackNavigator';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  );

}


