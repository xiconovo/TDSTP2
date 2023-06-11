import React from 'react';
import { View, Image, Dimensions, Text } from 'react-native';
import { Video } from 'expo-av';
import PagerView from 'react-native-pager-view';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const mediaSize = Math.min(windowWidth, windowHeight) * 0.6; // vamos usar 60% do menor tamanho entre a largura e altura da janela

const MediaFiles = ({ route }) => {
  const { trail } = route.params;
  const mediaFiles = [];

  trail.edges.forEach(edge => {
    edge.edge_start.media.forEach(media => {
      mediaFiles.push({ url: media.media_file, type: media.media_type });
    });
    edge.edge_end.media.forEach(media => {
      mediaFiles.push({ url: media.media_file, type: media.media_type });
    });
  });

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 20, textAlign: 'center', margin: 10 }}>{trail.trail_name}</Text>
      <View style={{ flex: 0.8 }}> 
        <PagerView style={{ flex: 1 }} initialPage={0}>
          {mediaFiles.map((item, index) => (
            <View key={index} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              {item.type === 'I' && (
                <Image source={{ uri: item.url }} style={{ width: mediaSize, height: mediaSize }} />
              )}
              {(item.type === 'R' || item.type === 'V') && (
                <Video
                  source={{ uri: item.url }}
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  resizeMode="cover"
                  shouldPlay={false}
                  useNativeControls
                  style={{ width: mediaSize, height: mediaSize }}
                />
              )}
            </View>
          ))}
        </PagerView>
      </View>
      <Text style={{ fontSize: 16, textAlign: 'center', margin: 10 }}>{trail.trail_desc}</Text>
    </View>
  );
};

export default MediaFiles;
