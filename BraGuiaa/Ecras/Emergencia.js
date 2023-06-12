import React from 'react';
import { View, Button, Linking, Alert } from 'react-native';

const Emergencia = () => {
  const handleEmergencyCall = async () => {
    const url = 'tel:112';
    const canOpenURL = await Linking.canOpenURL(url);
    if (canOpenURL) {
      Linking.openURL(url)
        .catch((err) => console.error('Failed to dial 112', err));
    } else {
      Alert.alert('Este dispositivo não é capaz de fazer chamadas telefônicas');
    }
  };

  return (
    <View>
      <Button title="Emergência" onPress={handleEmergencyCall} />
    </View>
  );
};

export default Emergencia;
