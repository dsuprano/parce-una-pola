import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';

import defaultStackOptions from 'navigation/defaultStackOptions';
import Routes from 'navigation/routes';
import { useStore } from 'providers/StoreProvider';

import HomeScreen from 'screens/Home';
import GroupScreen from 'screens/Group';
import NewGroupScreen from 'screens/Group/Create';
import CartScreen from 'screens/Cart';

const Stack = createStackNavigator();

const AuthNavigator = (props) => {
  const { authStore } = useStore();

  return (
    <Stack.Navigator screenOptions={defaultStackOptions} initialRouteName={Routes.HOME}>
      <Stack.Screen name={Routes.HOME} component={HomeScreen} />
      <Stack.Screen name={Routes.GROUP} component={GroupScreen} />
      <Stack.Screen name={Routes.CREATE_GROUP} component={NewGroupScreen} />
      <Stack.Screen name={Routes.CART} component={CartScreen} />
    </Stack.Navigator>
  );
};

export default observer(AuthNavigator);
