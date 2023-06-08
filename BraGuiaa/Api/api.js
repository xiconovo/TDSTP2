// Api.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


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
            console.log('Stored cookie:', setCookie);
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


export const fetchTrails = async () => {
    try {
        const cookie = await AsyncStorage.getItem('set-cookie');
        const response = await fetch(`${BASE_URL}/trails`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        });

        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            console.error('Failed to fetch trails:', response.status);
        }
    } catch (error) {
        console.error('Error fetching trails:', error);
    }
};

export const fetchUserDetails = async () => {
    try {
        const cookie = await AsyncStorage.getItem('set-cookie');
        console.log('Using cookie:', cookie);
        const response = await fetch(`${BASE_URL}/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        });

        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            console.error('Failed to fetch user details:', response.status);
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
    }
};


export const apiLogout = async () => {
    try {
        let cookie = await AsyncStorage.getItem('set-cookie');  // Use o cookie salvo na AsyncStorage
        console.log('Using cookie:', cookie);

        // Extraindo o token CSRF do cookie
        let csrfToken = null;
        if (cookie) {
            let cookies = cookie.split(';');
            cookies.forEach((item) => {
                if (item.trim().startsWith('csrftoken=')) {
                    csrfToken = item.trim().substring('csrftoken='.length);
                }
            });
        }

        if (!csrfToken) {
            console.error('CSRF token not found in cookie');
            return;
        }

        console.log('Using CSRF token:', csrfToken);

        // A url abaixo é apenas um exemplo. Substitua pela url correta da sua API
        const url = `${BASE_URL}/logout`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,  // Envie o valor do token CSRF no cabeçalho 'X-CSRFToken'
            },
        });

        if (response.status === 200) {
            console.log('User logged out successfully');

            // 1. Apaga o cookie da AsyncStorage
            await AsyncStorage.removeItem('set-cookie');
            console.log('Cookie removed from AsyncStorage');
        } else {
            console.error('Failed to logout user:', response.status);
        }

        let json = await response.json();
        console.log('Response from API:', json);

        return json;
    } catch (error) {
        console.error('Error during logout:', error);
    }
};

