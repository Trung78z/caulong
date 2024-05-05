"use client";
import React, { Suspense, lazy } from "react";
/*-------------------------------------- */

import "./page.scss";
import LoadingPage from "@/components/Loading/Loading";
import Hero from "@/components/Loading/Hero";
const Slider = lazy(() => import("@/components/ui/Home/Slider"));
/*-------------------------------------- */
export default function Home() {
  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <Slider />
      </Suspense>
      <Hero />
    </>
  );
}
