import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Input, Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import { firestore } from '../../Components/firebaseconfig'; // Adjust the import path according to your project structure

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;


const Notice = ({ navigation }: HomeProps) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const validateSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  });

  const handleFormSubmit = async (values) => {
    try {
      await firestore().collection('notices').add({
        title: values.title,
        description: values.description,
        date: date.toISOString(), // Save date as ISO string
      });
      console.log('Notice added successfully:', { ...values, date });
      navigation.navigate("Tab");
      // Optionally, you can add navigation logic here or clear the form
    } catch (error) {
      console.error('Error adding notice:', error);
      // Handle error state or display an error message
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Notice</Text>
      </View>
      <Formik
        initialValues={{ title: '', description: '' }}
        validationSchema={validateSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <Input
              placeholder="Title"
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
              errorMessage={touched.title && errors.title ? errors.title : ''}
            />
            <Input
              placeholder="Description"
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              errorMessage={touched.description && errors.description ? errors.description : ''}
            />
            <View style={styles.datePicker}>
              <Text style={styles.dateText}>Date: {date.toDateString()}</Text>
              <Button title="Pick Date" onPress={() => setShowDatePicker(true)} />
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>

            <Button
              title="Add Notice"
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
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  dateText: {
    fontSize: 16,
  },
});

export default Notice;
