import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
const Tab = createMaterialBottomTabNavigator();
import DashBoard from '../../Screens/DashBoard/DashBoard';
import Account from '../../Screens/Account/Account';
import Library from '../../Screens/Library/Library';
import Academic from '../../Screens/Academic/Academic';
import FacultyList from '../../Screens/FacultyList/Faculty';
import Icon from 'react-native-vector-icons/Entypo';
import User from 'react-native-vector-icons/FontAwesome6'
import LibraryIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import OpenBook from 'react-native-vector-icons/Entypo'
const BottomTab = () => {
  return (
    <Tab.Navigator
        initialRouteName="Dashboard"
        activeColor="green"
        inactiveColor="white"
        barStyle={{ backgroundColor: '#000' }}
        shifting={true}
      >
        <Tab.Screen 
          name="Dashboard"
          component={DashBoard}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <Icon name={'home'} color={color} size={26} />
            ),
            tabBarColor:"red",
          }}
        />
        <Tab.Screen
          name="Academic"
          component={Academic}
          options={{
            tabBarLabel: 'Academic',
            tabBarIcon: ({ color }) => (
              <OpenBook name="open-book" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="FacultyList"
          component={FacultyList}
          options={{
            tabBarLabel: 'Faculty List',
            tabBarIcon: ({ color }) => (
              <User name="user-tie" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Library"
          component={Library}
          options={{
            tabBarLabel: 'Library',
            tabBarIcon: ({ color }) => (
              <LibraryIcon name="library" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <LibraryIcon name="account-details" color={color} size={26} />
            ),
          }}
        />
       
      </Tab.Navigator>
  )
}

export default BottomTab