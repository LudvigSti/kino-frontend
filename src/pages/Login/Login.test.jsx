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

  expect(screen.getByLabelText(/E-post/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Passord/i)).toBeInTheDocument();
  expect(screen.getByText(/Logg inn/i)).toBeInTheDocument();
});

test('displays error message on invalid email', async () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByLabelText(/E-post/i), { target: { value: 'invalidexample.com' } });
  fireEvent.change(screen.getByLabelText(/Passord/i), { target: { value: 'wrongpassword' } });
  fireEvent.click(screen.getByText(/Logg inn/i));

  expect(await screen.findByText(/Invalid email or password/i)).toBeInTheDocument();
});

test('displays error message on invalid password', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  
    fireEvent.change(screen.getByLabelText(/E-post/i), { target: { value: 'valid@example.com' } });
    fireEvent.change(screen.getByLabelText(/Passord/i), { target: { value: 'Wrongpassword123' } });
    fireEvent.click(screen.getByText(/Logg inn/i));
  
    expect(await screen.findByText(/Invalid email or password/i)).toBeInTheDocument();
  });