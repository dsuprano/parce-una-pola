/**
 * @format
 */

import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import App from '../src';

test('renders App correctly', async () => {
  await waitFor(() => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('app-container')).toBeTruthy();
  });
});

test('check app text', () => {
  const { getByText } = render(<App />);
  expect(getByText('Parce, una pola')).toBeTruthy();
});
