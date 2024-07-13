import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Modal, StyleSheet, Image } from 'react-native';
import { Card, Button, TextInput } from 'react-native-paper';
import { firestore, auth } from '../../Components/firebaseconfig'; // Adjust the import path as needed
import { styled } from 'nativewind';

interface Event {
  id: string;
  title: string;
  description: string;
  fromDateTime: string;
  toDateTime: string;
}

interface Notice {
  id: string;
  title: string;
  description: string;
  date: string;
}

const AccountEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<Event | Notice | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsSnapshot = await firestore().collection('events').get();
        const eventsData = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Event[];
        setEvents(eventsData);

        const noticesSnapshot = await firestore().collection('notices').get();
        const noticesData = noticesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Notice[];
        setNotices(noticesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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
    if (currentItem) {
      setCurrentItem({ ...currentItem, [name]: value });
    }
  };

  const handleSave = async () => {
    if (currentItem) {
      try {
        const collection = currentItem.hasOwnProperty('fromDateTime') ? 'events' : 'notices';
        await firestore().collection(collection).doc(currentItem.id).set(currentItem);

        setIsModalVisible(false);
        setIsEditing(false);
        setCurrentItem(null);

        // Refresh data
        const fetchData = async () => {
          try {
            const eventsSnapshot = await firestore().collection('events').get();
            const eventsData = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Event[];
            setEvents(eventsData);

            const noticesSnapshot = await firestore().collection('notices').get();
            const noticesData = noticesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Notice[];
            setNotices(noticesData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };

        fetchData();
      } catch (error) {
        console.error('Error saving item:', error);
      }
    }
  };

  const handleDelete = async (id: string, collection: 'events' | 'notices') => {
    try {
      await firestore().collection(collection).doc(id).delete();
      setIsModalVisible(false);
      setCurrentItem(null);

      // Refresh data
      const fetchData = async () => {
        try {
          const eventsSnapshot = await firestore().collection('events').get();
          const eventsData = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Event[];
          setEvents(eventsData);

          const noticesSnapshot = await firestore().collection('notices').get();
          const noticesData = noticesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Notice[];
          setNotices(noticesData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleOpenModal = (item: Event | Notice) => {
    setCurrentItem(item);
    setIsModalVisible(true);
    setIsEditing(true);
  };

  const handleOpenDetailModal = (item: Event | Notice) => {
    setCurrentItem(item);
    setIsDetailModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          resizeMode="contain"
          className='w-[40px] h-[40px]'
          source={{
            uri: 'https://www.cusat.ac.in/files/pictures/pictures_1_logo.png',
          }}
        />
        <Text className="text-rose-600 text-2xl text-left font-bold ml-4">Cusat</Text>
        <Text style={styles.headerText}>{userName}</Text>
      </View>
      <Text className='text-center text-2xl text-green-600 font-bold'>Events And Notice</Text>
      <View className="bg-[#3FA2F6] p-5 rounded-lg mt-[10vh]">
        <Text style={styles.heading}>Events</Text>
        <ScrollView horizontal>
          {events.map(event => (
            <Card key={event.id} style={styles.card}>
              <Card.Title title={event.title} />
              <Card.Content>
                <Text>Description: {event.description}</Text>
                <Text>From: {event.fromDateTime.slice(0, 10)}</Text>
                <Text>To: {event.toDateTime.slice(0, 10)}</Text>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => handleOpenDetailModal(event)}>View</Button>
                <Button onPress={() => handleOpenModal(event)}>Edit</Button>
                <Button onPress={() => handleDelete(event.id, 'events')}>Delete</Button>
              </Card.Actions>
            </Card>
          ))}
        </ScrollView>

        <Text style={styles.heading}>Notices</Text>
        <ScrollView horizontal>
          {notices.map(notice => (
            <Card key={notice.id} style={styles.card}>
              <Card.Title title={notice.title} />
              <Card.Content>
                <Text>Description: {notice.description}</Text>
                <Text>Date: {notice.date.slice(0, 10)}</Text>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => handleOpenDetailModal(notice)}>View</Button>
                <Button onPress={() => handleOpenModal(notice)}>Edit</Button>
                <Button onPress={() => handleDelete(notice.id, 'notices')}>Delete</Button>
              </Card.Actions>
            </Card>
          ))}
        </ScrollView>
      </View>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {currentItem && (
              <>
                <TextInput
                  label="Title"
                  value={currentItem.title}
                  onChangeText={text => handleInputChange('title', text)}
                  style={styles.input}
                />
                <TextInput
                  label="Description"
                  value={currentItem.description}
                  onChangeText={text => handleInputChange('description', text)}
                  style={styles.input}
                />
                {currentItem.hasOwnProperty('fromDateTime') ? (
                  <>
                    <TextInput
                      label="From DateTime"
                      value={currentItem.fromDateTime}
                      onChangeText={text => handleInputChange('fromDateTime', text)}
                      style={styles.input}
                    />
                    <TextInput
                      label="To DateTime"
                      value={currentItem.toDateTime}
                      onChangeText={text => handleInputChange('toDateTime', text)}
                      style={styles.input}
                    />
                  </>
                ) : (
                  <TextInput
                    label="Date"
                    value={currentItem.date}
                    onChangeText={text => handleInputChange('date', text)}
                    style={styles.input}
                  />
                )}
                <Button onPress={handleSave}>Save</Button>
                <Button onPress={() => setIsModalVisible(false)}>Cancel</Button>
              </>
            )}
          </View>
        </View>
      </Modal>

      <Modal
        visible={isDetailModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsDetailModalVisible(false)}
      >
        <View style={styles.detailModalContainer}>
          <View style={styles.detailModalContent}>
            {currentItem && (
              <>
                <Text style={styles.detailTitle}>{currentItem.title}</Text>
                <Text style={styles.detailDescription}>{currentItem.description}</Text>
                {currentItem.hasOwnProperty('fromDateTime') ? (
                  <>
                    <Text style={styles.detailDate}>From: {currentItem.fromDateTime}</Text>
                    <Text style={styles.detailDate}>To: {currentItem.toDateTime}</Text>
                  </>
                ) : (
                  <Text style={styles.detailDate}>Date: {currentItem.date}</Text>
                )}
                <Button onPress={() => setIsDetailModalVisible(false)}>Close</Button>
              </>
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
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#fff",
    marginTop: 10,
  },
  card: {
    marginRight: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: 300,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 16,
    color: "#0F67B1",
    fontWeight: 'bold',
    position: "absolute",
    right: 10,
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
  detailModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  detailModalContent: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailDescription: {
    fontSize: 18,
    marginBottom: 10,
  },
  detailDate: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default AccountEvents;
