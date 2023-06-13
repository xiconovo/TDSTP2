import Login from '../Ecras/Login';
import React from 'react';
import renderer from 'react-test-renderer';




test('renders correctly', () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree).toMatchSnapshot();
});