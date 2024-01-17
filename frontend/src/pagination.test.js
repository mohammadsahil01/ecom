import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Pagination } from './features/productList/components/ProductList';
import '@testing-library/jest-dom'



test('renders pagination component correctly', () => {
    const handlePageMock = jest.fn((page) => {
      console.log({ page });
    });
    const totalItems = 30;
    const page = 1;
  
    const { getByText, getByRole, debug } = render(
      <Pagination handlePage={handlePageMock} page={page} totalItems={totalItems} />
    );
  
    // Output the HTML to the console for inspection
    debug();
  
    // Test that the component renders the correct text
    expect(getByText(/Showing/i)).toBeInTheDocument();
  
    // Use getByRole directly with a role name
    fireEvent.click(getByRole('link', { name: /Previous/ }));
    expect(handlePageMock).toHaveBeenCalledWith(page - 1);
  
    // Test clicking a page number button
    fireEvent.click(getByText('4'));
    expect(handlePageMock).toHaveBeenCalledWith(4);
  
    // Test clicking the Next button
    fireEvent.click(getByRole('link', { name: /Next/ }));
    expect(handlePageMock).toHaveBeenCalledWith(page + 1);
  });