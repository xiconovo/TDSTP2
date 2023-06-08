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
        // Divide a string de entrada em duas partes: csrftoken e sessionid
        var splitInput = setCookie.split(', sessionid=');

        // A primeira parte é a string csrftoken
        var csrftoken = splitInput[0];

        // A segunda parte é a string sessionid
        var sessionid = "sessionid=" + splitInput[1];
        console.log('Set-Cookie:', csrftoken);

        // 2. Guarde o "set-cookie" na AsyncStorage
        if (setCookie !== null) {
            await AsyncStorage.setItem('csrftoken', csrftoken);
            console.log('csrftoken:', csrftoken);
            await AsyncStorage.setItem('sessionid', sessionid);
            console.log('sessionid:', sessionid);
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

export const getInfo = async () => {
    try {
        const cookie = await cookieBakery();
        console.log(cookie);
        const response = await fetch(`${BASE_URL}/user`, {
            method: 'GET',
            headers: {
                'Cookie': cookie
            },
            credentials: 'omit', // Não enviar cookies
        });

        if (response.status === 200) {
            const data = await response.json();
            console.log("Sucesso");
            return data;
        } else {
            console.error('Failed to fetch user:', response.status);
        }
    } catch (error) {
        console.error('Error fetching user:', error.message);
    }
}

export const fetchTrails = async () => {
    try {
        const cookie = cookieBakery();
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
        const cookie = await cookieBakery();
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

export const cookieBakery = async () => {
    const csrfToken = await AsyncStorage.getItem('csrftoken');
    const regex = /csrftoken=([^;]+)/;
    const match = csrfToken.match(regex);

    const formattedcsrf = match ? match[1] : null;

    const sessionid = await AsyncStorage.getItem('sessionid');
    const regex2 = /sessionid=([^;]+)/;
    const match2 = sessionid.match(regex2);

    const formattedsession = match2 ? match2[1] : null;

    const finalOutput = 'csrftoken=' + formattedcsrf + ";sessionid=" + formattedsession;

    return finalOutput;
    
  }

  export const apiLogout = async () => {
    try {
        const cookie = await cookieBakery();  // Use o cookie salvo na AsyncStorage
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
                'csrftoken': csrfToken,  // Envie o valor do token CSRF no cabeçalho 'X-CSRFToken'
            },
        });

        if (response.status === 200) {
            console.log('User logged out successfully');

            // 1. Apaga o cookie da AsyncStorage
            await AsyncStorage.removeItem('csrftoken');
            await AsyncStorage.removeItem('sessionid');
            console.log('Cookies removed from AsyncStorage');
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


