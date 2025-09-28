"use client";
import { useEffect, useState } from "react";
import { CartItem } from "@/lib/types";
import Products from "@/components/cart/Products";
import Detailer from "@/components/cart/Detailer";
import Loader from "@/components/Loader";
import Breadcrumb from "@/components/Breadcrumb";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>();
  const [selected, setSelected] = useState<CartItem[]>(cart || []);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function fetchCart() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/cart");
      if (!res.ok) {
        const data = await res.json();
        console.log(data.error || "Błąd pobierania koszyka");
      }
      const data = await res.json();
      setCart(data.items);
      setSelected(data.items);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("Nieznany błąd");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  if (isLoading) return <Loader />;

  if (!cart || cart?.length === 0)
    return (
      <p className="flex justify-center py[40px] text-[28px] text-neutral-50 font-semibold text-center px-[40px]">
        No products to display! Add some products to cart.
      </p>
    );
  else {
    const totalPrice = selected.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );
    const totalQty = selected.reduce((sum, item) => sum + item.quantity, 0);

    return (
      <div className="px-[40px] py-[40px]">
        <Breadcrumb />
        <div className="flex justify-between gap-[10px] max-[1200px]:flex-col">
          <Products
            selected={selected}
            setSelected={setSelected}
            fetchCart={fetchCart}
            cart={cart}
          />
          <Detailer totalQuantity={totalQty} totalPrice={totalPrice} />
        </div>
      </div>
    );
  }
}
