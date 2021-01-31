import React, {useState} from 'react';
import { StyleSheet, Text, View,ScrollView, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import config from './config'
import axios from 'axios';
import { loginStore } from './Store';
import { useIsFocused } from '@react-navigation/native';
import ProgressCircle from 'react-native-progress-circle'
import { NavigationContainer } from '@react-navigation/native';


const List = (props,{navigation}) => {

    const [list, setList] = useState([])
		const [Refresh, setRefresh] = React.useState(false);
		const isFocused = useIsFocused();
		const [modalFilmOpen, setModalFilmOpen] = useState(false)
    const [filmModal, setFilmModal] = useState({})
		const [listFilm, setlistFilm] = useState({});
		const [filter, setFilter] = useState("popular")
		const [filter2, setFilter2] = useState("movie")
		const [actor, setactor] = useState([]);
	
		React.useEffect(() => {
			axios.get(`${config.URL_BACK}${filter2}/${filter}?api_key=${config.API_KEY}&language=fr-FR`)
			.then(r => loginStore.list= r.data.results)
			.catch(e => console.log(e))
		}, [loginStore.list,filter2,filter,actor]);

		React.useEffect(() => {
			setTimeout(() => {
				setRefresh(!Refresh);
			}, 100);
		}, [Refresh,actor]);

    const openModal = (item) => {
				/* axios.get(`https://api.themoviedb.org/3/movie/550/credits?api_key=a30ed87e9e7dd302b15f16dfd11d7aa7&language=en-US`)
				.then(function (r){ for (let index = 0; index < array.length; index++) {
					const element = array[index];
				})
				.catch(e=> console.log(e)) */
        setFilmModal(item);
				setModalFilmOpen(true);
				
    }

    const closeModal = () => {
        setFilmModal({});
        setModalFilmOpen(false);
		}
		const ProgressBar = (item_vote)=>{
			if(item_vote <=5) {
				return (
					<ProgressCircle
				percent={item_vote*10}
				radius={50}
				borderWidth={8}
				color="red"
				shadowColor="#999"
				bgColor="#fff"
		>
				<Text style={{fontSize:20}}> {item_vote}/10</Text>
		</ProgressCircle>)
			}
			else if (item_vote>5 && item_vote<7 ) {
				return (
				<ProgressCircle
			percent={item_vote*10}
			radius={50}
			borderWidth={8}
			color="orange"
			shadowColor="#999"
			bgColor="#fff"
	>
			<Text style={{fontSize:20}}> {item_vote}/10</Text>
	</ProgressCircle>)
			}
			else if (item_vote>=7){
				return (
					<ProgressCircle
				percent={item_vote*10}
				radius={50}
				borderWidth={8}
				color="green"
				shadowColor="#999"
				bgColor="#fff"
		>
				<Text style={{fontSize:20}}> {item_vote}/10</Text>
		</ProgressCircle>)
			}
		} 
			const favorite = (item_id,media_type)=> {
			axios.post(`${config.URL_BACK}account/${loginStore.user.account_id}/favorite?api_key=${config.API_KEY}&session_id=${loginStore.user.session_id}`,{
				"media_type":media_type,
				"media_id": item_id,
  			"favorite": true
			}).then(r => console.log(r))
			.catch(e => console.log(e))
			}
			const containsId =(item_id) =>
			{
			axios.get(`https://api.themoviedb.org/3/account/${loginStore.user.account_id}/favorite/movies?api_key=${config.API_KEY}&session_id=${loginStore.user.session_id}&language=fr-FR&sort_by=created_at.asc&page=1`)
			.then(function (r){
			console.log(r.data.results)
			})
			}

    return (
        <ScrollView>

					{filter2=="tv"  ? (
            <Picker
                selectedValue={filter}
                style={{height: 50}}
                onValueChange={ (itemValue, itemIndex) => { setFilter(itemValue) } }
            >
							
                <Picker.Item label="Les plus populaires" value="popular" />
                <Picker.Item label="Les mieux notées" value="top_rated" />
                <Picker.Item label="Actuellement diffusées" value="on_the_air" />
            </Picker>
					):(<Picker
						selectedValue={filter}
						style={{height: 50}}
						onValueChange={ (itemValue, itemIndex) => { setFilter(itemValue) } }
				>
					
						<Picker.Item label="Les plus populaires" value="popular" />
						<Picker.Item label="Les mieux notées" value="top_rated" />
						<Picker.Item label="Les dernières sorties" value="now_playing" />
				</Picker>)}

            <Picker
                selectedValue={filter2}
                style={{height: 50}}
                onValueChange={ (itemValue, itemIndex) => { setFilter2(itemValue) } }
            >
                <Picker.Item label="Films" value="movie" />
                <Picker.Item label="TV" value="tv" />
            </Picker>

            <Modal visible={modalFilmOpen} animationType='slide' transparent={true}>
                <View style={styles.modal}>
										<Image
											source={{uri:`https://image.tmdb.org/t/p/original/${ filmModal.backdrop_path}`}}
											style={{ width: 1000, height: 200, overflow: 'hidden', borderRadius: 25,resizeMode: 'contain' }}/>

{filter2=="tv"  ? (
                                <Text  style={{fontWeight: 'bold',fontSize:15, marginBottom:5}}>  {filmModal.name}  </Text>
																):(<Text  style={{fontWeight: 'bold',fontSize:15, marginBottom:5}}>  {filmModal.original_title}  </Text> )}
                    <Text style={{fontSize:15, marginLeft:10, marginBottom:15}}>{filmModal.overview}  </Text>
                   {/*  <Text style={{fontSize:15, marginBottom:15}}>Acteurs : {actor.forEach(element => {
										 console.log(element.name)
										})}  </Text> */}
									{ ProgressBar(filmModal.vote_average)}
                    <TouchableOpacity
                        onPress={() => closeModal()}
                        style={styles.buttonClose}
                    >
                        <Text style={{fontSize: 15,color:"white"}}>Fermer</Text>
                    </TouchableOpacity>
                </View>
            </Modal>


						{console.log(loginStore.list)}
            <FlatList
                data={loginStore.list}
                renderItem={({ item }) => {
                    return (
											<TouchableOpacity
											style={styles.boxeFilm}
											onPress={() => openModal(item)}
											>
                            <View style={{flexDirection:'row'}}>
                                <Image
                                    source={{uri:`https://image.tmdb.org/t/p/original/${ item.poster_path}`}}
                                    style={{ width: 67, height: 150 }}
                                />

                                <View style={{width:'68%', marginLeft:10, padding:5}}>
																{filter2=="tv"  ? (
                                    <Text numberOfLines={1} style={{fontWeight: 'bold',fontSize:15, marginBottom:5}}>{item.name}</Text>
																):(<Text numberOfLines={1} style={{fontWeight: 'bold',fontSize:15, marginBottom:5}}>{item.original_title}</Text> )}
																{filter2=="tv"  ? (
																  <Text numberOfLines={1} style={{fontWeight: 'bold',fontSize:15, marginBottom:5}}>{item.first_air_date}</Text>):(
																		<Text numberOfLines={1} style={{fontWeight: 'bold',fontSize:15, marginBottom:5}}>{item.release_date}</Text>
																	)}

                                    <Text numberOfLines={2} style={{fontSize:15, marginBottom:5}}>{item.overview}</Text>
                                    <Text style={{fontSize:15}}>Note : {item.vote_average}</Text>
                                </View>
                                <TouchableOpacity
                                    style={{height:35, marginTop:30}}
                                    onPress={() => {favorite(item.id,filter2)}}
                                >
																<Ionicons name="heart-outline" size={35} color="black" />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={item => item.id.toString()}
            />


        </ScrollView>
    );
}

const styles = StyleSheet.create({
    boxeFilm: {
        borderWidth: 1,
        marginBottom: 15,
        borderRadius: 5,
    },
    titreModal: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    buttonClose: {
        backgroundColor: "#db0000",
				borderRadius: 12,
				width:100,
        padding: 10,
				marginTop: 20,
				alignItems: "center",
				marginBottom:20,

    },
    modal: {
        margin: 29,
        backgroundColor: "white",
        borderRadius: 12,
        padding: 0,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10
    }
});

export { List };

