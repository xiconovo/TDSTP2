import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import TopBar from '../Componentes/TopBar';
import BottomBar from '../Componentes/BottomBar';

const Principal = ({ navigation }) => {
  return (
    <ImageBackground source={require('../assets/braga2.jpeg')} style={styles.container}>
      <TopBar />
      <View style={styles.infoContainer}>
        <View style={styles.textBox}>
          <Text style={styles.title}>Funcionalidades</Text>
          <Text style={styles.text}>
            Utilizador Premium: Pode navegar, pode consultar e descarregar midia sobre o ponto turistico pertendido.
            Utilizador Standard: Pode consultar informações sobre um roteiro.
          </Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.title}>Descrição</Text>
          <Text style={styles.text}>
            Este trabalho foi realizado no âmbito de Tópicos de Desenvolvimento de Software, pelos alunos Francisco Novo, Duarte Lucas e João Vitor.
          </Text>
        </View>
      </View>
      <BottomBar navigation={navigation} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  infoContainer: {
      flex: 1, 
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 20,
      backgroundColor: 'transparent', // Alterado para transparente
  },
  textBox: {
      marginHorizontal: 20,
      marginBottom: 20,
      padding: 10,
      backgroundColor: '#fff',
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
  },
  text: {
      fontSize: 16,
  },
});

export default Principal;
