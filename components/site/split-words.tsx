import { Fragment, type CSSProperties, type ElementType } from "react"

import { cn } from "@/lib/utils"

/**
 * A heading whose words rise one by one (1.2s, 60ms stagger, Tilda curve) inside a `.gb-motion` ancestor.
 * A " / " in the text is a deliberate line break on wider screens. Screen readers get the plain sentence.
 */
export function SplitWords({
  text,
  as: Tag = "h1",
  className,
  style,
}: {
  text: string
  as?: ElementType
  className?: string
  style?: CSSProperties
}) {
  const words = text.split(/\s+/).filter(Boolean)
  return (
    <Tag className={cn("gb-split", className)} style={style}>
      <span className="sr-only">{text.replace(/\s\/\s/g, " ")}</span>
      {words.map((w, i) =>
        w === "/" ? (
          <br key={i} className="gb-split-br" />
        ) : (
          <Fragment key={i}>
            <span className="gb-split-w" aria-hidden style={{ "--i": i } as CSSProperties}>
              <span>{w}</span>
            </span>{" "}
          </Fragment>
        ),
      )}
    </Tag>
  )
}
