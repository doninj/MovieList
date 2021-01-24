import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {loginStore} from '../Store'
import config from '../config'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
 const SignInScreen = (props) => {
	
	const [Refresh, setRefresh] = React.useState(false);
	 React.useEffect(() => {
		 setTimeout(() => {
			 setRefresh(!Refresh);
		 }, 100);
	 }, [Refresh]);
	
	 
	 React.useEffect(() => {
		getData()
}, []);

	 const getData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem('name')
			console.log(`${jsonValue}`);
			 jsonValue != null ? loginStore.user=JSON.parse(jsonValue) : null;
			console.log(loginStore.user)
		} catch(e) {
			console.log(e)
		}
	}
const GetRequestToken =() => {
	 axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${ config.API_KEY }`)
	 .then(
		 function (r) {	loginStore.user.reqToken = r.data.request_token
		console.log(loginStore.user.reqToken) })
	 .catch(err=>console.log(err))
}
const GetUserAccount = async (sessionId) => {
	await axios.get(`https://api.themoviedb.org/3/account?api_key=${ config.API_KEY }&session_id=${ sessionId }`)
	.then(function (r) {
		console.log(r)
		loginStore.isSignedInTrue()
		console.log("login "+loginStore.user.isSignedIn)
		storeData()
	})
	.catch(err=>console.log(err.status_message))
}
const ValidateAuthentication = async (reqToken, username, password) => {
	return await axios.post(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${ config.API_KEY }`, {
			request_token: reqToken,
			username: username,
			password: password
	}).then(function (r) {
		console.log(r), 
		 CreateNewSession(reqToken)}
	)
	.catch(err=>console.log(err))
}
const CreateNewSession = async (reqToken) => {
	return await axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${ config.API_KEY }`, {
			request_token: reqToken
	}).then(function (r) {
		console.log(r),
		loginStore.user.session_id= r.data.session_id
		console.log(loginStore.user.session_id)
		storeData()
		GetUserAccount(loginStore.user.session_id)
	})
}
const storeData = async () => {
	try {
		await AsyncStorage.setItem('name', JSON.stringify(loginStore.user))
		console.log("mis en sauvegarde")
		console.log((loginStore.user))
	} catch (e) {
		console.log(e)  
	}
}
const SignIn = async () => {
		await GetRequestToken()
		await ValidateAuthentication(loginStore.user.reqToken,loginStore.user.username,loginStore.user.password)
		
}
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput placeholder="username" style={styles.input} onChangeText={(value) =>(loginStore.user.username=value)} />
      <TextInput placeholder="password" style={styles.input} onChangeText={(value) => (loginStore.user.password=value)} />
      <TouchableOpacity
        onPress={() => SignIn()}
        style={{ ...styles.input, backgroundColor: 'skyblue', borderWidth: 0 }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 8,
    marginVertical: 3,
    // marginHorizontal: 10,
    width: '95%',
  },
});

export {SignInScreen}
