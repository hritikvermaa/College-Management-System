// src/screens/StudentDashboard.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth } from '../../Components/firebaseconfig';

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

const StudentDashboard: React.FC = () => {
  const [noticeCount, setNoticeCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isNoticeModalVisible, setIsNoticeModalVisible] = useState(false);
  const [isEventModalVisible, setIsEventModalVisible] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const noticesSnapshot = await firestore().collection('notices').get();
        const noticesData = noticesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Notice[];
        setNotices(noticesData);
        setNoticeCount(noticesSnapshot.size);
      } catch (error) {
        console.error("Error fetching notices: ", error);
      }
    };

    const fetchEvents = async () => {
      try {
        const eventsSnapshot = await firestore().collection('events').get();
        const eventsData = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Event[];
        setEvents(eventsData);
        setEventCount(eventsSnapshot.size);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchNotices();
    fetchEvents();
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

  return (
    <View style={styles.container} className="justify-start items-start w-[100%] h-[100vh]">
      <View style={styles.header} className="w-[100%] h-[20vh] flex-row items-center justify-between">
        <View className="flex-row justify-start items-center">
          <Image
            resizeMode="contain" className='w-[40px] h-[40px]'
            source={{
              uri: 'https://www.cusat.ac.in/files/pictures/pictures_1_logo.png',
            }}
          />
          <Text className="text-rose-600 text-2xl text-left font-bold ml-4">Cusat</Text>
        </View>
        <Text style={styles.headerText}>{userName}</Text>
      </View>
      <Card style={styles.card}>
        <TouchableOpacity onPress={() => setIsNoticeModalVisible(true)}>
          <Card.Content style={styles.cardContent}>
            <Icon name="clipboard-text" size={40} color="#007bff" />
            <Title style={styles.cardTitle}>Total Notices</Title>
            <Paragraph style={styles.cardParagraph}>{noticeCount}</Paragraph>
          </Card.Content>
        </TouchableOpacity>
      </Card>
      <Card style={styles.card}>
        <TouchableOpacity onPress={() => setIsEventModalVisible(true)}>
          <Card.Content style={styles.cardContent}>
            <Icon name="calendar" size={40} color="#28a745" />
            <Title style={styles.cardTitle}>Total Events</Title>
            <Paragraph style={styles.cardParagraph}>{eventCount}</Paragraph>
          </Card.Content>
        </TouchableOpacity>
      </Card>
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
                    <Paragraph>Description : {notice.description}</Paragraph>
                    <Paragraph>Date : {notice.date.slice(0,10)}</Paragraph>
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
                    <Paragraph>Description : {event.description}</Paragraph>
                    <Paragraph>From Date : {event.fromDateTime.slice(0,10)}</Paragraph>
                    <Paragraph>To Date : {event.toDateTime.slice(0,10)}</Paragraph>
                  </Card.Content>
                </Card>
              ))}
            </ScrollView>
            <Button onPress={() => setIsEventModalVisible(false)}>Close</Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    paddingTop: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  card: {
    width: '90%',
    height: 200,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "center"
  },
  cardTitle: {
    fontSize: 20,
    marginLeft: 20,
  },
  cardParagraph: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10
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

export default StudentDashboard;
