import React, {useState} from 'react';
import {StyleSheet,Text,ScrollView,	View,FlatList,TouchableOpacity,Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {loginStore} from './Store';
import axios from 'axios';
import config from './config'
import { useIsFocused } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const  SecondScreen = (props,{navigation}) => {
return (
	<View>
		<Text>Salut</Text>
	</View>
)
}
export {
	SecondScreen
};