import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import CounterScreen from '../screens/CounterScreen';
import SettingsScreen from '../screens/SettingScreen';
import ColorScreen from '../screens/ColorScreen'; 
import AllTaskScreen from '../screens/AllTaskScreen';
import TodayScreen from '../screens/TodayScreen';
import TomorrowScreen from '../screens/TomorrowScreen';
import WeekScreen from '../screens/WeekScreen';
import CompletedScreen from '../screens/CompletedScreen';
import WorkScreen from '../screens/WorkScreen';
import { TaskProvider } from '../context/TaskContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};



function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
      <Tab.Screen name="Counter" component={CounterScreen} options={{ title: 'Compteur' }} />
      <Tab.Screen name="Color" component={ColorScreen} options={{ title: 'Couleur'}}/>
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Paramètres' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
     <GestureHandlerRootView style={{ flex: 1 }}>
      <TaskProvider>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen}/>
            <Stack.Screen name='AllTask' component={AllTaskScreen}/>
            <Stack.Screen name='Today' component={TodayScreen}/>
            <Stack.Screen name='Tomorrow' component={TomorrowScreen}/>
            <Stack.Screen name='Week' component={WeekScreen}/>
            <Stack.Screen name='Completed' component={CompletedScreen}/>
            <Stack.Screen name='Work' component={WorkScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </TaskProvider>
      </GestureHandlerRootView>
  );
}
