// Api.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://c5a2-193-137-92-29.eu.ngrok.io';
let csrfToken = null;

export const loginUser = async (username, password, navigation) => {
    try {
        console.log('Sending request to API');
        let response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'omit', // Não enviar cookies
        });

        console.log('HTTP status code:', response.status);

        // 1. Extraia o "set-cookie" da resposta
        const setCookie = response.headers.get('set-cookie');
        console.log('Set-Cookie:', setCookie);

        // 2. Guarde o "set-cookie" na AsyncStorage
        if (setCookie !== null) {
            await AsyncStorage.setItem('set-cookie', setCookie);
            // Navigate to "Principal" page if login is successful
            navigation.navigate('Principal');
        } else {
            console.warn('Set-Cookie is null, not storing in AsyncStorage');
        }

        // Proceda normalmente
        let json = await response.json();
        console.log('Response from API:', json);

        return json;
    } catch (error) {
        console.error('Error:', error);
    }
};
