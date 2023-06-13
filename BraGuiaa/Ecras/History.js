// History.js
import React, { useContext } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity,Button} from 'react-native';
import { TrailHistoryContext } from '../Ecras/TrailHistoryContext';
import { useNavigation } from '@react-navigation/native';

const History = () => {
  const navigation = useNavigation();  
  const { trailHistory, clearHistory } = useContext(TrailHistoryContext);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('TrailInfo', { trail: item })}>  
      <View style={styles.container}>
        <Text style={styles.title}>{item.name}</Text>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
    </TouchableOpacity> 
  );
  

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }} 
        data={trailHistory}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()} 
      />
      <View style={{ justifyContent: 'flex-end' }}>
        <Button
          title="Limpar Histórico"
          onPress={clearHistory}
        />
      </View>
    </View>
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
