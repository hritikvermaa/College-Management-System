import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image,ImageBackground} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { auth } from '../../Components/firebaseconfig'; // Adjust the import path according to your project structure
import { styled } from 'nativewind';

const loginimage = {uri: 'https://img.freepik.com/free-photo/abstract-textured-backgound_1258-30506.jpg?size=626&ext=jpg&ga=GA1.1.67623732.1708459641&semt=ais_user'};
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Login = ({ navigation }: HomeProps) => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      if (selectedValue === 'Admin') {
        navigation.navigate('Tab');
      } else if (selectedValue === 'Student') {
        navigation.navigate('StudentTab');
      }
      else if (selectedValue === 'Faculty') {
        navigation.navigate('TeacherTab');
      }
      else {
        setError('Please select a user type.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
    <ImageBackground source={loginimage} resizeMode="cover" style={styles.image}>
      <View className="w-full h-[40%] justify-center items-center">
        <Image style={styles.logo}
          source={{
            uri: 'https://www.cusat.ac.in/files/pictures/pictures_1_logo.png',
          }}
        />

      </View>
      <View style={styles.form}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select User Type" value="" />
            <Picker.Item label="Student" value="Student" />
            <Picker.Item label="Admin" value="Admin" />
            <Picker.Item label="Faculty" value="Faculty" />
          </Picker>
        </View>

        <TextInput
          mode="outlined"
          label="Email id"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate("Signup")}} className="bg-white rounded-xl py-2 w-[100%] border-blue-400 border-2  items-center">
          <Text className="text-blue-400 text-lg font-bold">Create a new user</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#fff"
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain"
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width:"100%",
    height:"100%"
  },
  form: {
    width: '100%',
    maxWidth: 400,
    padding:20,
    backgroundColor:"#fff",
    marginLeft:5,
    marginRight:5,
    borderRadius:20
    
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },
  picker: {
    height: 40,
    width: '100%',
    textAlign:"center",
    padding:10
  },
  input: {
    width: '100%',
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default Login;
