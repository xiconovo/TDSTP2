import React from 'react';
import { View, Button } from 'react-native';
import { Linking } from 'react-native';

const Emergencia = () => {
  const handleEmergencyCall = () => {
    Linking.openURL('tel:112')
      .catch((err) => console.error('Failed to dial 112', err));
  };

  return (
    <View>
      <Button title="Emergência" onPress={handleEmergencyCall} />
    </View>
  );
};

export default Emergencia;