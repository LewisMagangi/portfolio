import { SiteFooter } from "@/components/site/site-footer"
import { SiteNav } from "@/components/site/site-nav"

/** The public site: floating nav, the page, the footer. Admin routes sit outside this group. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="gb-motion">
      <SiteNav />
      <main id="content" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
