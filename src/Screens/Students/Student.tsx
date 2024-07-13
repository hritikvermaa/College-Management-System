import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { firestore } from '../../Components/firebaseconfig'; // Adjust the import path according to your project structure


import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Students = ({ navigation }: HomeProps) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    department: Yup.string().required('Department is required'),
    registrationNumber: Yup.string().required('Registration Number is required'),
  });

  const handleFormSubmit = async (values) => {
    try {
      await firestore().collection('students').add({
        name: values.name,
        email: values.email,
        department: values.department,
        registrationNumber: values.registrationNumber,
      });
      console.log('Student added successfully:', values);
      navigation.navigate("Tab");
      // Optionally, you can add navigation logic here or clear the form
    } catch (error) {
      console.error('Error adding student:', error);
      // Handle error state or display an error message
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Student</Text>
      </View>
      <Formik
        initialValues={{ name: '', email: '', department: '', registrationNumber: '' }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
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
              title="Add Student"
              onPress={handleSubmit}
              buttonStyle={styles.addButton}
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#28a745',
    marginTop: 20,
    paddingVertical: 15,
  },
});

export default Students;
