
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

// Mock the Login component to use LoginMock
jest.mock('../pages/Login', () => require('../__mocks__/loginMock').default);

import Login from '../pages/Login'; // Import after mock setup



describe('Login Component Mock Test', () => {
  it('renders the mocked Login component', () => {
    render(<Login />);
    
    // Assert that the labels for username and password are in the document
    expect(screen.getByText('Username:')).toBeInTheDocument();
    expect(screen.getByText('Password:')).toBeInTheDocument();
    
    // Assert that the input elements are rendered
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();

    // Assert that the login button is rendered
    const loginButton = screen.getByText('Login');
    expect(loginButton).toBeInTheDocument();

    // Simulate a click on the login button
    fireEvent.click(loginButton);
  });
});










