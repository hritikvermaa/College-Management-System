import {Text, View,TouchableOpacity, StyleSheet,Image } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { styled } from 'nativewind';
//Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'
//import rootstackparamslist
import { RootStackParamList } from '../../../App'
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>

const Home = ({ navigation }: HomeProps) => {
  return (
    <View style={styles.container}>
      
      {/* above section start here */}
      <View style={styles.aboveSection}>
        <Text style={styles.welcomeText}>College Management System</Text>
      </View>


      {/* Middle section start here */}
      <View style={styles.middleSection} className="w-full h-[40%]">
      <Image style={styles.logo}
        source={{
          uri: 'https://www.cusat.ac.in/files/pictures/pictures_1_logo.png',
        }}
      />
      <Text className="text-blue-400 font-bold text-lg">May learning illumine us both</Text>
      </View>


      {/* Below section start here */}
      <View className="w-full h-[40%] mt-[30%] pt-[20%] bg-blue-300 pb-9 flex flex-row justify-evenly items-start rounded-full">
        <TouchableOpacity onPress={() => {navigation.navigate("Login")}} className="bg-black p-4 w-[100px] rounded-3xl">
        <Text className="text-center text-white font-bold">Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate("Signup")}} className="bg-white p-4 w-[100px] rounded-3xl">
        <Text className="text-center text-black font-bold">SignUp</Text>
        </TouchableOpacity>
      </View>
     
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff"
  },
  gradient: {
    flex: 1,
  },
  aboveSection: {
    width: '100%',
    height: '20%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color:"#000"
  },
  middleSection: {
    width: '100%',
    height: '40%',
    
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  middleText: {
    fontSize: 28,
    fontWeight: '600',
    color: 'black',
  },

  loginButton: {
    backgroundColor: 'black',
  },
  signupButton: {
    backgroundColor: 'white',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  signupButtonText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  logo:{
    width:200,
    height:200,
    resizeMode:"contain"
  }
});

export default Home

