// src/screens/TeacherDashboard.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth } from '../../Components/firebaseconfig';

interface User {
  id: string;
  name: string;
}

interface Notice {
  id: string;
  title: string;
  description: string;
  date: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  fromDateTime: string;
  toDateTime: string;
}

const TeacherDashboard: React.FC = () => {
  const [teacherCount, setTeacherCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [noticeCount, setNoticeCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);

  const [teachers, setTeachers] = useState<User[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  const [isTeacherModalVisible, setIsTeacherModalVisible] = useState(false);
  const [isStudentModalVisible, setIsStudentModalVisible] = useState(false);
  const [isNoticeModalVisible, setIsNoticeModalVisible] = useState(false);
  const [isEventModalVisible, setIsEventModalVisible] = useState(false);

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
    const fetchCounts = async () => {
      try {
        const teachersSnapshot = await firestore().collection('teachers').get();
        setTeacherCount(teachersSnapshot.size);
        setTeachers(teachersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User)));

        const studentsSnapshot = await firestore().collection('students').get();
        setStudentCount(studentsSnapshot.size);
        setStudents(studentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User)));

        const noticesSnapshot = await firestore().collection('notices').get();
        setNoticeCount(noticesSnapshot.size);
        setNotices(noticesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notice)));

        const eventsSnapshot = await firestore().collection('events').get();
        setEventCount(eventsSnapshot.size);
        setEvents(eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event)));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
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
        <Card style={styles.card}>
          <TouchableOpacity onPress={() => setIsTeacherModalVisible(true)}>
            <Card.Content style={styles.cardContent}>
              <Icon name="school" size={40} color="#007bff" />
              <View style={styles.textContainer}>
                <Title style={styles.cardTitle}>Total Teachers</Title>
                <Paragraph style={styles.cardParagraph}>{teacherCount}</Paragraph>
              </View>
            </Card.Content>
          </TouchableOpacity>
        </Card>
        <Card style={styles.card}>
          <TouchableOpacity onPress={() => setIsStudentModalVisible(true)}>
            <Card.Content style={styles.cardContent}>
              <Icon name="account-group" size={40} color="#28a745" />
              <View style={styles.textContainer}>
                <Title style={styles.cardTitle}>Total Students</Title>
                <Paragraph style={styles.cardParagraph}>{studentCount}</Paragraph>
              </View>
            </Card.Content>
          </TouchableOpacity>
        </Card>
        <Card style={styles.card}>
          <TouchableOpacity onPress={() => setIsNoticeModalVisible(true)}>
            <Card.Content style={styles.cardContent}>
              <Icon name="clipboard-text" size={40} color="#ff5733" />
              <View style={styles.textContainer}>
                <Title style={styles.cardTitle}>Total Notices</Title>
                <Paragraph style={styles.cardParagraph}>{noticeCount}</Paragraph>
              </View>
            </Card.Content>
          </TouchableOpacity>
        </Card>
        <Card style={styles.card}>
          <TouchableOpacity onPress={() => setIsEventModalVisible(true)}>
            <Card.Content style={styles.cardContent}>
              <Icon name="calendar" size={40} color="#ffc107" />
              <View style={styles.textContainer}>
                <Title style={styles.cardTitle}>Total Events</Title>
                <Paragraph style={styles.cardParagraph}>{eventCount}</Paragraph>
              </View>
            </Card.Content>
          </TouchableOpacity>
        </Card>
      </View>
      <Modal
        visible={isTeacherModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsTeacherModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Text className="text-2xl text-center text-black font-bold">Teacher List</Text>
            <ScrollView>
              {teachers.map(teacher => (
                <Card key={teacher.id} style={styles.modalCard}>
                  <Card.Title title={teacher.name} />
                </Card>
              ))}
            </ScrollView>
            <Button onPress={() => setIsTeacherModalVisible(false)}>Close</Button>
          </View>
        </View>
      </Modal>
      <Modal
        visible={isStudentModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsStudentModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Text className="text-2xl text-center text-black font-bold">Student List</Text>
            <ScrollView>
              {students.map(student => (
                <Card key={student.id} style={styles.modalCard}>
                  <Card.Title title={student.name} />
                </Card>
              ))}
            </ScrollView>
            <Button onPress={() => setIsStudentModalVisible(false)}>Close</Button>
          </View>
        </View>
      </Modal>
      <Modal
        visible={isNoticeModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsNoticeModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Text className="text-2xl text-center text-black font-bold">Notices</Text>
            <ScrollView>
              {notices.map(notice => (
                <Card key={notice.id} style={styles.modalCard}>
                 
                  <Card.Title title={notice.title} />
                  <Card.Content>
                    <Paragraph>Description :{notice.description}</Paragraph>
                    <Paragraph>Date :{notice.date.slice(0,10)}</Paragraph>
                  </Card.Content>
                </Card>
              ))}
            </ScrollView>
            <Button onPress={() => setIsNoticeModalVisible(false)}>Close</Button>
          </View>
        </View>
      </Modal>
      <Modal
        visible={isEventModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsEventModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Text className="text-2xl text-center text-black font-bold">Events</Text>
            <ScrollView>
              {events.map(event => (
                <Card key={event.id} style={styles.modalCard}>
                  <Card.Title title={event.title} />
                  <Card.Content>
                    <Paragraph>Description: {event.description}</Paragraph>
                    <Paragraph>From Date: {event.fromDateTime.slice(0,10)}</Paragraph>
                    <Paragraph>To Date: {event.toDateTime.slice(0,10)}</Paragraph>
                  </Card.Content>
                </Card>
              ))}
            </ScrollView>
            <Button onPress={() => setIsEventModalVisible(false)}>Close</Button>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '90%',
    marginBottom: 20,
    height: 150,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
  },
  textContainer: {
    marginLeft: 20,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
  },
  cardParagraph: {
    fontSize: 20,
    fontWeight: 'bold',
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
  modalCard: {
    marginBottom: 20,
  },
});

export default TeacherDashboard;
