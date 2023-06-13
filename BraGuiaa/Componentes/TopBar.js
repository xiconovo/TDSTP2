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
        backgroundColor: 'white', 
    },
    title: {
        color: 'blue', 
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default TopBar;
