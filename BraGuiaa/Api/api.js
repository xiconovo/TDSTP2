import AsyncStorage from '@react-native-async-storage/async-storage';


const BASE_URL = 'https://c5a2-193-137-92-29.eu.ngrok.io';

export const loginUser = async (username, password, navigation, authContext) => {
    try {
        console.log('Sending request to API');
        let response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'omit', 
        });

        console.log('HTTP status code:', response.status);

        const setCookie = response.headers.get('set-cookie');
        var splitInput = setCookie.split(', sessionid=');

        var csrftoken = splitInput[0];

        var sessionid = "sessionid=" + splitInput[1];
        console.log('Set-Cookie:', csrftoken);

        if (setCookie !== null) {
            await AsyncStorage.setItem('csrftoken', csrftoken);
            console.log('csrftoken:', csrftoken);
            await AsyncStorage.setItem('sessionid', sessionid);
            console.log('sessionid:', sessionid);
            authContext.onLogin();
            navigation.navigate('Principal');
        } else {
            console.warn('Set-Cookie is null, not storing in AsyncStorage');
        }

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

  export const apiLogout = async (authContext) => {
    try {
        const cookie = await cookieBakery();  
        console.log('Using cookie:', cookie);

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

        const url = `${BASE_URL}/logout`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'csrftoken': csrfToken,  
            },
        });

        if (response.status === 200) {
            console.log('User logged out successfully');

            await AsyncStorage.removeItem('csrftoken');
            await AsyncStorage.removeItem('sessionid');
            console.log('Cookies removed from AsyncStorage');
            authContext.onLogout();

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


