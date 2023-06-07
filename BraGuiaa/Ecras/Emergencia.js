// Ecras/Rotas.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TopBar from '../Componentes/TopBar';
import BottomBar from '../Componentes/BottomBar';

const Rotas = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TopBar />
      <Text>Esta é a página Rotas</Text>
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

export default Rotas;
