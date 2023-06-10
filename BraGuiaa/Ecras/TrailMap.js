import React, { useEffect, useState } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';

const TrailMap = ({ route }) => {
    const { trail } = route.params;
    const [coordinates, setCoordinates] = useState([]);
    const [region, setRegion] = useState(null);

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
        } else {
            console.error('Trail details are undefined');
        }
    }, []);

    if (!region) {
        return null;
    }

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
                <Polyline coordinates={coordinates} strokeColor="blue" strokeWidth={2} />
            </MapView>
        </View>
    );
};

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
