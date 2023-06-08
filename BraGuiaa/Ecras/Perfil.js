// Profile.js
import React from 'react';
import { View, Button } from 'react-native';
import { logoutUser, apiLogout } from '../Api/api';

const Profile = ({navigation}) => {
    const handleLogout = async () => {
        await apiLogout();
        logoutUser();
        // Navegar para a tela de login após o logout
        navigation.navigate('Login');
    };

    return (
        <View>
            {/* Aqui vai o código para mostrar os detalhes do perfil do usuário */}
            <Button
                title="Logout"
                onPress={handleLogout}
            />
        </View>
    );
};

export default Profile;
