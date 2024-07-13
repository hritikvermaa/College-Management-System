// src/screens/Students.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Modal, TouchableOpacity ,Image } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { auth } from '../../Components/firebaseconfig';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('students')
      .onSnapshot(snapshot => {
        const studentsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStudents(studentsList);
      });

    return () => unsubscribe();
  }, []);

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

  const handleEdit = (student) => {
    setCurrentStudent(student);
    setEditModalVisible(true);
  };

  const handleView = (student) => {
    setCurrentStudent(student);
    setViewModalVisible(true);
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Student",
      "Are you sure you want to delete this student?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await firestore().collection('students').doc(id).delete();
              Alert.alert('Student deleted successfully');
            } catch (error) {
              console.error("Error deleting student: ", error);
              Alert.alert('Error deleting student');
            }
          }
        }
      ]
    );
  };

  const handleEditSubmit = async (values) => {
    try {
      await firestore().collection('students').doc(currentStudent.id).update(values);
      setEditModalVisible(false);
      setCurrentStudent(null);
      Alert.alert('Student updated successfully');
    } catch (error) {
      console.error("Error updating student: ", error);
      Alert.alert('Error updating student');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      <Image
        resizeMode="contain" className='w-[40px] h-[40px]'
        source={{
          uri: 'https://www.cusat.ac.in/files/pictures/pictures_1_logo.png',
        }}
      />
      <Text className="text-rose-600 text-2xl text-left font-bold ml-4">Cusat</Text>
        <Text style={styles.headerText}>{userName}</Text>
        {/* <View style={DashBStyle.iconContainer}>
          <Icon name="bell" type="feather" size={24} style={DashBStyle.profileIcon} />
          <Icon name="user" type="feather" size={24} style={DashBStyle.profileIcon} />
        </View> */}
      </View>
      <Text className='text-center text-2xl text-blue-400 font-bold'>Student List</Text>
      {students.map((student) => (
        <Card key={student.id}>
          <Card.Title>{student.name}</Card.Title>
          <Card.Divider />
          <Text style={styles.text}>Email: {student.email}</Text>
          <Text style={styles.text}>Department: {student.department}</Text>
          <Text style={styles.text}>Registration Number: {student.registrationNumber}</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Edit"
              onPress={() => handleEdit(student)}
              buttonStyle={styles.editButton}
            />
            <Button
              title="View"
              onPress={() => handleView(student)}
              buttonStyle={styles.viewButton}
            />
            <Button
              title="Delete"
              onPress={() => handleDelete(student.id)}
              buttonStyle={styles.deleteButton}
            />
          </View>
        </Card>
      ))}
      
      {/* Edit Modal */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Student</Text>
            {currentStudent && (
              <Formik
                initialValues={{
                  name: currentStudent.name,
                  email: currentStudent.email,
                  department: currentStudent.department,
                  registrationNumber: currentStudent.registrationNumber,
                }}
                validationSchema={Yup.object().shape({
                  name: Yup.string().required('Name is required'),
                  email: Yup.string().email('Invalid email').required('Email is required'),
                  department: Yup.string().required('Department is required'),
                  registrationNumber: Yup.string().required('Registration Number is required'),
                })}
                onSubmit={handleEditSubmit}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <View>
                    <Input
                      placeholder="Name"
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      errorMessage={touched.name && errors.name ? errors.name : ''}
                    />
                    <Input
                      placeholder="Email"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      errorMessage={touched.email && errors.email ? errors.email : ''}
                    />
                    <Input
                      placeholder="Department"
                      onChangeText={handleChange('department')}
                      onBlur={handleBlur('department')}
                      value={values.department}
                      errorMessage={touched.department && errors.department ? errors.department : ''}
                    />
                    <Input
                      placeholder="Registration Number"
                      onChangeText={handleChange('registrationNumber')}
                      onBlur={handleBlur('registrationNumber')}
                      value={values.registrationNumber}
                      errorMessage={touched.registrationNumber && errors.registrationNumber ? errors.registrationNumber : ''}
                    />
                    <Button
                      title="Save Changes"
                      onPress={handleSubmit}
                      buttonStyle={styles.saveButton}
                    />
                    <Button
                      title="Cancel"
                      onPress={() => setEditModalVisible(false)}
                      buttonStyle={styles.cancelButton}
                    />
                  </View>
                )}
              </Formik>
            )}
          </View>
        </View>
      </Modal>

      {/* View Modal */}
      <Modal
        visible={viewModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Student Details</Text>
            {currentStudent && (
              <View>
                <Text style={styles.text}>Name: {currentStudent.name}</Text>
                <Text style={styles.text}>Email: {currentStudent.email}</Text>
                <Text style={styles.text}>Department: {currentStudent.department}</Text>
                <Text style={styles.text}>Registration Number: {currentStudent.registrationNumber}</Text>
                <Button
                  title="Close"
                  onPress={() => setViewModalVisible(false)}
                  buttonStyle={styles.closeButton}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  text: {
    marginBottom: 10,
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
},
headerText:{
    fontSize: 16,
    color:"#0F67B1",
    fontWeight: 'bold',
    position:"absolute",
    right:10
},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#007bff',
    width: 100,
  },
  viewButton: {
    backgroundColor: '#17a2b8',
    width: 100,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    width: 100,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#28a745',
    marginVertical: 10,
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    marginVertical: 10,
  },
  closeButton: {
    backgroundColor: '#6c757d',
    marginVertical: 10,
  },
});

export default Students;
