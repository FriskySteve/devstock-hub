"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CartItem } from "@/lib/types";

interface CartSummaryProps {
  totalQuantity: number;
  totalPrice: number;
  selectedItems: CartItem[];
  disabled: boolean;
  onCheckout?: () => void;
}

export default function CartSummary({
  totalQuantity,
  totalPrice,
  selectedItems,
  disabled = false,
  onCheckout,
}: CartSummaryProps) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (totalQuantity === 0) {
      alert("Your cart is empty");
      return;
    }

    setIsProcessing(true);

    try {
      if (selectedItems && selectedItems.length > 0) {
        sessionStorage.setItem("checkout_items", JSON.stringify(selectedItems));
      }

      router.push("/checkout");
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to proceed to checkout");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full lg:w-[400px] bg-[var(--gray-50)] border border-[var(--gray-200)] rounded-lg p-6 h-fit sticky top-6">
      <h2 className="text-xl font-semibold text-[var(--neutral-900)] mb-6">
        Order Summary
      </h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-[var(--neutral-600)]">
          <span>Items ({totalQuantity})</span>
          <span className="font-medium">${totalPrice.toFixed(2)}</span>
        </div>

        <div className="pt-4 border-t border-[var(--gray-200)]">
          <div className="flex justify-between text-lg">
            <span className="font-semibold text-[var(--neutral-900)]">
              Subtotal
            </span>
            <span className="font-bold text-[var(--primary-500)]">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onCheckout || handleCheckout}
        disabled={disabled || isProcessing || totalQuantity === 0}
        className="w-full bg-[var(--primary-500)] hover:bg-[var(--primary-600)] text-white font-semibold py-4 rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isProcessing ? "Processing..." : "Proceed to Checkout"}
      </button>
    </div>
  );
}
