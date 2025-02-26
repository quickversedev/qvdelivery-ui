import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Entry from "../auth/Entry";
import Login from "../auth/Login";

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Entry" component={Entry} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};
