import { CaretDown } from "@phosphor-icons/react/dist/ssr"

import type { Book, BookGroup } from "@/lib/content/reading"

// Gambit Bookshelf (bundle.js › Bookshelf): reading now with progress, up next, finished (folded),
// and want to read, which is grouped by genre. Server rendered; the fold is a native <details>.

function Row({ b, now }: { b: Book; now?: boolean }) {
  return (
    <li className="gb-book-row">
      <div className="gb-book-t">
        <strong>{b.title}</strong>
        {b.author && <span>{b.author}</span>}
      </div>
      {now ? (
        <div className="gb-book-prog">
          {b.pct != null && (
            <span className="gb-meter" role="img" aria-label={`${b.pct} percent read`}>
              <i style={{ width: `${b.pct}%` }} />
            </span>
          )}
          {b.where && <span className="gb-book-where">{b.where}</span>}
        </div>
      ) : b.note ? (
        <span className="gb-book-where">{b.note}</span>
      ) : null}
    </li>
  )
}

export function Bookshelf({
  reading,
  next,
  read,
  wishlist,
  emptyText = "This list fills in from the admin, sorted by genre.",
}: {
  reading: Book[]
  next: Book[]
  read: Book[]
  wishlist: BookGroup[]
  emptyText?: string
}) {
  const wantCount = wishlist.reduce((n, g) => n + g.books.length, 0)
  return (
    <div className="gb-shelf">
      <section className="gb-shelf-group" aria-labelledby="gb-shelf-now">
        <h2 id="gb-shelf-now">
          Reading now <span>{reading.length}</span>
        </h2>
        <ul>
          {reading.map((b) => (
            <Row key={b.title} b={b} now />
          ))}
        </ul>
      </section>

      {next.length > 0 && (
        <section className="gb-shelf-group" aria-labelledby="gb-shelf-next">
          <h2 id="gb-shelf-next">
            Up next <span>{next.length}</span>
          </h2>
          <ul>
            {next.map((b) => (
              <Row key={b.title} b={b} />
            ))}
          </ul>
        </section>
      )}

      <details className="gb-shelf-more">
        <summary>
          Finished <span>{read.length}</span>
          <CaretDown size={16} aria-hidden />
        </summary>
        <ul className="gb-shelf-grid">
          {read.map((b) => (
            <Row key={b.title} b={b} />
          ))}
        </ul>
      </details>

      <section className="gb-shelf-group" aria-labelledby="gb-shelf-want">
        <h2 id="gb-shelf-want">
          Want to read <span>{wantCount}</span>
        </h2>
        {wantCount === 0 ? (
          <p className="gb-shelf-empty">{emptyText}</p>
        ) : (
          <div className="gb-shelf-genres">
            {wishlist.map((g) => (
              <section key={g.name} aria-label={g.name}>
                <h3 className="gb-shelf-genre">{g.name}</h3>
                <ul className="gb-shelf-grid">
                  {g.books.map((b) => (
                    <Row key={b.title} b={b} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
