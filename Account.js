import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Account = (props) => {

    const [fav, setFav] = useState({
                                     "page": 1,
                                     "results": [
                                       {
                                         "adult": false,
                                         "backdrop_path": null,
                                         "genre_ids": [
                                           16
                                         ],
                                         "id": 1,
                                         "original_language": "en",
                                         "original_title": "The Incredibles",
                                         "overview": "Bob Parr has given up his superhero days to log in time as an insurance adjuster and raise his three children with his formerly heroic wife in suburbia. But when he receives a mysterious assignment, it's time to get back into costume.",
                                         "release_date": "2004-11-04",
                                         "poster_path": null,
                                         "popularity": 0.167525,
                                         "title": "The Incredibles",
                                         "video": false,
                                         "vote_average": 6.8,
                                         "vote_count": 1584
                                       },
                                       {
                                         "adult": false,
                                         "backdrop_path": null,
                                         "genre_ids": [
                                           16
                                         ],
                                         "id": 2,
                                         "original_language": "en",
                                         "original_title": "The Incredibles 2",
                                         "overview": "Bob Parr has given up his superhero days to log in time as an insurance adjuster and raise his three children with his formerly heroic wife in suburbia. But when he receives a mysterious assignment, it's time to get back into costume.",
                                         "release_date": "2004-11-04",
                                         "poster_path": null,
                                         "popularity": 0.167525,
                                         "title": "The Incredibles",
                                         "video": false,
                                         "vote_average": 6.8,
                                         "vote_count": 1584
                                       },
                                       {
                                         "adult": false,
                                         "backdrop_path": null,
                                         "genre_ids": [
                                           16
                                         ],
                                         "id": 3,
                                         "original_language": "en",
                                         "original_title": "The Incredibles 3",
                                         "overview": "Bob Parr has given up his superhero days to log in time as an insurance adjuster and raise his three children with his formerly heroic wife in suburbia. But when he receives a mysterious assignment, it's time to get back into costume.",
                                         "release_date": "2004-11-04",
                                         "poster_path": null,
                                         "popularity": 0.167525,
                                         "title": "The Incredibles",
                                         "video": false,
                                         "vote_average": 6.8,
                                         "vote_count": 1584
                                       }
                                     ],
                                     "total_pages": 4,
                                     "total_results": 77
                                   })

    return (
        <View>
            <View>
                <Text>Nom :</Text>
                <TouchableOpacity
                    style={{backgroundColor:'#EA2027', borderRadius:5, padding:10}}
                    onPress={() => {}}
                >
                    <Text style={{fontSize: 15, color: 'white', textAlign: 'center'}}>Se déconnecter</Text>
                </TouchableOpacity>
            </View>
            <Text style={{borderTopColor: 'grey', borderTopWidth: 1, marginTop:'50%', fontSize:17, textAlign: 'center'}}>Mes favoris</Text>
            <FlatList
                data={fav.results}
                style={{marginTop:10}}
                renderItem={({ item }) => {
                    return (
                        <View style={{flexDirection:'row', borderWidth: 1, marginBottom: 15, borderRadius: 5}}>
                            <View style={{width:'85%', marginLeft:10, padding:5}}>
                                <Text numberOfLines={1} style={{fontWeight: 'bold',fontSize:15, marginBottom:5}}>{item.original_title}</Text>
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
        </View>
    );
}

const styles = StyleSheet.create({

});

export { Account };

