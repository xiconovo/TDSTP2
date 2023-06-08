// Profile.js
import React from 'react';
import { View, Button } from 'react-native';
import { apiLogout } from '../Api/api';

const Profile = ({navigation}) => {
    const handleLogout = async () => {
        await apiLogout();
        //logoutUser();
        // Navegar para a tela de login após o logout
        navigation.navigate('Login');
    };

    // Supondo que userType e username são obtidos de algum lugar (possivelmente estado global ou AsyncStorage)
    const userType = 'Premium'; // Substitua isso pelo valor real
    const username = 'johndoe'; // Substitua isso pelo valor real

    const handleProfileInfoPress = () => {
        navigation.navigate('ProfileInfo', { userType, username });
    };

    return (
        <View>
            {/* Aqui vai o código para mostrar os detalhes do perfil do usuário */}
            <Button
                title="Perfil"
                onPress={handleProfileInfoPress}
            />
            <Button
                title="Logout"
                onPress={handleLogout}
            />
        </View>
    );
};

export default Profile;
