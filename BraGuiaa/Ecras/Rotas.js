import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { fetchTrails } from '../Api/api';
import { useNavigation } from '@react-navigation/native';

const Rotas = () => {
    const [trails, setTrails] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const getTrails = async () => {
            const data = await fetchTrails();
            setTrails(data);
        };

        getTrails();
    }, []);

    const handlePress = (trail) => {
        navigation.navigate('TrailDetails', { trail });
    };

    return (
        <ScrollView>
            {trails.map(trail => (
                <TouchableOpacity key={trail.id} onPress={() => handlePress(trail)} style={styles.trail}>
                    <Image source={{ uri: trail.trail_img }} style={styles.trailImage} />
                    <Text style={styles.trailName}>{trail.trail_name}</Text>
                    <Text>{trail.trail_desc}</Text>
                    <Text>Duration: {trail.trail_duration} minutes</Text>
                    <Text>Difficulty: {trail.trail_difficulty}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    trail: {
        marginBottom: 20,
    },
    trailImage: {
        width: '100%',
        height: 200,
    },
    trailName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Rotas;
