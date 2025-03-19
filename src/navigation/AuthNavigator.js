import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';

import defaultStackOptions from 'navigation/defaultStackOptions';
import Routes from 'navigation/routes';
import { useStore } from 'providers/StoreProvider';

import HomeScreen from 'screens/Home';

const Stack = createStackNavigator();

const AuthNavigator = (props) => {
  const { authStore } = useStore();

  return (
    <Stack.Navigator screenOptions={defaultStackOptions} initialRouteName={Routes.HOME}>
      <Stack.Screen name={Routes.HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default observer(AuthNavigator);
