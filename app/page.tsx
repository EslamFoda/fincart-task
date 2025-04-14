"use client";

import { useEffect, useState, useRef } from "react";
import ProductListingPage from "@/components/product-listing-page";
import { Providers } from "@/lib/store/provider";
import { ShoppingBag } from "lucide-react";
import CartSummary from "@/components/cart-summary";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null); // Ref for the cart dropdown
  const iconRef = useRef<HTMLDivElement>(null); // Ref for the cart icon

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target as Node) &&
        iconRef.current &&
        !iconRef.current.contains(event.target as Node)
      ) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Providers>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">E-commerce Store</h1>
          <div className="xl:hidden block relative">
            <div ref={iconRef} className="cursor-pointer select-none" onClick={toggleCart}>
              <ShoppingBag />
            </div>
            {isCartOpen && (
              <div
                ref={cartRef}
                className="absolute top-8 right-0 rounded-lg w-72 z-10"
              >
                <CartSummary />
              </div>
            )}
          </div>
        </div>
        <ProductListingPage />
      </main>
    </Providers>
  );
}
