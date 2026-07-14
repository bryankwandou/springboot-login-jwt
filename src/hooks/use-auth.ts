"use client";

import { useEffect, useState } from "react";
import { getAuthToken } from "@/services/auth-client";

export function useAuthToken() {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setToken(getAuthToken());
    setReady(true);
  }, []);

  return {
    token,
    ready,
    setToken,
  };
}
