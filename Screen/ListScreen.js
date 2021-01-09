import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List } from '../List';

const ListScreen = (props) => {
    return (
        <View style={styles.container}>
            <List />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop:40,
        padding:15,
        marginBottom:50
    },
});

export { ListScreen };

