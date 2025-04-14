"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectProducts,
  selectProductsStatus,
  selectHasMore,
} from "@/lib/store/features/products/productsSlice";
import ProductList from "./product-list";
import CartSummary from "./cart-summary";
import CategoryFilter from "./category-filter";
import SearchBar from "./search-bar";
import type { AppDispatch } from "@/lib/store/store";
import type { Product } from "@/types";

export default function ProductListingPage() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);
  const hasMore = useSelector(selectHasMore);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const limit = 10;

  useEffect(() => {
    // fetch initial products

    dispatch(fetchProducts({ offset: 0, limit }));
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        status !== "loading" &&
        hasMore
      ) {
        const offset = products.length;
        if (offset > 70) return;
        dispatch(fetchProducts({ offset, limit }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, products.length, status, hasMore]);

  const filteredProducts = products.filter((product: Product) => {
    const matchesSearch =
      searchTerm === "" ||
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === null || product.category.name === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
      <div className="lg:col-span-3">
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <SearchBar onSearch={handleSearch} />
          <CategoryFilter onCategoryChange={handleCategoryChange} />
        </div>

        {status === "loading" && products.length === 0 && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}

        {status === "failed" && (
          <div className="text-destructive text-center py-8">
            Failed to load products. Please try again later.
          </div>
        )}

        {status !== "failed" && (
          <>
            <ProductList products={filteredProducts} />
            {status === "loading" && products.length > 0 && (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="xl:block hidden">
        <CartSummary />
      </div>
    </div>
  );
}
