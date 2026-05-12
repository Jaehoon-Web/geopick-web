"use client";

import { useReveal } from "@/lib/useReveal";
import { useSmoothScroll } from "@/lib/smoothScroll";

export function PageEffects() {
  useReveal();
  useSmoothScroll();
  return null;
}
