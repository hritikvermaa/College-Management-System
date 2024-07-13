import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Modal, TextInput,Image } from 'react-native';
import { Card, Button, DataTable } from 'react-native-paper';
import { firestore,auth } from '../../Components/firebaseconfig'; // Adjust the import path according to your project structure

interface Student {
  id: string;
  name: string;
}

const TeacherMarks = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [marks, setMarks] = useState({ DBMS: '', OOPS: '', DSA: '', OS: '' });

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
    const fetchStudents = async () => {
      try {
        const snapshot = await firestore().collection('students').get();
        const studentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Student));
        setStudents(studentsData);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleOpenModal = (student: Student) => {
    setSelectedStudent(student);
    setModalVisible(true);
  };

  const handleSaveMarks = async () => {
    if (selectedStudent) {
      try {
        await firestore().collection('students').doc(selectedStudent.id).update({
          marks,
        });
        console.log('Marks updated successfully!');
        setModalVisible(false);
      } catch (error) {
        console.error('Error updating marks:', error);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
       <View className="w-[100%] h-[20vh] flex-row items-center justify-between">
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
      <Text className='text-center text-2xl text-blue-400 font-bold'>Student List</Text>
      {students.map(student => (
        <Card key={student.id} style={styles.card} onPress={() => handleOpenModal(student)}>
          <Card.Title title={student.name} />
        </Card>
      ))}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedStudent?.name}'s Marks</Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Subject</DataTable.Title>
                <DataTable.Title>Marks</DataTable.Title>
              </DataTable.Header>

              {['DBMS', 'OOPS', 'DSA', 'OS'].map(subject => (
                <DataTable.Row key={subject}>
                  <DataTable.Cell>{subject}</DataTable.Cell>
                  <DataTable.Cell>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={marks[subject]}
                      onChangeText={text => setMarks(prev => ({ ...prev, [subject]: text }))}
                    />
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
            <Button mode="contained" onPress={handleSaveMarks} style={styles.saveButton}>
              Save
            </Button>
            <Button mode="text" onPress={() => setModalVisible(false)}>
              Close
            </Button>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    width: '100%',
  },
  saveButton: {
    marginTop: 20,
  },
});

export default TeacherMarks;
