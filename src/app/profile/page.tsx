"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { User } from "@/lib/types";
import UserIcon from "@/components/icons/UserIcon";
import OrderIcon from "@/components/icons/OrderIcon";
import { Button } from "../../components/Button";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }

    if (status === "authenticated") {
      fetchUserData();
    }
  }, [status, router]);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/profile");
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-white text-lg">User not found</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col py-10">
      <Breadcrumb />

      <div className="mt-8 flex gap-12 pt-12">
        <div className="w-80 flex-shrink-0">
          <div className="bg-[var(--gray-50)] border border-[var(--gray-200)] rounded-md p-6">
            <div className="flex gap-6 pb-6 border-b-2 border-[var(--gray-200)] mb-6">
              <div className="w-18 h-18 rounded-full bg-gradient-to-br from-orange-200 to-orange-400 border-2 border-orange-500 flex items-center justify-center ">
                <UserIcon />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-text-l font-medium text-[var(--neutral-600)]">
                  {user.phone}
                </h3>
                <p className="text-text-s text-[var(--neutral-500)]">
                  {user.email}
                </p>
              </div>
            </div>
            <Button
              onClick={handleSignOut}
              style={"fill"}
              size={"l"}
              className="w-full"
            >
              Logout
            </Button>
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-6 w-1/2">
            <h2 className="text-text-l font-semibold text-[var(--primary-500)] mb-4 pb-4 text-center border-b-2 border-[var(--primary-500)]">
              Transactions
            </h2>
          </div>

          {user.orders.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-text-m text-[var(--neutral-500)]">
                No transactions found
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {user.orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-[var(--gray-50)] border border-[var(--gray-200)] rounded-md p-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6  rounded flex items-center justify-center flex-shrink-0 mt-1">
                      <OrderIcon />
                    </div>

                    <div className="flex-1">
                      <div className="text-text-m text-[var(--neutral-500)] mb-4">
                        {formatDate(order.createdAt)}{" "}
                        {formatTime(order.createdAt)}
                      </div>

                      <div className="text-text-l font-medium mb-3">
                        Your order nr {order.id}
                      </div>

                      <div className="space-y-1">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-2 text-text-m text-[var(--neutral-600)]"
                          >
                            <span className="w-2 h-2 bg-[var(--neutral-600)] rounded-full"></span>
                            <span className="text-text-l font-medium">
                              {item.product.name}
                            </span>
                            <span className="text-[var(--neutral-500)]">
                              ({item.quantity})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
