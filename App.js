import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import SpendingTab from './screens/SpendingTab';
import IncomeTab from './screens/IncomeTab';
import StatisticTab from './screens/StatisticTab';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeBackgroundColor: '#C65BEC',
          inactiveBackgroundColor: '#CF86E9',
          activeTintColor: '#fff',
          inactiveTintColor: '#fff',
          labelStyle: {
            fontSize: 13,
            fontFamily: 'Roboto-Regular'
          },
          style: {
            height: 60
          }
        }}
      >
        <Tab.Screen name="Spending" component={SpendingTab} 
          options={{ 
            tabBarLabel: "Chi tiêu",
            tabBarIcon: () => ( <Image style={{ width: 30, height: 30 }} source={ require('./images/flying-money.png') } />),
          }}
        />
        <Tab.Screen name="Income" component={IncomeTab} 
          options={{ 
            tabBarLabel: "Thu nhập", 
            tabBarIcon: () => ( <Image style={{ width: 30, height: 30 }} source={ require('./images/profit.png') } />),
          }}
        />
        <Tab.Screen name="Statistic" component={StatisticTab} 
          options={{ 
            tabBarLabel: "Thống kê",
            tabBarIcon: () => ( <Image style={{ width: 30, height: 30 }} source={ require('./images/bar-chart.png') } />),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
