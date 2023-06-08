import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { fetchUserDetails } from '../Api/api';

const TrailDetails = ({ route, navigation }) => {
    const { trail } = route.params;

    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        const getUserDetails = async () => {
            const data = await fetchUserDetails();
            console.log('User details:', data);
            setUserDetails(data);
        };

        getUserDetails();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{trail.trail_name}</Text>
            <Text>{trail.trail_desc}</Text>
            <Text>Duration: {trail.trail_duration} minutes</Text>
            <Text>Difficulty: {trail.trail_difficulty}</Text>
            {userDetails.user_type === 'Premium' && (
                <View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Iniciar Percurso</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Visualizar Mediafiles</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#1E90FF',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFF',
        textAlign: 'center',
    },
});

export default TrailDetails;
