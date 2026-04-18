"use client";

import * as React from "react";

export function Marquee({
  children,
  speedSeconds = 28,
  className,
}: React.PropsWithChildren<{
  speedSeconds?: number;
  className?: string;
}>) {
  return (
    <div
      className={["marquee", className ?? ""].join(" ")}
      style={{ ["--marquee-duration" as never]: `${speedSeconds}s` }}
    >
      <div className="marquee__fade marquee__fade--left" aria-hidden="true" />
      <div className="marquee__fade marquee__fade--right" aria-hidden="true" />

      <div className="marquee__track">
        <div className="marquee__row">{children}</div>
        <div className="marquee__row" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

