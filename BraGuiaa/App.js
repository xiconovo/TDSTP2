import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Ecras/Login';
import Principal from './Ecras/Principal';
import Rotas from './Ecras/Rotas';
import Emergencia from './Ecras/Emergencia';
import Perfil from './Ecras/Perfil';
import ProfileInfo from './Ecras/ProfileInfo';
import TrailDetails from './Ecras/TrailDetails'; 
import TrailMap from './Ecras/TrailMap';
import History from './Ecras/History';
import { TrailHistoryProvider } from './Ecras/TrailHistoryContext'; 
import TrailInfo from './Ecras/TrailInfo';

const Stack = createStackNavigator();

const App = () => (
  <TrailHistoryProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Principal" component={Principal} />
        <Stack.Screen name="Rotas" component={Rotas} />
        <Stack.Screen name="Emergencia" component={Emergencia} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="TrailDetails" component={TrailDetails} />
        <Stack.Screen name="ProfileInfo" component={ProfileInfo} />
        <Stack.Screen name="TrailMap" component={TrailMap} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="TrailInfo" component={TrailInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  </TrailHistoryProvider>
);

export default App;
