import React, {useState} from 'react';
import { StyleSheet, Text, View,ScrollView, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import config from './config'
import axios from 'axios';
import { loginStore } from './Store';

const List = (props) => {

    const [list, setList] = useState([])
		const [Refresh, setRefresh] = React.useState(false);

		React.useEffect(() => {
			setTimeout(() => {
				setRefresh(!Refresh);
			}, 100);
		}, [Refresh]);
		React.useEffect(() => {
			axios.get(`${config.URL_BACK}movie/${filter}?api_key=${config.API_KEY}`)
			.then(r => loginStore.list= r.data.results)
			.catch(e => console.log(e))
		}, [loginStore.list]);
    const [modalFilmOpen, setModalFilmOpen] = useState(false)
    const [filmModal, setFilmModal] = useState({})
		const [listFilm, setlistFilm] = useState({});
		const [filter, setFilter] = useState("popular")
	
    const openModal = (item) => {
        setFilmModal(item);
        setModalFilmOpen(true);
    }

    const closeModal = () => {
        setFilmModal({});
        setModalFilmOpen(false);
    }

    return (
        <ScrollView>

            <Picker
                selectedValue={filter}
                style={{height: 50}}
                onValueChange={ (itemValue, itemIndex) => { setFilter(itemValue) } }
            >
                <Picker.Item label="Les plus populaires" value="popular" />
                <Picker.Item label="Les mieux notées" value="top_rated" />
                <Picker.Item label="Les dernières sorties" value="now_playing" />
            </Picker>


            <Modal visible={modalFilmOpen} animationType='slide' transparent={true}>
                <View style={styles.modal}>
                    <Text style={[styles.titreModal, { marginBottom: 20 }]}>{filmModal.title}  </Text>
                    <Text style={{fontSize:15, marginBottom:15}}>{filmModal.synopsis}  </Text>
                    <Text style={{fontSize:15, marginBottom:15}}>Acteurs : {filmModal.actor}  </Text>
                    <Text style={{fontSize:15}}>Note : {filmModal.vote_average}</Text>
                    <TouchableOpacity
                        onPress={() => closeModal()}
                        style={styles.buttonClose}
                    >
                        <Text style={{fontSize: 15}}>Fermer</Text>
                    </TouchableOpacity>
                </View>
            </Modal>


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
                                    style={{ width: 67, height: 100, resizeMode: 'contain' }}
                                />
                                <View style={{width:'68%', marginLeft:10, padding:5}}>
                                    <Text numberOfLines={1} style={{fontWeight: 'bold',fontSize:15, marginBottom:5}}>{item.original_title}</Text>
                                    <Text numberOfLines={2} style={{fontSize:15, marginBottom:5}}>{item.overview}</Text>
                                    <Text style={{fontSize:15}}>Note : {item.vote_average}</Text>
                                </View>
                                <TouchableOpacity
                                    style={{height:35, marginTop:30}}
                                    onPress={() => {}}
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
        backgroundColor: "lightgrey",
        borderRadius: 12,
        padding: 10,
        marginTop: 20,
    },
    modal: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 12,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4
    }
});

export { List };

