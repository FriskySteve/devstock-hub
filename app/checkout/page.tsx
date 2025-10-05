"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CartItem } from "@/lib/types";
import ShieldIcon from "@/components/icons/ShieldIcon";
import ApplePayIcon from "@/components/icons/ApplePayIcon";

interface Address {
  country: string;
  province: string;
  city: string;
  postalCode: string;
  addressLine: string;
  isMain: boolean;
}

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [addressType, setAddressType] = useState<"existing" | "new">("new");
  const [address, setAddress] = useState<Address>({
    country: "Indonesia",
    province: "",
    city: "",
    postalCode: "",
    addressLine: "",
    isMain: false,
  });
  const [productProtection, setProductProtection] = useState(true);
  const [shippingMethod] = useState("NexusHub Courier");
  const [paymentMethod] = useState("Apple Pay");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/checkout");
      return;
    }

    if (status === "authenticated") {
      const storedItems = sessionStorage.getItem("checkout_items");
      if (storedItems) {
        try {
          const parsedItems = JSON.parse(storedItems);
          if (parsedItems && parsedItems.length > 0) {
            setCart(parsedItems);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error("Failed to parse stored items:", e);
        }
      }

      fetchCart();
    }
  }, [status, router]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch cart");
      }

      if (!data.items || data.items.length === 0) {
        router.push("/cart");
        return;
      }

      setCart(data.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = () => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const protection = productProtection ? 1 : 0;
    const shipping = 5;
    const insurance = 6;
    const serviceFee = 0.5;
    const total = subtotal + protection + shipping + insurance + serviceFee;

    return {
      subtotal,
      totalItems,
      protection,
      shipping,
      insurance,
      serviceFee,
      total,
    };
  };

  const handleSubmitOrder = async () => {
    if (addressType === "new") {
      if (
        !address.province ||
        !address.city ||
        !address.postalCode ||
        !address.addressLine
      ) {
        setError("Please fill in all address fields.");
        return;
      }
    }

    setSubmitting(true);
    setError(null);

    try {
      const totals = calculateTotals();

      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
          })),
          address: addressType === "new" ? address : null,
          shippingMethod,
          paymentMethod,
          totals: {
            subtotal: totals.subtotal,
            shipping: totals.shipping,
            insurance: totals.insurance,
            serviceFee: totals.serviceFee,
            protection: totals.protection,
            total: totals.total,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create order");
      }

      sessionStorage.removeItem("checkout_items");

      router.push(`/order/success?orderId=${data.order.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create order");
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading checkout...</div>
      </div>
    );
  }

  if (error && cart.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => router.push("/cart")}
            className="bg-[var(--primary-500)] text-white px-6 py-2 rounded-md"
          >
            Go to Cart
          </button>
        </div>
      </div>
    );
  }

  const totals = calculateTotals();

  return (
    <div className="min-h-screen text-[var(--neutral-900)] px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Order Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Your Order */}
          <h2 className="text-xl font-semibold mb-4 ">Your Order</h2>

          <section className="bg-[var(--base-white)] rounded-lg p-6 border border-[var(--gray-200)]">
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-start">
                  <div className="w-20 h-20 bg-[var(--gray-700)] rounded-lg overflow-hidden flex-shrink-0">
                    {item.product.images?.[0] && (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    {item.product.category && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-[var(--primary-500)] text-xs rounded">
                        {item.product.category.name}
                      </span>
                    )}
                    <p className="text-lg font-semibold mt-2">
                      ${item.product.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-[var(--gray-700)] rounded-md px-3 py-1">
                    <span className="px-3">{item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Product Protection */}
            <div className="mt-6 pt-6 border-t border-[var(--gray-700)]">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={productProtection}
                  onChange={(e) => setProductProtection(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded accent-[var(--primary-500)]"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <span className="font-medium">Product Protection</span>
                    <span className="font-semibold">${totals.protection}</span>
                  </div>
                  <p className="text-sm text-[var(--neutral-600)] mt-1">
                    The claim process is easy and instant, valid for 6 months
                  </p>
                </div>
              </label>
            </div>
          </section>

          {/* Address */}
          <section className="bg-[var(--base-white)] rounded-lg p-6 border border-[var(--gray-200)]">
            <h2 className="text-xl font-semibold mb-4">Address</h2>

            <div className="flex gap-4 mb-6 border-b border-[var(--gray-700)]">
              <button
                onClick={() => setAddressType("existing")}
                className={`pb-3 px-4 font-medium transition-colors ${
                  addressType === "existing"
                    ? "text-[var(--primary-500)] border-b-2 border-[var(--primary-500)]"
                    : "text-[var(--gray-400)]"
                }`}
              >
                Existing Address
              </button>
              <button
                onClick={() => setAddressType("new")}
                className={`pb-3 px-4 font-medium transition-colors ${
                  addressType === "new"
                    ? "text-[var(--primary-500)] border-b-2 border-[var(--primary-500)]"
                    : "text-[var(--gray-400)]"
                }`}
              >
                New Address
              </button>
            </div>

            {addressType === "new" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={address.country}
                    onChange={(e) =>
                      setAddress({ ...address, country: e.target.value })
                    }
                    className="bg-[var(--gray-700)] border border-[var(--gray-400)] rounded-md px-4 py-3 w-full"
                  >
                    <option value="Indonesia">Indonesia</option>
                    <option value="Poland">Poland</option>
                    <option value="USA">USA</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Province"
                    value={address.province}
                    onChange={(e) =>
                      setAddress({ ...address, province: e.target.value })
                    }
                    className="bg-[var(--gray-700)] border border-[var(--gray-400)] rounded-md px-4 py-3 w-full"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    className="bg-[var(--gray-700)] border border-[var(--gray-400)] rounded-md px-4 py-3 w-full"
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={address.postalCode}
                    onChange={(e) =>
                      setAddress({ ...address, postalCode: e.target.value })
                    }
                    className="bg-[var(--gray-700)] border border-[var(--gray-400)] rounded-md px-4 py-3 w-full"
                  />
                </div>
                <textarea
                  placeholder="Input Complete Address"
                  value={address.addressLine}
                  onChange={(e) =>
                    setAddress({ ...address, addressLine: e.target.value })
                  }
                  className="bg-[var(--gray-700)] border border-[var(--gray-400)] rounded-md px-4 py-3 w-full h-24 resize-none"
                />
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={address.isMain}
                    onChange={(e) =>
                      setAddress({ ...address, isMain: e.target.checked })
                    }
                    className="w-5 h-5 rounded accent-[var(--primary-500)]"
                  />
                  <span>Make it the main address</span>
                </label>
              </div>
            )}
          </section>

          {/* Shipping */}
          <section className="bg-[var(--base-white)] rounded-lg p-6 border border-[var(--gray-200)]">
            <h2 className="text-xl font-semibold mb-4">Shipping</h2>
            <div className="flex items-center gap-3 p-4 bg-[var(--gray-700)] rounded-md">
              <ShieldIcon />
              <span className="font-medium">{shippingMethod}</span>
            </div>
          </section>

          {/* Payment Method */}
          <section className="bg-[var(--base-white)] rounded-lg p-6 border border-[var(--gray-200)]">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="flex items-center gap-3 p-4 bg-[var(--gray-700)] rounded-md">
              <ApplePayIcon />
              <span className="font-medium">{paymentMethod}</span>
            </div>
          </section>
        </div>

        {/* Right Column - Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[var(--base-white)] rounded-lg p-6 sticky top-6 border border-[var(--gray-200)]">
            <h2 className="text-xl font-semibold mb-6 text-[var(--neutral-900)]">
              Total Product
            </h2>

            <div className="space-y-3 text-sm text-[var(--neutral-900)]">
              <div className="flex justify-between">
                <span className="text-[var(--neutral-600)]">
                  Total Product Price ({totals.totalItems} item.)
                </span>
                <span className="font-semibold">
                  ${totals.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--neutral-600)]">
                  Total Product Protection
                </span>
                <span className="font-semibold">${totals.protection}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--neutral-600)]">
                  Total Shipping Price
                </span>
                <span className="font-semibold">${totals.shipping}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--neutral-600)]">
                  Shipping Insurance
                </span>
                <span className="font-semibold">${totals.insurance}</span>
              </div>
            </div>

            <div className="my-6 pt-6 border-t border-[var(--gray-200)]">
              <h3 className="font-semibold mb-3">Transactions Fees</h3>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--neutral-600)]">Service Fees</span>
                <span className="font-semibold">${totals.serviceFee}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--gray-200)] mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Grand total</span>
                <span className="text-2xl font-bold text-[var(--primary-500)]">
                  ${totals.total.toFixed(2)}
                </span>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-md text-red-500 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmitOrder}
              disabled={submitting}
              className="w-full bg-[var(--primary-500)] hover:bg-[var(--primary-600)] text-[var(--base-white)] font-semibold py-4 rounded-md transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {submitting ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
