# shadcn/ui handoff

The Next.js 14 build uses shadcn/ui. Map Gambit's tokens onto shadcn's semantic variables once, in `app/globals.css`, and every shadcn component inherits the system.

```css
@layer base {
  :root {            /* light */
    --background: 0 0% 100%;      --foreground: 0 0% 4%;
    --card: 0 0% 98%;             --card-foreground: 0 0% 4%;
    --popover: 0 0% 100%;         --popover-foreground: 0 0% 4%;
    --primary: 0 0% 0%;           --primary-foreground: 0 0% 100%;
    --secondary: 0 0% 95%;        --secondary-foreground: 0 0% 4%;
    --muted: 0 0% 95%;            --muted-foreground: 0 0% 32%;
    --accent: 0 0% 95%;           --accent-foreground: 0 0% 4%;
    --destructive: 357 67% 46%;   --destructive-foreground: 0 0% 100%;
    --border: 0 0% 90%;           --input: 0 0% 55%;     --ring: 0 0% 4%;
    --radius: 0.5rem;
  }
  .dark {
    --background: 0 0% 0%;        --foreground: 0 0% 93%;
    --card: 0 0% 9%;              --card-foreground: 0 0% 93%;
    --popover: 0 0% 9%;           --popover-foreground: 0 0% 93%;
    --primary: 0 0% 100%;         --primary-foreground: 0 0% 0%;
    --secondary: 0 0% 12%;        --secondary-foreground: 0 0% 93%;
    --muted: 0 0% 12%;            --muted-foreground: 0 0% 63%;
    --accent: 0 0% 12%;           --accent-foreground: 0 0% 93%;
    --destructive: 358 100% 69%;  --destructive-foreground: 0 0% 0%;
    --border: 0 0% 15%;           --input: 0 0% 42%;     --ring: 0 0% 93%;
  }
  html { color-scheme: light; } html.dark { color-scheme: dark; }
}
```

Add `success` and `award` as extra variables, and expose them in `tailwind.config` under `colors`. Add `<meta name="theme-color">` for both schemes (`#000000` and `#ffffff`).

| Gambit | shadcn/ui |
|---|---|
| `Button` primary / secondary / ghost | `Button` default / outline / ghost |
| `Accordion` | `Accordion` (type "single", collapsible) |
| `CarouselControls` + track | `Carousel` (embla), with dots and the wheel plugin |
| `Field` | `Form` + `Input` / `Textarea` / `Select` + `FormMessage` |
| `Switch`, `Toast`, `ConfirmDialog` | `Switch`, `Sonner`, `AlertDialog` |
| `DataTable` | `Table` + TanStack Table |
| `Tag`, `StatusBadge` | `Badge` (outline) + a dot |
| `PricingTiers`, `ReferenceCard` | `Card` (flat: `shadow-none`, border only) |
| `VideoEmbed`, `LiveView` | custom; keep the poster-first and inert-until-selected behaviour |

Compose with `gap-*`, not `space-y-*`. Icons come from `@phosphor-icons/react` (regular), not Lucide.
