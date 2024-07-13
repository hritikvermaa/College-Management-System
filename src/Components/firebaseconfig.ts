// firebaseConfig.ts
import { initializeApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCnJYx0b-_6tRoiyvt4lLdUuPUsSnuyvm0",
  authDomain: "client-8d1fd.firebaseapp.com",
  projectId: "client-8d1fd",
  storageBucket: "client-8d1fd.appspot.com",
  messagingSenderId: "494666388368",
  appId: "1:494666388368:android:096d4c7f6ec311f8565915"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export initialized Auth and Firestore services
export { auth, firestore };
