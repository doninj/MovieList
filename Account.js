import React, {useState} from 'react';
import {StyleSheet,Text,ScrollView,	View,FlatList,TouchableOpacity,Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {loginStore} from './Store';
import axios from 'axios';
import config from './config'
import { useIsFocused } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const Account = (props,navigation) => {
	const isFocused = useIsFocused();
	const [filter, setFilter] = useState("movies")


	React.useEffect(() => {
		GetUserAccount(loginStore.user.session_id)
		axios.get(`https://api.themoviedb.org/3/account/${loginStore.user.account_id}/favorite/${filter}?api_key=${config.API_KEY}&session_id=${loginStore.user.session_id}&language=fr-FR&sort_by=created_at.asc&page=1`)
	.then(function (r){
		setFav(r.data.results)
	})
  },[fav,filter,isFocused]);
	const [userDetails, setuserDetails] = useState([]);
	const [fav, setFav] = useState(undefined)
	const [Refresh, setRefresh] = React.useState(false);


	React.useEffect(() => {
		setTimeout(() => {
			setRefresh(!Refresh);
		}, 1000);

	}, [Refresh]);
	const GetUserAccount = async (sessionId) => {
		await axios.get(`https://api.themoviedb.org/3/account?api_key=${ config.API_KEY }&session_id=${ sessionId }`)
		.then(function (r) {
			setuserDetails(r.data)
		})
		.catch(err=>console.log(err.status_message))
	}
	
	return (
		<ScrollView>
				<View>
						<Text style={{ fontSize:30,textAlign:"center" }}>Nom : </Text>
						<Text style={{ fontSize:30,textAlign:"center" }}> {userDetails.username} </Text>
						<TouchableOpacity
								style={{backgroundColor:'#EA2027', borderRadius:5, padding:10}}
								onPress={() => loginStore.isSignedInFalse()}
						>
								<Text style={{fontSize: 15, color: 'white', textAlign: 'center'}}>Se déconnecter</Text>
						</TouchableOpacity>
				</View>
				<Text style={{borderTopColor: 'grey', borderTopWidth: 1, marginTop:'10%', fontSize:17, textAlign: 'center'}}>Mes favoris</Text>
				<Picker
                selectedValue={filter}
                style={{height: 50}}
                onValueChange={ (itemValue, itemIndex) => { setFilter(itemValue) } }
            >
                <Picker.Item label="Films favories" value="movies" />
                <Picker.Item label="Séries TV favorites" value="tv" />
            </Picker>
				<ScrollView>
				<FlatList
						data={fav}
						style={{marginTop:10}}
						renderItem={({ item }) => {
								return (
										<View style={{flexDirection:'row', borderWidth: 1, marginBottom: 15, borderRadius: 5}}>
												<View style={{width:'85%', marginLeft:10, padding:5}}>
												{filter=="tv"  ? (
														<Text numberOfLines={1} style={{fontWeight: 'bold',fontSize:15, marginBottom:5}}>{item.name}</Text>
												):(	<Text numberOfLines={1} style={{fontWeight: 'bold',fontSize:15, marginBottom:5}}>{item.original_title}</Text>)}
														<Text numberOfLines={2} style={{fontSize:15, marginBottom:5}}>{item.overview}</Text>
												</View>
												<TouchableOpacity
														style={{height:35, marginTop:20}}
														onPress={() => {}}
												>
														<Ionicons name="heart" size={35} color="black" />
												</TouchableOpacity>
										</View>
								)
						}}
						keyExtractor={item => item.id.toString()}
				/>
				</ScrollView>
		</ScrollView>
);
}

const styles = StyleSheet.create({

});

export {
	Account
};