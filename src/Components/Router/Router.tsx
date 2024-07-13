import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../Screens/Home/Home';
import Login from '../../Screens/Login/Login';
import Signup from '../../Screens/SignUp/Signup';
import BottomTab from './BottomTab';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    
      <Stack.Navigator initialRouteName="Signup" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
      </Stack.Navigator>
  );
};

export default App;
