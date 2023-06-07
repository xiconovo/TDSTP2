import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const BottomBar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Home" onPress={() => navigation.navigate('Principal')} style={styles.button} />
      <Button title="Rotas" onPress={() => navigation.navigate('Rotas')} style={styles.button} />
      <Button title="Emergência" onPress={() => {}} style={styles.button} />
      <Button title="Perfil" onPress={() => navigation.navigate('Perfil')} style={styles.lastButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'purple',
  },
  button: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: 'white',
  },
  lastButton: {
    flex: 1,
    borderRightWidth: 0, // No border on the right for the last button
  },
});

export default BottomBar;
