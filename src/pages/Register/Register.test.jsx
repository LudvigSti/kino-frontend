import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from './Register';

test('renders register form', () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );

  expect(screen.getByPlaceholderText(/Skriv din e-post/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Skriv ditt passord/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Skriv ditt fornavn/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Skriv ditt etternavn/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Enter your date of birth/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Registrer/i })).toBeInTheDocument();
});

test('displays error message on empty form submission', async () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );

  fireEvent.click(screen.getByRole('button', { name: /Registrer/i }));

  expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
});

test('displays error message on invalid email', async () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/Skriv din e-post/i), { target: { value: 'invalidemail' } });
  fireEvent.change(screen.getByPlaceholderText(/Skriv ditt passord/i), { target: { value: 'ValidPass123' } });
  fireEvent.change(screen.getByPlaceholderText(/Skriv ditt fornavn/i), { target: { value: 'Fornavn' } });
  fireEvent.change(screen.getByPlaceholderText(/Skriv ditt etternavn/i), { target: { value: 'Etternavn' } });
  fireEvent.change(screen.getByPlaceholderText(/Enter your date of birth/i), { target: { value: '2000-01-01' } });
  fireEvent.click(screen.getByRole('button', { name: /Registrer/i }));

  expect(await screen.findByText(/Invalid email format/i)).toBeInTheDocument();
});

test('displays error message on invalid password', async () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/Skriv din e-post/i), { target: { value: 'valid@example.com' } });
  fireEvent.change(screen.getByPlaceholderText(/Skriv ditt passord/i), { target: { value: 'invalidpassword' } });
  fireEvent.change(screen.getByPlaceholderText(/Skriv ditt fornavn/i), { target: { value: 'Fornavn' } });
  fireEvent.change(screen.getByPlaceholderText(/Skriv ditt etternavn/i), { target: { value: 'Etternavn' } });
  fireEvent.change(screen.getByPlaceholderText(/Enter your date of birth/i), { target: { value: '2000-01-01' } });
  fireEvent.click(screen.getByRole('button', { name: /Registrer/i }));

  expect(await screen.findByText(/Password must be at least 8 characters long, contain uppercase and lowercase letters and a number/i)).toBeInTheDocument();
});

test('displays error message on invalid date of birth', async () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/Skriv din e-post/i), { target: { value: 'valid@example.com' } });
  fireEvent.change(screen.getByPlaceholderText(/Skriv ditt passord/i), { target: { value: 'ValidPass123' } });
  fireEvent.change(screen.getByPlaceholderText(/Skriv ditt fornavn/i), { target: { value: 'Fornavn' } });
  fireEvent.change(screen.getByPlaceholderText(/Skriv ditt etternavn/i), { target: { value: 'Etternavn' } });
  fireEvent.change(screen.getByPlaceholderText(/Enter your date of birth/i), { target: { value: '2020-01-01' } });
  fireEvent.click(screen.getByRole('button', { name: /Registrer/i }));

  expect(await screen.findByText(/You must be at least 18 years old/i)).toBeInTheDocument();
});

test('displays error message on existing email', async () => {
  // Mock the fetch response to simulate an existing email
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([{ email: 'existing@example.com' }]),
    })
  );

  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/Skriv din e-post/i), { target: { value: 'existing@example.com' } });
  fireEvent.change(screen.getByPlaceholderText(/Skriv ditt passord/i), { target: { value: 'ValidPass123' } });
  fireEvent.change(screen.getByPlaceholderText(/Skriv ditt fornavn/i), { target: { value: 'Fornavn' } });
  fireEvent.change(screen.getByPlaceholderText(/Skriv ditt etternavn/i), { target: { value: 'Etternavn' } });
  fireEvent.change(screen.getByPlaceholderText(/Enter your date of birth/i), { target: { value: '2000-01-01' } });
  fireEvent.click(screen.getByRole('button', { name: /Registrer/i }));

  expect(await screen.findByText(/Email already exists/i)).toBeInTheDocument();
});