"use client";
import { useEffect } from "react";

/** Remembers the store a visitor looked at so the mobile bar can act in one tap. */
export default function StoreMemory({ id }: { id: string }) {
  useEffect(() => {
    try {
      localStorage.setItem("gfe_store", id);
      window.dispatchEvent(new Event("gfe:store"));
    } catch {}
  }, [id]);
  return null;
}
