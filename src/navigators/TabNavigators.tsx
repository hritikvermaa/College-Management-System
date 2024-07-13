import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'


import DashBoard from '../Screens/DashBoard/DashBoard'
import Academic from '../Screens/Academic/Academic'
import Library from '../Screens/Library/Library'
import Account from '../Screens/Account/Account'
import AccountEvents from '../Screens/Academic/AccountEvents'
const Tab = createBottomTabNavigator();

const TabNavigators = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'DashBoard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Academic') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Library') {
            iconName = focused ? 'library' : 'library-outline';
          } else if (route.name === 'AccountEvents') {
            iconName = focused ? 'calendar' : 'calendar-outline'; // Assuming 'calendar' for events
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
        <Tab.Screen name="DashBoard" component={DashBoard}
        
        ></Tab.Screen>
        <Tab.Screen name="Academic" component={Academic}  
        
        ></Tab.Screen>
        <Tab.Screen name="AccountEvents" component={AccountEvents}  
        
        ></Tab.Screen>
         <Tab.Screen name="Library" component={Library} 
       
        ></Tab.Screen>
        <Tab.Screen name="Account" component={Account} 
        
        ></Tab.Screen>

     </Tab.Navigator>
  )
}

export default TabNavigators

const styles = StyleSheet.create({})