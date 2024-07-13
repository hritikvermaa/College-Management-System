import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Switch, StyleSheet,Image } from 'react-native';
import { Button, Card, Provider, Portal, Modal } from 'react-native-paper';
import { auth, firestore } from '../../Components/firebaseconfig'; // Adjust the import path according to your project structure

// Interface for assignment
interface Assignment {
  id: string;
  subject: string;
  title: string;
  status: boolean; // true for marked, false for unmarked
}

const StudentAssignment = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const querySnapshot = await firestore().collection('assignments').get();
        const assignmentsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          status: doc.data().status || false, // Initialize status as false if not present
        })) as Assignment[];
        setAssignments(assignmentsData);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    fetchAssignments();
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
  const toggleAssignmentStatus = async (assignmentId: string, currentStatus: boolean) => {
    try {
      await firestore().collection('assignments').doc(assignmentId).update({
        status: !currentStatus, // Toggle the status
      });

      // Update local state after updating Firestore
      setAssignments(prevAssignments =>
        prevAssignments.map(assignment =>
          assignment.id === assignmentId ? { ...assignment, status: !currentStatus } : assignment
        )
      );
    } catch (error) {
      console.error('Error toggling assignment status:', error);
    }
  };

  const openModal = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Provider>
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
      <Text className='text-center text-2xl text-blue-400 font-bold'>My Assignments</Text>
      <ScrollView contentContainerStyle={styles.container}>
        {assignments.map(assignment => (
          <Card key={assignment.id} style={styles.card}>
            <Card.Content>
              <Text style={styles.title}>{assignment.title}</Text>
              <Text style={styles.subject}>{assignment.subject}</Text>
              <View style={styles.switchContainer}>
                <Text>Marked</Text>
                <Switch
                  value={assignment.status}
                  onValueChange={() => toggleAssignmentStatus(assignment.id, assignment.status)}
                />
              </View>
              <Button onPress={() => openModal(assignment)}>Details</Button>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      <Portal>
        <Modal visible={modalVisible} onDismiss={closeModal} contentContainerStyle={styles.modal}>
          <Text>Assignment Details:</Text>
          <Text>Title: {selectedAssignment?.title}</Text>
          <Text>Subject: {selectedAssignment?.subject}</Text>
          <Text>Status: {selectedAssignment?.status ? 'Marked' : 'Unmarked'}</Text>
        </Modal>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  card: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subject: {
    fontSize: 16,
    color: '#555',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 50,
    borderRadius: 10,
  },
});

export default StudentAssignment;
