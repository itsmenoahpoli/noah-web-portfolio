"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number;
  pauseOnHover?: boolean;
  direction?: "horizontal" | "vertical" | "left" | "right" | "up" | "down";
  reverse?: boolean;
  fade?: boolean;
  fadeAmount?: number;
}

export function Marquee({
  children,
  className,
  duration = 20,
  pauseOnHover = false,
  direction = "horizontal",
  reverse = false,
  fade = true,
  fadeAmount = 10,
  ...props
}: MarqueeProps) {
  const [isPaused, setIsPaused] = React.useState(false);

  const items = React.Children.toArray(children);
  const resolvedDirection =
    direction === "horizontal"
      ? reverse
        ? "right"
        : "left"
      : direction === "vertical"
        ? reverse
          ? "down"
          : "up"
        : direction;
  const isVertical =
    resolvedDirection === "up" || resolvedDirection === "down";
  const animationName =
    resolvedDirection === "right"
      ? "marquee-scroll-reverse"
      : resolvedDirection === "up"
        ? "marquee-scroll-y"
        : resolvedDirection === "down"
          ? "marquee-scroll-y-reverse"
          : "marquee-scroll";

  return (
    <>
      <style jsx global>{`
        @keyframes marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-scroll-reverse {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes marquee-scroll-y {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-50%);
          }
        }

        @keyframes marquee-scroll-y-reverse {
          from {
            transform: translateY(-50%);
          }
          to {
            transform: translateY(0);
          }
        }

      `}</style>
      <div
        className={cn(
          "flex w-full overflow-hidden",
          isVertical && "flex-col",
          className,
        )}
        style={{
          ...(fade && {
            maskImage: isVertical
              ? `linear-gradient(to bottom, transparent 0%, black ${fadeAmount}%, black ${
                  100 - fadeAmount
                }%, transparent 100%)`
              : `linear-gradient(to right, transparent 0%, black ${fadeAmount}%, black ${
                  100 - fadeAmount
                }%, transparent 100%)`,
            WebkitMaskImage: isVertical
              ? `linear-gradient(to bottom, transparent 0%, black ${fadeAmount}%, black ${
                  100 - fadeAmount
                }%, transparent 100%)`
              : `linear-gradient(to right, transparent 0%, black ${fadeAmount}%, black ${
                  100 - fadeAmount
                }%, transparent 100%)`,
          }),
        }}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        {...props}
      >
        <div
          className={cn(
            "flex shrink-0",
            isVertical ? "h-max flex-col" : "w-max items-center",
          )}
          style={{
            animationName,
            animationDuration: `${duration}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationPlayState: isPaused ? "paused" : "running",
            willChange: "transform",
          }}
        >
          {items.map((item, index) => (
            <div
              key={`first-${index}`}
              className={cn(
                "flex shrink-0",
                isVertical ? "w-full" : "items-center",
              )}
            >
              {item}
            </div>
          ))}
          {items.map((item, index) => (
            <div
              key={`second-${index}`}
              className={cn(
                "flex shrink-0",
                isVertical ? "w-full" : "items-center",
              )}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
