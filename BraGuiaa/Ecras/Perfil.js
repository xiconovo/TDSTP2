// Profile.js
import React, { useContext } from 'react';
import { View, Button } from 'react-native';
import { apiLogout } from '../Api/api';
import { AuthContext } from '../Modelos/AuthContext';

const Profile = ({navigation}) => {
    const authContext = useContext(AuthContext);
    const handleLogout = async () => {
        await apiLogout(authContext);
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
