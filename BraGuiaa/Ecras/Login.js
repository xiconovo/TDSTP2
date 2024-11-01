import React, { useState, useContext } from 'react';
import { StyleSheet, ImageBackground, TextInput, Button } from 'react-native';
import { loginUser } from '../Api/api';
import { AuthContext } from '../Modelos/AuthContext';

const Login = ({navigation}) => {
    const authContext = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Button pressed');
        loginUser(username, password, navigation, authContext);
    };

    return (
        <ImageBackground source={require('../assets/braga2.jpeg')} style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder="Username"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                secureTextEntry
            />
            <Button
                title="Login"
                onPress={handleLogin}
            />
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'rgba(255,255,255,0.8)', 
    },
});

export default Login;