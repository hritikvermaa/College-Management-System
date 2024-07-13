import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import StudentDashBoard from '../Screens/StudentDashboard/StudentDashboard';
import StudentAssignment from '../Screens/StudentDashboard/StudentAssignment';
import StudentAccount from '../Screens/StudentDashboard/StudentAccount';
import StudentMarks from '../Screens/StudentDashboard/StudentMarks';

const Tab = createBottomTabNavigator();

const StudentTab: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';
          if (route.name === 'StudentDashBoard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'StudentAssignment') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Library') {
            iconName = focused ? 'library' : 'library-outline';
          } else if (route.name === 'StudentAccount') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'StudentMarks') {
            iconName = focused ? 'bookmarks' : 'bookmarks-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="StudentDashBoard" component={StudentDashBoard} />
      <Tab.Screen name="StudentAssignment" component={StudentAssignment} />
      <Tab.Screen name="StudentMarks" component={StudentMarks} />
      <Tab.Screen name="StudentAccount" component={StudentAccount} />
    </Tab.Navigator>
  );
};

export default StudentTab;

const styles = StyleSheet.create({});
