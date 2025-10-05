"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CartItem } from "@/lib/types";
import Products from "@/components/cart/Products";
import CartSummary from "@/components/cart/CartSummary";
import Loader from "@/components/Loader";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/shared/Button";

export default function CartPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selected, setSelected] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchCart() {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/cart");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch cart");
      }

      if (!data.items || data.items.length === 0) {
        setCart([]);
        setSelected([]);
        return;
      }

      setCart(data.items);
      setSelected(data.items);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Cart fetch error:", err.message);
      } else {
        setError("Unknown error occurred");
        console.error("Unknown error");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/cart");
      return;
    }

    if (status === "authenticated") {
      fetchCart();
    }
  }, [status, router]);

  const handleCheckout = () => {
    if (selected.length > 0) {
      sessionStorage.setItem("checkout_items", JSON.stringify(selected));
      router.push("/checkout");
    }
  };

  if (status === "loading" || isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-500 text-xl font-semibold mb-4">{error}</p>
          <button
            onClick={fetchCart}
            className="bg-primary-500 text-white px-6 py-2 rounded-md hover:bg-primary-600"
          >
            Spróbuj ponownie
          </button>
        </div>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="px-[40px] py-[40px]">
        <Breadcrumb />
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-[28px] text-[var(--neutral-900)] font-semibold text-center mb-6">
            Your cart is empty
          </p>
          <p className="text-[var(--neutral-600)] mb-8">
            Add products to your cart to get started!
          </p>
          <Button
            onClick={() => router.push("/product")}
            variant="fill"
            size="xl"
            className="mx-auto w-1/3"
          >
            Continue shopping
          </Button>
        </div>
      </div>
    );
  }

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
        <CartSummary
          totalQuantity={totalQty}
          totalPrice={totalPrice}
          selectedItems={selected}
          disabled={selected.length === 0}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
}
