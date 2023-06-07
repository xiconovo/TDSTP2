// Arquivo: Componentes/TopBar.js
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
        padding: 15,
        backgroundColor: 'blue', // Mude para a cor que desejar
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default TopBar;
