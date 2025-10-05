"use client";

import { Button } from "@/components/shared/Button";
import { useSearchParams, useRouter } from "next/navigation";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-screen flex items-center justify-center text-[var(--neutral-900)]">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">
          Your order was placed successfully!
        </h1>
        <p className="text-[var(--gray-600)] mb-6">Order number: #{orderId}</p>
        <Button
          onClick={() => router.push("/profile")}
          variant="fill"
          size="xl"
          className="mx-auto w-full"
        >
          View my orders
        </Button>
      </div>
    </div>
  );
}
