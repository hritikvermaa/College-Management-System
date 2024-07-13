// RegisterScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet,TouchableOpacity,Text } from 'react-native';
import { auth, firestore } from '../../Components/firebaseconfig';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Signup = ({ navigation }: HomeProps) => {
    const [name, setName] = useState('');
    const [regNumber, setRegNumber] = useState('');
    const [designation, setDesignation] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const uid = userCredential.user.uid;

            await firestore().collection('users').doc(uid).set({
                name,
                regNumber,
                designation,
                email,
                phone,
            });

            console.log('User registered successfully');
            navigation.navigate('Tab');
        } catch (error) {
            console.error('Error registering user: ', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text className="text-black font-bold text-2xl text-center mb-20">Register User</Text>
            <View className="bg-white p-10 rounded-lg">
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Registration Number"
                value={regNumber}
                onChangeText={setRegNumber}
                style={styles.input}
            />
            <TextInput
                placeholder="Designation (admin/student/faculty)"
                value={designation}
                onChangeText={setDesignation}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
                style={styles.input}
                keyboardType="phone-pad"
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />
            <Button title="Register" onPress={handleRegister} />
            <TouchableOpacity onPress={()=>{navigation.navigate("Login")}} className="bg-white rounded-xl py-2 w-[100%] border-blue-400 border-2  items-center mt-10">
          <Text className="text-blue-400 text-lg font-bold">Have an account?</Text>
        </TouchableOpacity>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default Signup;
