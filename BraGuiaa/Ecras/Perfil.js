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

    const userType = 'Premium'; // Substitua isso pelo valor real
    const username = 'johndoe'; // Substitua isso pelo valor real

    const handleProfileInfoPress = () => {
        navigation.navigate('ProfileInfo', { userType, username });
    };

    const handleHistoryPress = () => {
        navigation.navigate('History');
    };

    return (
        <View>
            <Button
                title="Perfil"
                onPress={handleProfileInfoPress}
            />
            <Button
                title="Logout"
                onPress={handleLogout}
            />
            <Button
                title="Historico"
                onPress={handleHistoryPress}
            />
        </View>
    );
};

export default Profile;