import React from 'react';
import { render, act } from '@testing-library/react-native';
import { fetchTrails } from '../Api/api';
import { useNavigation } from '@react-navigation/native';
import Rotas from '../Ecras/Rotas';

jest.mock('../Api/api', () => ({
    fetchTrails: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
}));

jest.mock('../assets/braga2.jpeg', () => ({}));

describe('<Rotas />', () => {
    it('renders correctly', async () => {
        fetchTrails.mockResolvedValueOnce([{
            id: 1,
            trail_img: 'https://example.com/image.jpg',
            trail_name: 'Trail 1',
            trail_desc: 'Trail 1 Description',
            trail_duration: 120,
            trail_difficulty: 'Easy',
        }]);
        useNavigation.mockReturnValue({ navigate: jest.fn() });
        
        const { getByText } = render(<Rotas />);
        await act(async () => { /* wait for useEffect to finish */ });
        
        expect(getByText('Trail 1')).toBeDefined();
        expect(getByText('Trail 1 Description')).toBeDefined();
        expect(getByText('Duration: 120 minutes')).toBeDefined();
        expect(getByText('Difficulty: Easy')).toBeDefined();
    });
});
