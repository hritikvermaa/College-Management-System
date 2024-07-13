import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Appbar } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

const Header = ({ navigation }) => {
  return (
    <View>
    <Appbar.Header>
      <Appbar.Content title="CMS" />
      <TouchableOpacity>
      <Avatar.Image size={24} source={"../../Assests/usericon.png"} className="w-[50px] h-[50px] rounded-full" />
      </TouchableOpacity>
     
    </Appbar.Header>
    </View>
  )
}

export default Header



