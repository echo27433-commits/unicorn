"use client";

import dynamic from "next/dynamic";

const LineWaves = dynamic(() => import("./LineWaves"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-black" aria-hidden />
  ),
});

export default LineWaves;
