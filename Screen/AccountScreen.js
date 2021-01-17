import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Account } from  '../Account';

const AccountScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titrePage}>Mon compte</Text>
            <Account />
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

export { AccountScreen };

