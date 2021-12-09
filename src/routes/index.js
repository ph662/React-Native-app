import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../pages/home';
import DadosInvestimentosPage from '../pages/dadosInvestimentos';

const Stack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomePage">
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="DadosInvestimentos" component={DadosInvestimentosPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;