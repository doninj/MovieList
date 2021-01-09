import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';

const List = (props) => {

    const [list, setList] = useState([{'id': 1, 'titre': 'Les Simpsons', 'synopsis': 'Les Simpson, famille américaine moyenne, vivent à Springfield. Homer, le père, a deux passions : regarder la télé et boire des bières. Mais son quotidien est rarement reposant, entre son fils Bart qui fait toutes les bêtises possibles, sa fille Lisa qui est une surdouée, ou encore sa femme Marge qui ne supporte pas de le voir se soûler à longueur de journée.', 'rating': '78%'}, {'id': 2, 'titre': 'Les Simpsons', 'synopsis': 'Les Simpson, famille américaine moyenne, vivent à Springfield. Homer, le père, a deux passions : regarder la télé et boire des bières. Mais son quotidien est rarement reposant, entre son fils Bart qui fait toutes les bêtises possibles, sa fille Lisa qui est une surdouée, ou encore sa femme Marge qui ne supporte pas de le voir se soûler à longueur de journée.', 'rating': '78%'}])

    return (
        <View>
            <FlatList
                data={list}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={styles.boxeFilm}
                            onPress={() => {}}
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

});

export { List };

