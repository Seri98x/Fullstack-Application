import React from "react";


function ProductDetailsMock() {
    React;
    
  return (
    <div>
      <h1>Product Details</h1>
      <div>
        <img src="https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg" alt="Product" />
      </div>
      <div>
        <label htmlFor="product-name">Name:</label>
        <input id="product-name" type="text" placeholder="Product Name" />
      </div>
      <div>
        <label htmlFor="product-description">Description:</label>
        <input id="product-description" type="text" placeholder="Product Description" />
      </div>
      <div>
        <label htmlFor="product-price">Price:</label>
        <input id="product-price" type="number" placeholder="Product Price" />
      </div>
      <button id="update-button">Update</button>
      <button id="delete-button">Delete</button>
    </div>
  );
}

export default ProductDetailsMock;
