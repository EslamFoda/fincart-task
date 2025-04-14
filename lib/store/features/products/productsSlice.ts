import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Product, Category } from "@/types";
import axios from "axios";
import { RootState } from "../../store";

interface ProductsState {
  items: Product[];
  categories: Category[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  hasMore: boolean;
}

const initialState: ProductsState = {
  items: [],
  categories: [],
  status: "idle",
  error: null,
  hasMore: true,
};

interface FetchProductsArgs {
  offset: number;
  limit: number;
}

// Define the return type for fetchProducts
interface FetchProductsResponse {
  products: Product[];
  hasMore: boolean;
}

export const fetchProducts = createAsyncThunk<
  FetchProductsResponse,
  FetchProductsArgs
>("products/fetchProducts", async ({ offset, limit }: FetchProductsArgs) => {
  const response = await axios.get(
    `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
  );
  return { products: response.data, hasMore: response.data.length === limit };
});

export const fetchCategories = createAsyncThunk<Category[], void>(
  "products/fetchCategories",
  async () => {
    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/categories"
    );
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProducts.fulfilled,
        (
          state,
          action: PayloadAction<
            FetchProductsResponse,
            string,
            { arg: FetchProductsArgs }
          >
        ) => {
          state.status = "succeeded";
          const newProducts = action.payload.products;

          if (action.meta.arg.offset === 0) {
            // Replace items for initial fetch
            state.items = newProducts;
          } else {
            // Append unique products for infinite scroll
            const existingIds = new Set(state.items.map((p) => p.id));
            const uniqueNewProducts = newProducts.filter(
              (p) => !existingIds.has(p.id)
            );
            state.items = [...state.items, ...uniqueNewProducts];
          }

          state.hasMore = action.payload.hasMore;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.categories = action.payload;
        }
      );
  },
});

export const selectProducts = (state: RootState) => state.products.items;
export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectCategories = (state: RootState) => state.products.categories;
export const selectHasMore = (state: RootState) => state.products.hasMore;

export default productsSlice.reducer;
