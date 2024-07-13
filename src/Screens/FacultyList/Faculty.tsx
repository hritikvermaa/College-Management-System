import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { firestore } from '../../Components/firebaseconfig'; // Adjust the import path according to your project structure


import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Faculty = ({ navigation }: HomeProps) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    department: Yup.string().required('Department is required'),
    subject: Yup.string().required('Subject is required'),
  });

  const handleFormSubmit = async (values) => {
    try {
      await firestore().collection('teachers').add({
        name: values.name,
        email: values.email,
        department: values.department,
        subject: values.subject,
      });
      console.log('Teacher added successfully:', values);
      navigation.navigate("Tab");
      // Optionally, you can add navigation logic here or clear the form
    } catch (error) {
      console.error('Error adding teacher:', error);
      // Handle error state or display an error message
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Teacher</Text>
      </View>
      <Formik
        initialValues={{ name: '', email: '', department: '', subject: '' }}
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
              placeholder="Subject"
              onChangeText={handleChange('subject')}
              onBlur={handleBlur('subject')}
              value={values.subject}
              errorMessage={touched.subject && errors.subject ? errors.subject : ''}
            />
            <Button
              title="Add Teacher"
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

export default Faculty;