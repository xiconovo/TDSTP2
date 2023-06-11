import React, { useEffect, useState } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { View, StyleSheet, Text } from 'react-native';
import * as Location from 'expo-location';

const TrailMap = ({ route }) => {
    const { trail } = route.params;
    const [coordinates, setCoordinates] = useState([]);
    const [region, setRegion] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            setIsLoading(false);
        })();
    }, []);

    useEffect(() => {
        if (trail) {
            const trailCoordinates = trail.edges.map(edge => {
                return [
                    { latitude: edge.edge_start.pin_lat, longitude: edge.edge_start.pin_lng },
                    { latitude: edge.edge_end.pin_lat, longitude: edge.edge_end.pin_lng }
                ];
            });
    
            const flattenedCoordinates = trailCoordinates.flat();
    
            // Calculate the center of the trail
            const middleIndex = Math.floor(flattenedCoordinates.length / 2);
            const middleCoordinate = flattenedCoordinates[middleIndex];
    
            setCoordinates(flattenedCoordinates);
    
            // Set the map region to the center of the trail with a delta
            // large enough to include the entire trail
            setRegion({
                latitude: middleCoordinate.latitude,
                longitude: middleCoordinate.longitude,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
            });

            setIsLoading(false);
        } else {
            console.error('Trail details are undefined');
        }
    }, [trail]);

    if (isLoading) {
        return <Text>Carregando...</Text>;
    }

    if (!region || !userLocation) {
        return null;
    }

    // Connect user location to the first point of the trail
    const userTrailCoordinates = [
        userLocation,
        coordinates[0],
    ];

    return (
        <View style={styles.container}>
          <MapView style={styles.map} region={region}>
            {coordinates.map((coordinate, index) => (
              <Marker
                key={index}
                coordinate={coordinate}
                title={`Pin ${index + 1}`}
              />
            ))}
            {userLocation && (
              <Marker
                key={coordinates.length}
                coordinate={userLocation}
                title="Estou aqui"
                description="Localização atual"
                pinColor="red" 
              />
            )}
            <Polyline coordinates={coordinates} strokeColor="blue" strokeWidth={2} />
            <Polyline coordinates={userTrailCoordinates} strokeColor="green" strokeWidth={2} />
          </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default TrailMap;
