"use client";

import AnimatedCursor from "react-animated-cursor";

export default function Cursor() {
  return (
    <AnimatedCursor
      innerSize={8}
      outerSize={35}
      innerScale={1}
      outerScale={2}
      outerAlpha={0}
      innerStyle={{
        backgroundColor: "var(--foreground)",
      }}
      outerStyle={{
        border: "2px solid var(--foreground)",
      }}
    />
  );
}
