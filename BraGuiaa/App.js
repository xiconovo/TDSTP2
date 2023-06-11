// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './Modelos/AuthContext';
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
import MediaFiles from './Ecras/MediaFiles';

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('sessionid');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
  }, []);
  

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        onLogin: () => setIsLoggedIn(true),
        onLogout: () => setIsLoggedIn(false),
      }}
    >
      <TrailHistoryProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            {isLoggedIn ? (
              <>
                <Stack.Screen name="Principal" component={Principal} />
                <Stack.Screen name="Rotas" component={Rotas} />
                <Stack.Screen name="Emergencia" component={Emergencia} />
                <Stack.Screen name="Perfil" component={Perfil} />
                <Stack.Screen name="TrailDetails" component={TrailDetails} />
                <Stack.Screen name="ProfileInfo" component={ProfileInfo} />
                <Stack.Screen name="TrailMap" component={TrailMap} />
                <Stack.Screen name="MediaFiles" component={MediaFiles} />
                <Stack.Screen name="History" component={History} />
              </>
            ) : (
              <Stack.Screen name="Login" component={Login} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </TrailHistoryProvider>
    </AuthContext.Provider>
  );
};

export default App;
