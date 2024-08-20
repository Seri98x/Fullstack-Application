import { PayloadAction, createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const getProductsAsync = createAsyncThunk<Product[], void>(
  'prod/getProducts',
  async () => {
    // Retrieve the token from sessionStorage
    let token = sessionStorage.getItem('token');
    if (token) {
      token = token.replace(/^"|"$/g, ''); // Remove quotes from start and end
    }    // Configure the request headers
    const headers = token ? { Authorization: `Bearer ${token}`} : {};
  
    // Make the API request with the Bearer token
    const response = await axios.get('https://seri98.pythonanywhere.com/api/items', { headers });
    
    // Extract the product data from the response
    const products = response.data as Product[];
    return products;
  }
);


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
  products: [],     
}


const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: 
  {
    setProducts:(state,action:PayloadAction<Product[]>) => {
      state.products = action.payload;
    }
    ,
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
  extraReducers:(builder) => {
      builder.addCase(getProductsAsync.fulfilled, (state,action:PayloadAction<Product[]>) =>{
        state.products = action.payload;
      })
  }
  
});

export const {deleteProduct,addProduct,updateProduct} = productSlice.actions;

export default productSlice.reducer;