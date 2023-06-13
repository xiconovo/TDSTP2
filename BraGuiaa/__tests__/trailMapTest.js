import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import TrailMap from '../Ecras/TrailMap';

test('renderiza o componente TrailMap', async () => {
  const route = {
    params: {
      trail: {
        edges: [
          {
            edge_start: {
              pin_lat: 0,
              pin_lng: 0,
            },
            edge_end: {
              pin_lat: 0,
              pin_lng: 0,
            },
          },
        ],
      },
    },
  };

  const { getByText } = render(<TrailMap route={route} />);

  await waitFor(() => getByText('Estou aqui'));
});
