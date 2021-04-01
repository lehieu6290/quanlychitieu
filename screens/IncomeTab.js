import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import IncomeHome from './IncomeHome';
import CardDetails from './CardDetails';

const Stack = createStackNavigator();

const IncomeTab = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="IncomeHome" component={IncomeHome} options={ { headerShown: false } } />
            <Stack.Screen name="CardDetails" component={CardDetails} options={ { headerShown: false } } />
        </Stack.Navigator>
    )
}

export default IncomeTab;