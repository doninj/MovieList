import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {loginStore} from '../Store'
import config from '../config'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

 const SignInScreen = (props) => {
	const isFocused = useIsFocused();

	const [Refresh, setRefresh] = React.useState(false);
	const [error, seterror] = React.useState(false);
	React.useEffect(() => {
		setRefresh(!Refresh)
}, [isFocused]);
	 
	 React.useEffect(() => {
		loginStore.getData()
}, []);

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
		console.log(r.data)
		loginStore.user.account_id= r.data.id;
		loginStore.isSignedInTrue()
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
	.catch(function (err) {console.log(err)
		seterror(true)
	}
	)}
const DisplayError = () =>{
	return error ? <Text> Mot de passe ou indentifiant incorrect</Text> : null
}
const CreateNewSession = async (reqToken) => {
	return await axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${ config.API_KEY }`, {
			request_token: reqToken
	}).then(function (r) {
		console.log(r),
		loginStore.user.session_id= r.data.session_id
		console.log(loginStore.user.session_id)
		GetUserAccount(loginStore.user.session_id)
	})
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
			<View>{DisplayError()}</View>
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
