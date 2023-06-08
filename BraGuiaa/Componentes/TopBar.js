import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TopBar = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>BraGuia</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'white', // Altere para a cor que você deseja
    },
    title: {
        color: 'blue', // Altere para a cor que você deseja
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default TopBar;
