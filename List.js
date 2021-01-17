import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Modal } from 'react-native';

const List = (props) => {

    const [list, setList] = useState([{'id': 1, 'titre': 'Les Simpsons', 'synopsis': 'Les Simpson, famille américaine moyenne, vivent à Springfield. Homer, le père, a deux passions : regarder la télé et boire des bières. Mais son quotidien est rarement reposant, entre son fils Bart qui fait toutes les bêtises possibles, sa fille Lisa qui est une surdouée, ou encore sa femme Marge qui ne supporte pas de le voir se soûler à longueur de journée.', 'rating': '78%'}, {'id': 2, 'titre': 'Les Simpsons', 'synopsis': 'Les Simpson, famille américaine moyenne, vivent à Springfield. Homer, le père, a deux passions : regarder la télé et boire des bières. Mais son quotidien est rarement reposant, entre son fils Bart qui fait toutes les bêtises possibles, sa fille Lisa qui est une surdouée, ou encore sa femme Marge qui ne supporte pas de le voir se soûler à longueur de journée.', 'rating': '78%'}])

    const [modalFilmOpen, setModalFilmOpen] = useState(false)
    const [filmModal, setFilmModal] = useState({})

    const openModal = (item) => {
        setFilmModal(item);
        setModalFilmOpen(true);
    }

    const closeModal = () => {
        setFilmModal({});
        setModalFilmOpen(false);
    }

    return (
        <View>

            <Modal visible={modalFilmOpen} animationType='slide' transparent={true}>
                <View style={styles.modal}>
                    <Text style={[styles.titreModal, { marginBottom: 20 }]}>{filmModal.titre}</Text>
                    <Text style={{fontSize:15, marginBottom:15}}>{filmModal.synopsis}</Text>
                    <Text style={{fontSize:15}}>Note : {filmModal.rating}</Text>
                    <TouchableOpacity
                        onPress={() => closeModal()}
                        style={styles.buttonClose}
                    >
                        <Text style={{fontSize: 15}}>Fermer</Text>
                    </TouchableOpacity>
                </View>
            </Modal>


            <FlatList
                data={list}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={styles.boxeFilm}
                            onPress={() => openModal(item)}
                        >
                            <View style={{flexDirection:'row'}}>
                                <Image
                                    source={{uri:'https://www.themoviedb.org/t/p/w220_and_h330_face/reKFmynUd2VpFToo3rLTGk8zVSN.jpg'}}
                                    style={{ width: 67, height: 100, resizeMode: 'contain' }}
                                />
                                <View style={{width:'75%', marginLeft:10, padding:5}}>
                                    <Text numberOfLines={1} style={{fontWeight: 'bold',fontSize:15, marginBottom:5}}>{item.titre}</Text>
                                    <Text numberOfLines={2} style={{fontSize:15, marginBottom:5}}>{item.synopsis}</Text>
                                    <Text style={{fontSize:15}}>Note : {item.rating}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={item => item.id.toString()}
            />


        </View>
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

