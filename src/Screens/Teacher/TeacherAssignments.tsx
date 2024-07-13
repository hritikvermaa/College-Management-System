import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Modal, StyleSheet,Image } from 'react-native';
import { Card, Button, TextInput } from 'react-native-paper';
import { firestore,auth } from '../../Components/firebaseconfig'; // Adjust the import path as needed

interface Assignment {
  id: string;
  subject: string;
  title: string;
  teacher: string;
  topic: string;
  marks: number;
  studentStatus: { [key: string]: boolean };
}

const TeacherAssignments: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    subject: '',
    title: '',
    teacher: '',
    topic: '',
    marks: '',
  });

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const snapshot = await firestore().collection('assignments').get();
        const assignmentsData: Assignment[] = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          const assignment: Assignment = {
            id: doc.id,
            subject: data.subject || '',
            title: data.title || '',
            teacher: data.teacher || '',
            topic: data.topic || '',
            marks: data.marks || 0,
            studentStatus: data.studentStatus || {}, // Initialize studentStatus object
          };
          assignmentsData.push(assignment);
        });
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

  const handleInputChange = (name: string, value: string) => {
    setNewAssignment(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await firestore().collection('assignments').add({
        ...newAssignment,
        marks: Number(newAssignment.marks),
        studentStatus: {}, // Initialize empty status object
      });
      setIsModalVisible(false);
      setNewAssignment({
        subject: '',
        title: '',
        teacher: '',
        topic: '',
        marks: '',
      });
      // Fetch assignments again to update the list
      fetchAssignments();
    } catch (error) {
      console.error('Error saving assignment:', error);
    }
  };

  const toggleStudentStatus = async (assignmentId: string, studentId: string, currentStatus: boolean) => {
    try {
      // Toggle the student status in Firestore
      await firestore().collection('assignments').doc(assignmentId).update({
        [`studentStatus.${studentId}`]: !currentStatus,
      });

      // Update local state after updating Firestore
      setAssignments(prevAssignments =>
        prevAssignments.map(assignment =>
          assignment.id === assignmentId
            ? {
                ...assignment,
                studentStatus: {
                  ...assignment.studentStatus,
                  [studentId]: !currentStatus,
                },
              }
            : assignment
        )
      );
    } catch (error) {
      console.error('Error toggling student status:', error);
    }
  };

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
      <Text className='text-center text-2xl text-blue-400 font-bold'>Assignments</Text>
      {assignments.map(assignment => (
        <Card key={assignment.id} style={styles.card}>
          <Card.Title title={assignment.title} subtitle={`Subject: ${assignment.subject}`} />
          <Card.Content>
            <Text>Teacher: {assignment.teacher}</Text>
            <Text>Topic: {assignment.topic}</Text>
            <Text>Marks: {assignment.marks}</Text>
            {/* Display student status */}
            <View style={styles.studentStatusContainer}>
              <Text>Student Status:</Text>
              {Object.keys(assignment.studentStatus).map(studentId => (
                <Text key={studentId}>
                  Student ID: {studentId}, Status: {assignment.studentStatus[studentId] ? 'Submitted' : 'Not Submitted'}
                </Text>
              ))}
            </View>
            {/* Toggle status button */}
            <Button onPress={() => toggleStudentStatus(assignment.id, 'studentId1', false)}>
              Toggle Student Status
            </Button>
          </Card.Content>
        </Card>
      ))}
      <Button onPress={() => setIsModalVisible(true)}>Add Assignment</Button>

      {/* Modal for adding a new assignment */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              label="Subject"
              value={newAssignment.subject}
              onChangeText={text => handleInputChange('subject', text)}
              style={styles.input}
            />
            <TextInput
              label="Title"
              value={newAssignment.title}
              onChangeText={text => handleInputChange('title', text)}
              style={styles.input}
            />
            <TextInput
              label="Teacher"
              value={newAssignment.teacher}
              onChangeText={text => handleInputChange('teacher', text)}
              style={styles.input}
            />
            <TextInput
              label="Topic"
              value={newAssignment.topic}
              onChangeText={text => handleInputChange('topic', text)}
              style={styles.input}
            />
            <TextInput
              label="Marks"
              value={newAssignment.marks}
              onChangeText={text => handleInputChange('marks', text)}
              keyboardType="numeric"
              style={styles.input}
            />
            <Button onPress={handleSubmit}>Save Assignment</Button>
            <Button onPress={() => setIsModalVisible(false)}>Cancel</Button>
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
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  card: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    marginBottom: 10,
  },
  studentStatusContainer: {
    marginTop: 10,
  },
});

export default TeacherAssignments;
