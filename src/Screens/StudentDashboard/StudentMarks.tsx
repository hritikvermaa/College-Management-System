import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet,Image } from 'react-native';
import { DataTable, Card, ActivityIndicator } from 'react-native-paper';
import { auth, firestore } from '../../Components/firebaseconfig'; // Adjust the import path according to your project structure
import { styled } from 'nativewind';

interface Marks {
  DBMS: string;
  OOPS: string;
  DSA: string;
  OS: string;
}

const StudentMarks = () => {
  const [marks, setMarks] = useState<Marks | null>(null);
  const [loading, setLoading] = useState(true);

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


  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const querySnapshot = await firestore()
            .collection('students')
            .where('email', '==', user.email)
            .get();

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setMarks({
              DBMS: userData?.marks?.DBMS || 'N/A',
              OOPS: userData?.marks?.OOPS || 'N/A',
              DSA: userData?.marks?.DSA || 'N/A',
              OS: userData?.marks?.OS || 'N/A',
            });
          }
        }
      } catch (error) {
        console.error('Error fetching marks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarks();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
       <View className="w-[100%] h-[20vh] flex-row items-center justify-between p-4">
        <View className="flex-row justify-start items-center">
          <Image
            resizeMode="contain" className='w-[40px] h-[40px]'
            source={{
              uri: 'https://www.cusat.ac.in/files/pictures/pictures_1_logo.png',
            }}
          />
          <Text className="text-rose-600 text-2xl text-left font-bold ml-4">Cusat</Text></View>
          <Text className="text-black">{userName}</Text>

      </View>
      <Text className='text-center text-2xl text-blue-400 font-bold'>My Marks</Text>
      <Card style={styles.card}>
        <Card.Title title="Marks" />
        <Card.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Subject</DataTable.Title>
              <DataTable.Title>Marks</DataTable.Title>
            </DataTable.Header>

            {marks ? (
              <>
                <DataTable.Row>
                  <DataTable.Cell>DBMS</DataTable.Cell>
                  <DataTable.Cell>{marks.DBMS}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>OOPS</DataTable.Cell>
                  <DataTable.Cell>{marks.OOPS}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>DSA</DataTable.Cell>
                  <DataTable.Cell>{marks.DSA}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>OS</DataTable.Cell>
                  <DataTable.Cell>{marks.OS}</DataTable.Cell>
                </DataTable.Row>
              </>
            ) : (
              <DataTable.Row>
                <DataTable.Cell>No marks found</DataTable.Cell>
              </DataTable.Row>
            )}
          </DataTable>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  card: {
    marginBottom: 20,
  },
});

export default StudentMarks;
