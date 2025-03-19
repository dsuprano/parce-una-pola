import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import defaultStackOptions from 'navigation/defaultStackOptions';
import Routes from 'navigation/routes';

import LoginScreen from 'screens/Auth/Login';
import SignupScreen from 'screens/Auth/Signup';

const Stack = createStackNavigator();

const GuestNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackOptions} initialRouteName={Routes.LOGIN}>
      <Stack.Screen name={Routes.LOGIN} component={LoginScreen} />
      <Stack.Screen name={Routes.SIGNUP} component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default GuestNavigator;
