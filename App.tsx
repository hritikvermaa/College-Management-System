import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigators from './src/navigators/TabNavigators';
import Home from './src/Screens/Home/Home';
import Library from './src/Screens/Library/Library';
import Student from './src/Screens/Students/Student';
import Login from './src/Screens/Login/Login';
import Signup from './src/Screens/SignUp/Signup';
import FacultyList from './src/Screens/FacultyList/Faculty';
import Events from './src/Screens/Events/Events';
import Notice from './src/Screens/Notice/Notice';
import AppSetting from './src/Screens/AppSettings/AppSetting';
import StudentDashboard from './src/Screens/StudentDashboard/StudentDashboard';
import StudentTab from './src/navigators/StudentTab';
import TeacherTab from './src/navigators/TeacherTab';
import TeacherDashboard from './src/Screens/Teacher/TeacherDashboard';
export type RootStackParamList = {
  TabNavigators: undefined;
  Library : undefined;
  Student : undefined;
  Home:undefined;
  Login:undefined;
  Signup:undefined;
  FacultyList:undefined;
  Events:undefined;
  Notice:undefined;
  AppSetting:undefined;
  StudentDashboard:undefined;
  StudentTab:undefined;
  TeacherTab:undefined;
};

const Stack=createNativeStackNavigator();
const Drawer=createDrawerNavigator();

function App(): React.JSX.Element {
  return (
    <>
     <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
        <Stack.Screen name="Tab" component={TabNavigators} options={{animation:'slide_from_bottom'}} />
        <Stack.Screen name="Home" component={Home} options={{animation:'slide_from_bottom'}} />
        <Stack.Screen name="Library" component={Library} options={{animation:'slide_from_bottom'}} />
        <Stack.Screen name="Students" component={Student} options={{animation:'slide_from_bottom'}} />
        <Stack.Screen name="Login" component={Login} options={{animation:'slide_from_bottom'}} />
        <Stack.Screen name="Signup" component={Signup} options={{animation:'slide_from_bottom'}} />
        <Stack.Screen name="Faculty" component={FacultyList} options={{animation:'slide_from_bottom'}} />
        <Stack.Screen name="Event" component={Events} options={{animation:'slide_from_bottom'}} />
        <Stack.Screen name="Notices" component={Notice} options={{animation:'slide_from_bottom'}} />
        <Stack.Screen name="settings" component={AppSetting} options={{animation:'slide_from_bottom'}} />
        <Stack.Screen name="StudentTab" component={StudentTab} options={{animation:'slide_from_bottom'}} />
        <Stack.Screen name="StudentDashboard" component={StudentDashboard} options={{animation:'slide_from_bottom'}} />
        <Stack.Screen name="TeacherDashboard" component={TeacherDashboard} options={{animation:'slide_from_bottom'}} />
        <Stack.Screen name="TeacherTab" component={TeacherTab} options={{animation:'slide_from_bottom'}} />
       


        </Stack.Navigator>

      </NavigationContainer> 

    </>
  );
};



export default App
