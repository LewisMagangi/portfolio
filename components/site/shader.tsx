"use client"

import { Dithering, type DitheringProps } from "@paper-design/shaders-react"
import { useTheme } from "next-themes"
import { Component, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

import { prefersReducedMotion } from "@/lib/dom"
import { cn } from "@/lib/utils"

class ShaderBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas")
    return !!(c.getContext("webgl2") || c.getContext("webgl"))
  } catch {
    return false
  }
}

type ShaderProps = {
  shape?: DitheringProps["shape"]
  type?: DitheringProps["type"]
  size?: number
  speed?: number
  scale?: number
  /** Gambit colour token name, e.g. "line-strong" */
  front?: string
  fade?: "right" | "bottom" | "radial"
  opacity?: number
  className?: string
  style?: CSSProperties
}

/**
 * The one texture: a Paper ordered-dither field behind a band. v8 performance fix: it renders at 1x, is capped
 * near 720p, and stops animating while off screen. Still under reduced motion; absent without WebGL.
 */
export function Shader({
  shape = "warp",
  type = "4x4",
  size = 2,
  speed = 0.4,
  scale = 1,
  front = "line-strong",
  fade,
  opacity = 1,
  className,
  style,
}: ShaderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const [colour, setColour] = useState<string | null>(null)
  const [visible, setVisible] = useState(true)
  const [still, setStill] = useState(false)

  useEffect(() => {
    if (!ref.current || !hasWebGL()) return
    // Read on the next frame: next-themes may update data-theme after this effect runs on a theme switch.
    const frame = requestAnimationFrame(() => {
      if (!ref.current) return
      const value = getComputedStyle(ref.current).getPropertyValue("--" + front).trim()
      setColour(value || "#6b6b6b")
      setStill(prefersReducedMotion())
    })
    return () => cancelAnimationFrame(frame)
  }, [front, resolvedTheme])

  useEffect(() => {
    const el = ref.current
    if (!el || !("IntersectionObserver" in window)) return
    const io = new IntersectionObserver((entries) => setVisible(entries[0].isIntersecting), {
      rootMargin: "120px 0px",
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("gb-shader", fade && `gb-shader-fade-${fade}`, className)}
      style={{ opacity, ...style }}
    >
      {colour && (
        <ShaderBoundary>
          <Dithering
            colorBack="#00000000"
            colorFront={colour}
            shape={shape}
            type={type}
            size={size}
            speed={still || !visible ? 0 : speed}
            scale={scale}
            minPixelRatio={1}
            maxPixelCount={1280 * 720}
            style={{ width: "100%", height: "100%" }}
          />
        </ShaderBoundary>
      )}
    </div>
  )
}
