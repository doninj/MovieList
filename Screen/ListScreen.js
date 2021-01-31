import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List } from '../List';
import axios from 'axios';
import config from '../config'


const ListScreen = (props) => {

	const [listFilm, setlistFilm] = React.useState("");
    return (
        <View style={styles.container}>
            <Text style={styles.titrePage}>Liste des films</Text>
            <List />
        </View>
    );
}

const styles = StyleSheet.create({
    titrePage: {
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center'
    },
    container: {
        marginTop:40,
        padding:15,
        marginBottom:50
    },
});

export { ListScreen };

