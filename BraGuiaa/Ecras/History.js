// History.js
import React, { useContext } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { TrailHistoryContext } from '../Ecras/TrailHistoryContext';

const History = () => {
  const { trailHistory } = useContext(TrailHistoryContext);

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      <Image source={{ uri: item.image }} style={styles.image} />
    </View>
  );

  return (
    <FlatList
      data={trailHistory}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()} 
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20, 
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default History;
