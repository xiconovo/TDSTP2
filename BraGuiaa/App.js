// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Ecras/Login';
import Principal from './Ecras/Principal';
import Rotas from './Ecras/Rotas';
import Emergencia from './Ecras/Emergencia';
import Perfil from './Ecras/Perfil';
import TrailDetails from './Ecras/TrailDetails'; // Importa o componente TrailDetails aqui

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Principal" component={Principal} />
      <Stack.Screen name="Rotas" component={Rotas} />
      <Stack.Screen name="Emergencia" component={Emergencia} />
      <Stack.Screen name="Perfil" component={Perfil} />
      <Stack.Screen name="TrailDetails" component={TrailDetails} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
