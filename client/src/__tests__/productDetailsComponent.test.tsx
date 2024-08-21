
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

// Mock the ProductDetails component
jest.mock('../pages/ProductDetails', () => require('../__mocks__/productDetailsMock').default);

import ProductDetails from '../pages/ProductDetails'; // Import after mock setup

describe('ProductDetails Component Mock Test', () => {
  it('renders the mocked ProductDetails component', () => {
    render(<ProductDetails />);
    
    // Check if the product image is rendered
    expect(screen.getByAltText('Product')).toBeInTheDocument();
    
    // Check if input fields and buttons are rendered
    expect(screen.getByLabelText('Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Description:')).toBeInTheDocument();
    expect(screen.getByLabelText('Price:')).toBeInTheDocument();
    expect(screen.getByText('Update')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    

   
    
    // Simulate clicking the Update button
    fireEvent.click(screen.getByText('Update'));
    
    // Simulate clicking the Delete button
    fireEvent.click(screen.getByText('Delete'));
    
    // Optionally, add more assertions if there are side effects or updates
  });
});
