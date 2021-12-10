import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../pages/home';
import DadosInvestimentosPage from '../pages/dadosInvestimentos';

const Stack = createStackNavigator();

const options = {
    title: 'Resgate',
    headerStyle: {
        backgroundColor: '#3d80f4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold'
    }
};

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomePage">
                <Stack.Screen name="Home" options={options} component={HomePage} />
                <Stack.Screen name="DadosInvestimentos" options={options} component={DadosInvestimentosPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;