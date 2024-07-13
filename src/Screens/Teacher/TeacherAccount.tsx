import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Icon, Image, Button } from 'react-native-elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { Card } from 'react-native-paper';
import { auth, firestore } from '../../Components/firebaseconfig'; // Adjust the import path according to your project structure
import DashBStyle from './DashBStyle';
import { styled } from 'nativewind';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

interface UserDetails {
  name: string;
  regNumber: string;
  email: string;
  phone: string;
  designation: string;
}

const TeacherAccount = ({ navigation }: HomeProps) => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    regNumber: '',
    email: '',
    phone: '',
    designation: '',
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const userDoc = await firestore().collection('users').doc(user.uid).get();
          if (userDoc.exists) {
            const userData = userDoc.data() as UserDetails;
            setUserDetails({
              name: userData?.name || 'User',
              regNumber: userData?.regNumber || '',
              email: userData?.email || '',
              phone: userData?.phone || '',
              designation: userData?.designation || '',
            });
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.replace('Login'); // Navigate to the Login screen
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <ScrollView style={DashBStyle.container}>
      <View style={DashBStyle.header}>
        <Image
          resizeMode="contain"
          className='w-[40px] h-[40px]'
          source={{
            uri: 'https://www.cusat.ac.in/files/pictures/pictures_1_logo.png',
          }}
        />
        <Text style={DashBStyle.headerText}>My Profile</Text>
      </View>
      <View className='w-[100%] h-[30vh] p-4'>
        <Image
          resizeMode="cover"
          className='w-[100%] h-[100%] rounded-2xl'
          source={{
            uri: 'https://www.cusat.ac.in/images/campus/campus.jpg',
          }}
        />
      </View>
      <Card style={DashBStyle.card}>
        <Card.Title title="User Details" />
        <Card.Content>
          <View style={DashBStyle.userDetailsRow}>
            <Icon name="user" type="feather" size={24} />
            <Text style={DashBStyle.userDetailsText}>Name: {userDetails.name}</Text>
          </View>
          <View style={DashBStyle.userDetailsRow}>
            <Icon name="id-badge" type="feather" size={24} />
            <Text style={DashBStyle.userDetailsText}>Register Number: {userDetails.regNumber}</Text>
          </View>
          <View style={DashBStyle.userDetailsRow}>
            <Icon name="mail" type="feather" size={24} />
            <Text style={DashBStyle.userDetailsText}>Email: {userDetails.email}</Text>
          </View>
          <View style={DashBStyle.userDetailsRow}>
            <Icon name="phone" type="feather" size={24} />
            <Text style={DashBStyle.userDetailsText}>Phone: {userDetails.phone}</Text>
          </View>
          <View style={DashBStyle.userDetailsRow}>
            <Icon name="briefcase" type="feather" size={24} />
            <Text style={DashBStyle.userDetailsText}>Department: {userDetails.designation}</Text>
          </View>
        </Card.Content>
      </Card>

      <View style={DashBStyle.logoutButtonContainer}>
        <TouchableOpacity style={DashBStyle.logoutButton} onPress={handleLogout}>
          <Icon name="log-out" type="feather" size={24} color="#fff" />
          <Text style={DashBStyle.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TeacherAccount;
