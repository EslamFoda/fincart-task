"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "@/lib/store/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

export default function CartSummary() {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Your Cart</CardTitle>
          <Badge variant="secondary">
            <ShoppingCart className="h-4 w-4 mr-1" />
            {cartItems.reduce((total, item) => total + item.quantity, 0)} items
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {cartItems.length === 0 ? (
          <div className="text-center py-6">
            <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="mt-2 text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-2 pb-4 border-b">
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <img
                      src={item.images[0] || "/placeholder.png"}
                      alt={item.title}
                      className="object-cover rounded-md h-full w-full"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-sm font-medium line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center mt-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => dispatch(decrementQuantity(item.id))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="mx-2 text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => dispatch(incrementQuantity(item.id))}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 ml-auto text-red-500"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="flex justify-between w-full py-2 font-bold">
          <span>Total:</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <Button className="w-full mt-2" disabled={cartItems.length === 0}>
          Checkout
        </Button>
      </CardFooter>
    </Card>
  );
}
