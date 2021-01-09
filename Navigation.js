import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ListScreen } from './ListScreen';
import { AccountScreen } from './AccountScreen';

const Tab = createBottomTabNavigator();

const Navigation = (props) => {
    return (
        <Tab.Navigator initialRouteName="List" screenOptions={({ route }) => ({tabBarIcon: ({ focused, color, size }) => {
                                                                let iconName;
                                                                if (route.name === 'List') { iconName = 'ios-list'; }
                                                                else { iconName = 'person-circle-outline'; }
                                                                return <Ionicons name={iconName} size={size} color={color} />;
                                                                }, })} >
            <Tab.Screen name="List" component={ListScreen} options={{ title: 'Liste' }} />
            <Tab.Screen name="Account" component={AccountScreen} options={{ title: 'Mon compte' }} />
        </Tab.Navigator>
    );
}

export { Navigation };
