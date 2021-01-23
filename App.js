import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './Navigation';
import {loginStore} from './Store'
import {SignInScreen} from './Screen/LoginScreen'
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {

	const Stack = createStackNavigator();
	const [Refresh, setRefresh] = React.useState(false);
	 React.useEffect(() => {
		 setTimeout(() => {
			 setRefresh(!Refresh);
			 console.log(Refresh)
		 }, 1000);
	 }, [Refresh]);
    return (
        <NavigationContainer>
      {!loginStore.user.isSignedIn ? (
				<Stack.Navigator>
      <Stack.Screen name="SignScreen" component={SignInScreen} />
			</Stack.Navigator>
			):(   <Navigation />)}
        </NavigationContainer>
    );
}