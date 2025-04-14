"use client";

import { memo } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/store/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    // Show toast notification

    toast.success(`${product.title} added to cart!`, {
      description: (
        <span className="text-sm text-muted-foreground">{`Price: $${product.price.toFixed(
          2
        )}`}</span>
      ),
    });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="line-clamp-1 text-lg">{product.title}</CardTitle>
      </CardHeader>
      <div className="relative h-48 mx-4">
        <Image
          src={product.images[0] || "/placeholder.png"}
          alt={product.title}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {product.description}
        </p>
        <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground">
          Category: {product.category.name}
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddToCart} className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default memo(ProductCard);
