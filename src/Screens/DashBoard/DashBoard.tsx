import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity } from 'react-native';
import DashBStyle from './DashBStyle';
import { Icon, Image } from 'react-native-elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { TextInput } from 'react-native-paper';
import { auth, firestore } from '../../Components/firebaseconfig'; // Adjust the import path according to your project structure
import { styled } from 'nativewind';
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeProps) => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const userDoc = await firestore().collection('users').doc(user.uid).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setUserName(userData?.name || 'User');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <ScrollView style={DashBStyle.container} className="h-[200vh]">
      <View style={DashBStyle.header}>
      <Image
        resizeMode="contain" className='w-[40px] h-[40px]'
        source={{
          uri: 'https://www.cusat.ac.in/files/pictures/pictures_1_logo.png',
        }}
      />
      <Text className="text-rose-600 text-2xl text-left font-bold ml-4">Cusat</Text>
        <Text style={DashBStyle.headerText}>{userName}</Text>
      </View>

      <Text className='text-center text-2xl text-blue-400 font-bold'>Dashboard</Text>
      <View style={DashBStyle.cardContainer}>
          <TouchableOpacity style={DashBStyle.card} onPress={() => { navigation.navigate('Faculty'); }}>
            <Text style={DashBStyle.cardTitle} className="text-[#0F67B1]">Add Teacher</Text>
            <View style={DashBStyle.cardImageContainer}>
              <Image source={{ uri: 'https://cdn-icons-png.freepik.com/256/1995/1995574.png?ga=GA1.1.67623732.1708459641&semt=ais_hybrid' }} style={DashBStyle.cardImage} />
              <Image source={{ uri: 'https://cdn-icons-png.freepik.com/256/16423/16423684.png?ga=GA1.1.67623732.1708459641&semt=ais_hybrid' }} style={DashBStyle.cardImage} />
              <Image source={{ uri: 'https://cdn-icons-png.freepik.com/256/3307/3307318.png?ga=GA1.1.67623732.1708459641&semt=ais_hybrid' }} style={DashBStyle.cardImage} resizeMode='contain'/>
              <Icon name="plus" type="feather" size={24} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={DashBStyle.card} onPress={() => { navigation.navigate('Students'); }}>
            <Text style={DashBStyle.cardTitle} className="text-[#EE4E4E]">Add Students</Text>
            <View style={DashBStyle.cardImageContainer}>
              <Image source={{ uri: 'https://cdn-icons-png.freepik.com/256/3152/3152908.png?ga=GA1.1.67623732.1708459641&semt=ais_hybrid' }} style={DashBStyle.cardImage} />
              <Image source={{ uri: 'https://cdn-icons-png.freepik.com/256/257/257651.png?ga=GA1.1.67623732.1708459641&semt=ais_hybrid' }} style={DashBStyle.cardImage} />
              <Image source={{ uri: 'https://cdn-icons-png.freepik.com/256/194/194931.png?ga=GA1.1.67623732.1708459641&semt=ais_hybrid' }} style={DashBStyle.cardImage} />
              <Icon name="plus" type="feather" size={24} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={DashBStyle.card} onPress={() => { navigation.navigate('Notices'); }}>
            <Text style={DashBStyle.cardTitle} className="text-[#0F67B1]">Add Notice</Text>
            <View style={DashBStyle.cardImageContainer}>
              <Image source={{ uri: 'https://cdn-icons-png.freepik.com/256/8003/8003308.png?ga=GA1.1.67623732.1708459641&semt=ais_hybrid' }} style={DashBStyle.cardImage} />
              <Image source={{ uri: 'https://cdn-icons-png.freepik.com/256/9436/9436150.png?ga=GA1.1.67623732.1708459641&semt=ais_hybrid' }} style={DashBStyle.cardImage} />
              <Image source={{ uri: 'https://cdn-icons-png.freepik.com/256/114/114468.png?ga=GA1.1.67623732.1708459641&semt=ais_hybrid' }} style={DashBStyle.cardImage} />
              <Icon name="plus" type="feather" size={24} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={DashBStyle.card} onPress={() => { navigation.navigate('Event'); }}>
            <Text style={DashBStyle.cardTitle} className="text-[#EE4E4E]">Add Events</Text>
            <View style={DashBStyle.cardImageContainer}>
              <Image source={{ uri: 'https://cdn-icons-png.freepik.com/256/2693/2693507.png?ga=GA1.1.67623732.1708459641&semt=ais_hybrid' }} style={DashBStyle.cardImage} />
              <Image source={{ uri: 'https://cdn-icons-png.freepik.com/256/9422/9422705.png?ga=GA1.1.67623732.1708459641&semt=ais_hybrid' }} style={DashBStyle.cardImage} />
              <Image source={{ uri: 'https://cdn-icons-png.freepik.com/256/8922/8922319.png?ga=GA1.1.67623732.1708459641&semt=ais_hybrid' }} style={DashBStyle.cardImage} />
              <Icon name="plus" type="feather" size={24} />
            </View>
          </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
