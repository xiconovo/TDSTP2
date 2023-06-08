import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { fetchUserDetails } from '../Api/api';

const TrailDetails = ({ route }) => {
    const { trail, trailImage } = route.params;

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
            <Image source={{ uri: trail.trail_img }} style={styles.trailImage} />
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
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    trailImage: {
        width: '100%',
        height: 200,
    },
    button: {
        backgroundColor: '#E7E7E7',
        padding: 10,
        borderRadius: 8,
        marginVertical: 10,
    },
    buttonText: {
        color: '#5C5C5C',
        textAlign: 'center',
    },
});

export default TrailDetails;
