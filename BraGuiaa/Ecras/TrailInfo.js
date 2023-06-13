// TrailInfo.js
import React from 'react';
import { Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const TrailInfo = () => {
  const route = useRoute();
  const { trail } = route.params;

  return (
    <ScrollView style={styles.container} key={`trail-info-${trail.id}`}>
      <Image source={{ uri: trail.image }} style={styles.trailImage} />
      <Text style={styles.title}>{trail.name}</Text>
      <Text>Duration: {trail.duration} minutes</Text>
      <Text>Difficulty: {trail.difficulty}</Text>
      <Text>Description: {trail.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  trailImage: {
    width: '100%',
    height: 200,
  },
});

export default TrailInfo;
