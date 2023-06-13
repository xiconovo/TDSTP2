jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(() => Promise.resolve(null)),
    getItem: jest.fn(() => Promise.resolve(null)),
    removeItem: jest.fn(() => Promise.resolve(null)),
}));

jest.mock('expo-location', () => ({
    requestForegroundPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
    getCurrentPositionAsync: jest.fn(() => Promise.resolve({
        coords: {
            latitude: 0,
            longitude: 0,
        }
    })),
}));

jest.mock('react-native-maps', () => {
    const React = require('react');
    const View = require('react-native').View;
    const Text = require('react-native').Text;

    class MockMarker extends React.Component {
        render() {
            return (
                <View>
                    <Text>{this.props.title}</Text>
                    <Text>{this.props.description}</Text>
                </View>
            );
        }
    }

    class MockPolyline extends React.Component {
        render() {
            return React.createElement('Polyline', this.props, this.props.children);
        }
    }

    class MockMapView extends React.Component {
        static Marker = MockMarker;
        static Polyline = MockPolyline;

        render() {
            return React.createElement('MapView', this.props, this.props.children);
        }
    }

    return MockMapView;
});

