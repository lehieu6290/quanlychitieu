import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SpendingHome from './SpendingHome';
import CardDetails from './CardDetails';

const Stack = createStackNavigator();

const SpendingTab = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="SpendingHome" component={SpendingHome} options={ { headerShown: false } } />
        <Stack.Screen name="CardDetails" component={CardDetails} options={ { headerShown: false } } />
      </Stack.Navigator>
    );
  };
  
  export default SpendingTab;