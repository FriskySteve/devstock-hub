"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { User } from "@/lib/types";
import UserIcon from "@/components/icons/UserIcon";
import OrderIcon from "@/components/icons/OrderIcon";
import { Button } from "@/components/shared/Button";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/signin?callbackUrl=/profile");
      return;
    }

    if (status === "authenticated") {
      fetchUserData();
    }
  }, [status, router]);

  const fetchUserData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/profile");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch user data");
      }

      if (data.success && data.user) {
        setUser(data.user);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/auth/signin" });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
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

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-[var(--neutral-600)] text-lg">
          Loading profile...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <div className="text-red-500 text-lg">{error}</div>
        <Button onClick={fetchUserData} variant="fill" size="m">
          Try Again
        </Button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-[var(--neutral-600)] text-lg">User not found</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col py-10 px-6">
      <Breadcrumb />
      <div className="mt-8 flex gap-12 pt-12 max-lg:flex-col">
        <div className="w-80 flex-shrink-0 max-lg:w-full">
          <div className="bg-[var(--gray-50)] border border-[var(--gray-200)] rounded-md p-6">
            <div className="flex gap-6 pb-6 border-b-2 border-[var(--gray-200)] mb-6">
              <div className="w-18 h-18 rounded-full bg-gradient-to-br from-orange-200 to-orange-400 border-2 border-orange-500 flex items-center justify-center">
                <UserIcon />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-text-l font-medium text-[var(--neutral-600)]">
                  User
                </h3>
                <p className="text-text-s text-[var(--neutral-500)] mb-1">
                  {user.email}
                </p>
                <p className="text-text-s text-[var(--neutral-500)]">
                  {user.phone}
                </p>
              </div>
            </div>

            <div className="mb-6 space-y-3">
              <div>
                <p className="text-text-s text-[var(--neutral-500)]">Country</p>
                <p className="text-text-m font-medium text-[var(--neutral-600)]">
                  {user.country}
                </p>
              </div>
              <div>
                <p className="text-text-s text-[var(--neutral-500)]">
                  Member since
                </p>
                <p className="text-text-m font-medium text-[var(--neutral-600)]">
                  {formatDate(user.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-text-s text-[var(--neutral-500)]">
                  Total Orders
                </p>
                <p className="text-text-m font-medium text-[var(--neutral-600)]">
                  {user.orders?.length || 0}
                </p>
              </div>
            </div>

            <Button
              onClick={handleSignOut}
              variant="fill"
              size="l"
              className="w-full"
            >
              Logout
            </Button>
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-6">
            <h2 className="text-text-2xl font-semibold text-[var(--primary-500)] mb-4 pb-4 border-b-2 border-[var(--primary-500)]">
              Order History
            </h2>
          </div>

          {!user.orders || user.orders.length === 0 ? (
            <div className="text-center py-12 bg-[var(--gray-50)] rounded-md border border-[var(--gray-200)] items-center justify-center flex flex-col gap-4">
              <div className="text-text-l text-[var(--neutral-600)] mb-2">
                No orders yet
              </div>
              <p className="text-text-m text-[var(--neutral-500)] mb-6">
                Start shopping to see your orders here
              </p>
              <Button
                onClick={() => router.push("/product")}
                variant="fill"
                size="m"
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {user.orders.map((order) => {
                return (
                  <div
                    key={order.id}
                    className="bg-[var(--gray-50)] border border-[var(--gray-200)] rounded-md p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 mt-1">
                        <OrderIcon />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="text-text-l font-semibold text-[var(--neutral-900)] mb-1">
                              Order #{order.id}
                            </div>
                            <div className="text-text-m text-[var(--neutral-500)]">
                              {formatDate(order.createdAt)} at{" "}
                              {formatTime(order.createdAt)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-text-s text-[var(--neutral-500)] mb-1">
                              Status
                            </div>
                            <span className="inline-block px-3 py-1 bg-[var(--primary-100)] text-[var(--primary-600)] rounded-full text-text-s font-medium">
                              {order.status || "Completed"}
                            </span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-text-m font-medium text-[var(--neutral-600)] mb-2">
                            Items ({order.items.length})
                          </h4>
                          <div className="space-y-2">
                            {order.items.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between gap-4 text-text-m"
                              >
                                <div className="flex items-center gap-2 flex-1">
                                  <span className="w-2 h-2 bg-[var(--primary-500)] rounded-full"></span>
                                  <span className="text-[var(--neutral-900)] font-medium">
                                    {item.product.name}
                                  </span>
                                  <span className="text-[var(--neutral-500)]">
                                    × {item.quantity}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
