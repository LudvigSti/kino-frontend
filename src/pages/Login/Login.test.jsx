import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

test('renders login form', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  expect(screen.getByPlaceholderText(/e-post/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/passord/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Logg inn/i })).toBeInTheDocument();
});