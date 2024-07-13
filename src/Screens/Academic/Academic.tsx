// src/screens/Teachers.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Modal, TouchableOpacity,Image } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { auth } from '../../Components/firebaseconfig';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Academic = () => {
  const [teachers, setTeachers] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('teachers')
      .onSnapshot(snapshot => {
        const teachersList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTeachers(teachersList);
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

  const handleEdit = (teacher) => {
    setCurrentTeacher(teacher);
    setEditModalVisible(true);
  };

  const handleView = (teacher) => {
    setCurrentTeacher(teacher);
    setViewModalVisible(true);
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Teacher",
      "Are you sure you want to delete this teacher?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await firestore().collection('teachers').doc(id).delete();
              Alert.alert('Teacher deleted successfully');
            } catch (error) {
              console.error("Error deleting teacher: ", error);
              Alert.alert('Error deleting teacher');
            }
          }
        }
      ]
    );
  };

  const handleEditSubmit = async (values) => {
    try {
      await firestore().collection('teachers').doc(currentTeacher.id).update(values);
      setEditModalVisible(false);
      setCurrentTeacher(null);
      Alert.alert('Teacher updated successfully');
    } catch (error) {
      console.error("Error updating teacher: ", error);
      Alert.alert('Error updating teacher');
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
      <Text className='text-center text-2xl text-blue-400 font-bold'>Teacher List</Text>
      {teachers.map((teacher) => (
        <Card key={teacher.id}>
          <Card.Title>{teacher.name}</Card.Title>
          <Card.Divider />
          <Text style={styles.text}>Email: {teacher.email}</Text>
          <Text style={styles.text}>Department: {teacher.department}</Text>
          <Text style={styles.text}>Subject: {teacher.subject}</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Edit"
              onPress={() => handleEdit(teacher)}
              buttonStyle={styles.editButton}
            />
            <Button
              title="View"
              onPress={() => handleView(teacher)}
              buttonStyle={styles.viewButton}
            />
            <Button
              title="Delete"
              onPress={() => handleDelete(teacher.id)}
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
            <Text style={styles.modalTitle}>Edit Teacher</Text>
            {currentTeacher && (
              <Formik
                initialValues={{
                  name: currentTeacher.name,
                  email: currentTeacher.email,
                  department: currentTeacher.department,
                  subject: currentTeacher.subject,
                }}
                validationSchema={Yup.object().shape({
                  name: Yup.string().required('Name is required'),
                  email: Yup.string().email('Invalid email').required('Email is required'),
                  department: Yup.string().required('Department is required'),
                  subject: Yup.string().required('Subject is required'),
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
                      placeholder="Subject"
                      onChangeText={handleChange('subject')}
                      onBlur={handleBlur('subject')}
                      value={values.subject}
                      errorMessage={touched.subject && errors.subject ? errors.subject : ''}
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
            <Text style={styles.modalTitle}>Teacher Details</Text>
            {currentTeacher && (
              <View>
                <Text style={styles.text}>Name: {currentTeacher.name}</Text>
                <Text style={styles.text}>Email: {currentTeacher.email}</Text>
                <Text style={styles.text}>Department: {currentTeacher.department}</Text>
                <Text style={styles.text}>Subject: {currentTeacher.subject}</Text>
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
  text: {
    marginBottom: 10,
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

export default Academic;
