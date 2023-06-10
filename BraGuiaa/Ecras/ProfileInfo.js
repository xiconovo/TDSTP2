// Arquivo ProfileInfo.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getInfo } from '../Api/api';

const ProfileInfo = () => {
  const [info, setInfo] = useState({});

  useEffect(() => {
    getInfo()
      .then(data => {
        setInfo(data);
      })
      .catch(err => {
        console.error('Failed to fetch info:', err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tipo de Utilizador: {info.user_type}</Text>
      <Text style={styles.text}>Nome de Utilizador: {info.username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default ProfileInfo;