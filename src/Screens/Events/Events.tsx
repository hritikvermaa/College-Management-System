import { StyleSheet, Text, View, ScrollView, Platform } from 'react-native';
import React, { useState } from 'react';
import { Input, Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import { firestore } from '../../Components/firebaseconfig'; // Adjust the import path according to your project structure


import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Events = ({ navigation }: HomeProps) => {
  const [fromDateTime, setFromDateTime] = useState(new Date());
  const [toDateTime, setToDateTime] = useState(new Date());
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);

  const validateSchema = Yup.object().shape({
    eventName: Yup.string().required('Event Name is required'),
    description: Yup.string().required('Description is required'),
  });

  const handleFormSubmit = async (values) => {
    try {
      await firestore().collection('events').add({
        eventName: values.eventName,
        description: values.description,
        fromDateTime: fromDateTime.toISOString(),
        toDateTime: toDateTime.toISOString(),
      });
      console.log('Event added successfully:', { ...values, fromDateTime, toDateTime });
      navigation.navigate("Tab");
      // Optionally, you can add navigation logic here or clear the form
    } catch (error) {
      console.error('Error adding event:', error);
      // Handle error state or display an error message
    }
  };

  const onChangeFrom = (event, selectedDate) => {
    const currentDate = selectedDate || fromDateTime;
    setShowFromDatePicker(false);
    setFromDateTime(currentDate);
  };

  const onChangeTo = (event, selectedDate) => {
    const currentDate = selectedDate || toDateTime;
    setShowToDatePicker(false);
    setToDateTime(currentDate);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Event</Text>
      </View>
      <Formik
        initialValues={{ eventName: '', description: '' }}
        validationSchema={validateSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <Input
              placeholder="Event Name"
              onChangeText={handleChange('eventName')}
              onBlur={handleBlur('eventName')}
              value={values.eventName}
              errorMessage={touched.eventName && errors.eventName ? errors.eventName : ''}
            />
            <Input
              placeholder="Description"
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              errorMessage={touched.description && errors.description ? errors.description : ''}
              multiline
              numberOfLines={4}
            />
            <View style={styles.dateTimePicker}>
              <Text style={styles.dateTimeText}>From Date: {fromDateTime.toDateString()}</Text>
              <Button title="Pick Date" onPress={() => setShowFromDatePicker(true)} />
              {showFromDatePicker && (
                <DateTimePicker
                  testID="fromDateTimePicker"
                  value={fromDateTime}
                  mode="datetime"
                  is24Hour={true}
                  display="default"
                  onChange={onChangeFrom}
                />
              )}
            </View>
            <View style={styles.dateTimePicker}>
              <Text style={styles.dateTimeText}>To Date: {toDateTime.toDateString()}</Text>
              <Button title="Pick Date" onPress={() => setShowToDatePicker(true)} />
              {showToDatePicker && (
                <DateTimePicker
                  testID="toDateTimePicker"
                  value={toDateTime}
                  mode="datetime"
                  is24Hour={true}
                  display="default"
                  onChange={onChangeTo}
                />
              )}
            </View>
            <Button
              title="Add Event"
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
  dateTimePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  dateTimeText: {
    fontSize: 16,
  },
});

export default Events;
