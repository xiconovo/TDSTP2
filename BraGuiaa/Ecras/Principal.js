// Ecras/Principal.js

import React from 'react';
import { View, Text , StyleSheet } from 'react-native';
import TopBar from '../Componentes/TopBar';
import BottomBar from '../Componentes/BottomBar';

const Principal = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TopBar />
      {/* Resto do seu layout aqui */}
      <BottomBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
  },
});

export default Principal;
