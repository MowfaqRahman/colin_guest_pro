"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/store";
import { useSession } from "next-auth/react";
import { getOrCreateShopifyCustomer } from "@/app/actions/shopify";


export function SyncManager() {
  const { isLoggedIn, syncData, isSyncing, customerId, hasLoggedOut } = useCartStore();
  const { data: session, status } = useSession();

  useEffect(() => {
    // If user is logged in via Google but not in our store, sync them
    // ONLY if they haven't explicitly logged out in this session
    if (status === "authenticated" && session?.user && !isLoggedIn && !hasLoggedOut) {
      const email = session.user.email || "";
      const firstName = session.user.name?.split(" ")[0] || "";
      const lastName = session.user.name?.split(" ").slice(1).join(" ") || "";

      // Resolve real Shopify ID for Google users
      getOrCreateShopifyCustomer(email, firstName, lastName).then(result => {
        useCartStore.setState({
          isLoggedIn: true,
          user: { email, firstName, lastName },
          customerId: result.customerId || `google-${email}`, // Fallback if admin API fails
          hasLoggedOut: false
        });
      });
    }

  }, [status, session, isLoggedIn, hasLoggedOut]);

  useEffect(() => {
    if (isLoggedIn && !isSyncing && customerId) {
      syncData();
    }
    // We only want to trigger this when the user identity actually changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, customerId]);

  return null;
}
