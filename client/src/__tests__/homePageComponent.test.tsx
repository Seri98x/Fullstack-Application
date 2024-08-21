
// import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';

// // Mock the Homepage component
// jest.mock('../pages/Homepage', () => require('../__mocks__/homepageMock').default);

// import Homepage from '../pages/Homepage'; // Import after mock setup

// describe('Homepage Component Mock Test', () => {
//   it('renders the mocked Homepage component', () => {
//     render(<Homepage />);
    
//     // Check if the input for search is rendered
//     expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
    
//     // Check if the Add item button is rendered
//     const addItemButton = screen.getByText('Add item');
//     expect(addItemButton).toBeInTheDocument();
    
//     // Check if the modal content is initially hidden
//     const modal = screen.getByText('Add a product').closest('div');
//     expect(modal).toHaveStyle('display: none');

//     // Simulate opening the modal
//     fireEvent.click(addItemButton);
    
//     // Check if the modal content is visible after clicking Add item
//     expect(screen.getByPlaceholderText('Product name')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Product description')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Product price')).toBeInTheDocument();
//     expect(screen.getByText('Confirm')).toBeInTheDocument();
//     expect(screen.getByText('Cancel')).toBeInTheDocument();
    
//     // Simulate clicking the Confirm button
//     fireEvent.click(screen.getByText('Confirm'));
    
//     // Optionally, add more assertions if there are side effects or updates
//   });
// });
