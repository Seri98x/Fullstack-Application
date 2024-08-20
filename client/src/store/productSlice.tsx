// // // productSlice.ts
// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import axios from 'axios';

// // // Define the async thunks for API interactions
// // export const fetchProducts = createAsyncThunk<Product[], void>(
// //   'products/fetchProducts',
// //   async () => {
// //     const response = await axios.get('http://localhost:5000/products');
// //     return response.data;
// //   }
// // );

// // export const createProduct = createAsyncThunk<Product, Partial<Product>>(
// //   'products/createProduct',
// //   async (product) => {
// //     const response = await axios.post('http://localhost:5000/products', product);
// //     return response.data;
// //   }
// // );

// // export const updateProduct = createAsyncThunk<Product, Product>(
// //   'products/updateProduct',
// //   async (product) => {
// //     const response = await axios.put(`http://localhost:5000/products/${product.id}`, product);
// //     return response.data;
// //   }
// // );

// // export const deleteProduct = createAsyncThunk<number, number>(
// //   'products/deleteProduct',
// //   async (productId) => {
// //     await axios.delete(`http://localhost:5000/products/${productId}`);
// //     return productId;
// //   }
// // );

// // // Define the Product type
// // interface Product {
// //   id: number;
// //   name: string;
// //   price: number;
// //   // Add other fields as needed
// // }

// // // Define the initial state
// // interface ProductsState {
// //   products: Product[];
// //   status: 'idle' | 'loading' | 'succeeded' | 'failed';
// //   error: string | null;
// // }

// // const initialState: ProductsState = {
// //   products: [],
// //   status: 'idle',
// //   error: null,
// // };

// // // Create the slice
// // const productSlice = createSlice({
// //   name: 'products',
// //   initialState,
// //   reducers: {},
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(fetchProducts.pending, (state) => {
// //         state.status = 'loading';
// //       })
// //       .addCase(fetchProducts.fulfilled, (state, action) => {
// //         state.status = 'succeeded';
// //         state.products = action.payload;
// //       })
// //       .addCase(fetchProducts.rejected, (state, action) => {
// //         state.status = 'failed';
// //         state.error = action.error.message || 'Failed to fetch products';
// //       })
// //       .addCase(createProduct.fulfilled, (state, action) => {
// //         state.products.push(action.payload);
// //       })
// //       .addCase(updateProduct.fulfilled, (state, action) => {
// //         const index = state.products.findIndex((product) => product.id === action.payload.id);
// //         if (index !== -1) {
// //           state.products[index] = action.payload;
// //         }
// //       })
// //       .addCase(deleteProduct.fulfilled, (state, action) => {
// //         state.products = state.products.filter((product) => product.id !== action.payload);
// //       });
// //   },
// // });



// // // Export the reducer
// // export default productSlice.reducer;

// // // Selectors
// // export const selectAllProducts = (state: { products: any }) => state.products.products;
// // export const selectProductStatus = (state: { products: any }) => state.products.status;
// // export const selectProductError = (state: { products: any }) => state.products.error;


// // productSlice.ts
// // productSlice.ts
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchProducts = createAsyncThunk<Product[], void>(
//   'products/fetchProducts',
//   async () => {
//     // Simulated fetch
//     return [
//       { id: 1, name: 'Product 1', description: 'Description for product 1', price: 29.99, picture: 'https://example.com/product1.png' },
//       // Add other products here for testing
//     ];
//   }
// );

// // Define the async thunk for creating a product
// export const createProduct = createAsyncThunk<Product, Partial<Product>>(
//     'products/createProduct',
//     async (product) => {
//       // Simulated create with static data
//       console.log(product)
//       return { id: Date.now(), ...product } as Product; // Use Date.now() for a simple unique ID
//     }
//   );


  


// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   picture: string;
// }


// interface ProductsState {
//     products: Product[];
//   }

// const initialState: ProductsState = {
//     products: [{id: 1, name: 'Product 1', description: 'Description for product 1', price: 29.99, picture: 'https://example.com/product1.png'},
//         {id: 2, name: 'Product 2', description: 'Description for product 1', price: 29.99, picture: 'https://example.com/product1.png'}
//     ], // Initialize as an empty array of products
//   };
  

// const productSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {
    
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
        
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
   
//         state.products = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
       
//       })
//       .addCase(createProduct.fulfilled, (state, action) => {
//         state.products.push(action.payload); // Add the new product to the state
//       });

//   },
// });

// export default productSlice.reducer;

// export const selectAllProducts = (state: { products: ProductsState }) => state.products;


import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface ProductState {
 products : Product[];
}

interface Product {
  id:string,
  name:string,
  description:string,
  price:number
}

const initialState: ProductState  = {
  products: [ {
    id: "1",
    name: "Wireless Mouse",
    description: "A high-precision wireless mouse with ergonomic design.",
    price: 29.99
},
{
    id: "2",
    name: "Keyboard",
    description: "A mechanical keyboard with customizable RGB lighting.",
    price: 79.99
},
{
    id: "3",
    name: "Laptop Stand",
    description: "An adjustable laptop stand to improve your workstation setup.",
    price: 39.99
},
{
    id: "4",
    name: "USB-C Hub",
    description: "A USB-C hub with multiple ports for connectivity.",
    price: 24.99
}],     
}


const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: 
  {
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const updatedProduct = action.payload;
      const index = state.products.findIndex(product => product.id === updatedProduct.id);
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
    }
  },
});

export const {deleteProduct,addProduct,updateProduct} = productSlice.actions;

export default productSlice.reducer;