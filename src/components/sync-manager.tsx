"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/store";

export function SyncManager() {
  const { isLoggedIn, syncData, isSyncing } = useCartStore();

  useEffect(() => {
    if (isLoggedIn && !isSyncing) {
      syncData();
    }
  }, [isLoggedIn, syncData]); // Only trigger when login state changes or sync function changes

  return null;
}
