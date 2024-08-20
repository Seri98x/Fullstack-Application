import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Define the async thunks

// Fetch products with Bearer token
export const getProductsAsync = createAsyncThunk<Product[], void>(
  'prod/getProducts',
  async () => {
    let token = sessionStorage.getItem('token');
    if (token) {
      token = token.replace(/^"|"$/g, ''); // Remove quotes from start and end
    }    
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.get('https://seri98.pythonanywhere.com/api/items', { headers });
    const products = response.data as Product[];
    return products;
  }
);

// Create a new product
export const createProductAsync = createAsyncThunk<Product, Partial<Product>>(
  'prod/createProduct',
  async (product) => {
    let token = sessionStorage.getItem('token');
    if (token) {
      token = token.replace(/^"|"$/g, ''); // Remove quotes from start and end
    }

    const prod: ProductDto = {
      name: product.name,
      description: product.description,
      price: product.price,
    } as ProductDto;

  

    const headers = {
      ... (token ? { Authorization: `Bearer ${token}` } : {}),
      'Content-Type': 'application/json',
    };    const response = await axios.post('https://seri98.pythonanywhere.com/api/items', prod, { headers });
    const newProduct = response.data as Product;
    return newProduct;
  }
);

// Update an existing product
export const updateProductAsync = createAsyncThunk<Product, Product>(
  'prod/updateProduct',
  async (product) => {
    let token = sessionStorage.getItem('token');
    if (token) {
      token = token.replace(/^"|"$/g, ''); // Remove quotes from start and end
    }
    
    const prod: ProductDto = {
      name: product.name,
      description: product.description,
      price: product.price,
    } as ProductDto;

    const headers = {
      ... (token ? { Authorization: `Bearer ${token}` } : {}),
      'Content-Type': 'application/json',
    };  

    const response = await axios.put(`https://seri98.pythonanywhere.com/api/items/${product.id}`, prod, { headers });
    const updatedProduct = response.data as Product;
    return updatedProduct;
  }
);

// Delete a product
export const deleteProductAsync = createAsyncThunk<string, string>(
  'prod/deleteProduct',
  async (productId) => {
    let token = sessionStorage.getItem('token');
    if (token) {
      token = token.replace(/^"|"$/g, ''); // Remove quotes from start and end
    }
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    await axios.delete(`https://seri98.pythonanywhere.com/api/items/${productId}`, { headers });
    return productId;
  }
);

interface ProductState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}


interface ProductDto {
  name: string;
  description: string;
  price: number;
}

const initialState: ProductState = {
  products: [],
  status: 'idle',
  error: null
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle getProductsAsync
      .addCase(getProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductsAsync.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(getProductsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })
      // Handle createProductAsync
      .addCase(createProductAsync.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
      })
      // Handle updateProductAsync
      .addCase(updateProductAsync.fulfilled, (state, action: PayloadAction<Product>) => {
        const updatedProduct = action.payload;
        const index = state.products.findIndex(product => product.id === updatedProduct.id);
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      })
      // Handle deleteProductAsync
      .addCase(deleteProductAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.products = state.products.filter(product => product.id !== action.payload);
      });
  }
});

export default productSlice.reducer;
