import React from 'react';

function HomepageMock() {
    React
  return (
    <div>
      <h1>Homepage</h1>
      <input type="text" placeholder="Search products..." aria-label="Search products" />
      <button id="open-modal">Add item</button>
      <div>
        <h2>Product List</h2>
        <div>
          <p>No products available</p>
        </div>
      </div>
      <div id="modal" style={{ display: 'none' }}>
        <h2>Add a product</h2>
        <input type="text" placeholder="Product name" aria-label="Product name" />
        <input type="text" placeholder="Product description" aria-label="Product description" />
        <input type="number" placeholder="Product price" aria-label="Product price" />
        <button id="modal-confirm">Confirm</button>
        <button id="modal-cancel">Cancel</button>
      </div>
    </div>
  );
}

export default HomepageMock;
