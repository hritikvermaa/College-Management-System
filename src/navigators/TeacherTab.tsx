import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import TeacherDashboard from '../Screens/Teacher/TeacherDashboard';
import TeacherAssignments from '../Screens/Teacher/TeacherAssignments';
import TeacherLibrary from '../Screens/Teacher/TeacherLibrary';
import TeacherMarks from '../Screens/Teacher/TeacherMarks';
import TeacherAccount from '../Screens/Teacher/TeacherAccount';

const Tab = createBottomTabNavigator();

const TeacherTab: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';
          if (route.name === 'TeacherDashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'TeacherAssignments') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'TeacherLibrary') {
            iconName = focused ? 'library' : 'library-outline';
          } else if (route.name === 'TeacherMarks') {
            iconName = focused ? 'library' : 'library-outline';
          } else if (route.name === 'TeacherAccount') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="TeacherDashboard" component={TeacherDashboard} />
      <Tab.Screen name="TeacherAssignments" component={TeacherAssignments} />
      {/* <Tab.Screen name="TeacherLibrary" component={TeacherLibrary} /> */}
      <Tab.Screen name="TeacherMarks" component={TeacherMarks} />
      <Tab.Screen name="TeacherAccount" component={TeacherAccount} />
    </Tab.Navigator>
  );
};

export default TeacherTab;

const styles = StyleSheet.create({});
