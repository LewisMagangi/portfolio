import type { Metadata } from "next"

import { ChallengeBoard } from "@/components/gambit/challenge-board"
import { GameTheatre } from "@/components/gambit/game-theatre"
import { StoryRail } from "@/components/gambit/story-rail"
import { Shader } from "@/components/site/shader"
import { SplitWords } from "@/components/site/split-words"
import { getBestWins } from "@/lib/chess-games"
import { getChallenges } from "@/lib/challenges"
import { EVENTS, EVENTS_HEAD, HERO, ONLINE, PLAY, RAIL } from "@/lib/content/chess"

export const metadata: Metadata = {
  title: "Chess",
  description: HERO.lead,
}

// Refreshing best wins in Admin › Chess revalidates "/chess"; this is the fallback refresh.
export const revalidate = 3600

const sec = "mx-auto box-border flex max-w-content flex-col gap-12 px-8 py-32 max-sm:px-4 max-sm:py-[72px]"

function Head({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex max-w-[680px] flex-col gap-4">
      <h2 id={id} className="heading m-0">
        {title}
      </h2>
      <p className="lead m-0 text-ink-muted">{children}</p>
    </div>
  )
}

export default async function ChessPage() {
  const [games, challenges] = await Promise.all([getBestWins(), getChallenges()])

  return (
    <>
      <StoryRail items={RAIL} after="chess-top" ctaLabel="Book a free call" />

      <section id="chess-top" className="relative overflow-hidden border-b border-line">
        <Shader shape="ripple" type="8x8" size={3} speed={0.14} front="line-strong" fade="right" opacity={0.4} />
        <div className="relative mx-auto box-border grid max-w-content grid-cols-[minmax(0,1fr)_minmax(0,560px)] items-center gap-14 px-8 py-[88px] max-[1000px]:grid-cols-1 max-[1000px]:gap-10 max-sm:px-4 max-sm:pb-16 max-sm:pt-12">
          <div className="flex min-w-0 flex-col gap-6">
            <SplitWords text={HERO.title} className="display m-0" />
            <p className="lead m-0 max-w-[520px] text-ink-muted">{HERO.lead}</p>
            <p className="m-0 max-w-[520px] text-sm leading-[22px] text-ink-muted">{HERO.theatreNote}</p>
          </div>
          <div className="flex min-w-0 justify-center">
            <GameTheatre games={games} user="Lique" />
          </div>
        </div>
      </section>

      <div id="online">
        <section data-reveal="" aria-labelledby="online-h" className={`${sec} !pb-16`}>
          <Head id="online-h" title={ONLINE.title}>
            {ONLINE.lead}
          </Head>
          <dl className="m-0 grid grid-cols-3 gap-6 max-sm:grid-cols-1">
            {ONLINE.facts.map((f) => (
              <div key={f.label} className="flex flex-col gap-1 border-t border-line pt-4">
                <dt className="text-sm leading-5 text-ink-muted">{f.label}</dt>
                <dd className="m-0 text-[30px] font-medium leading-9 tracking-[-0.02em] tabular-nums">{f.value}</dd>
                <dd className="m-0 text-sm leading-5 text-ink-muted">{f.games}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <div id="championships" className="border-t border-line">
        <section data-reveal="" aria-labelledby="champ-h" className={sec}>
          <Head id="champ-h" title={EVENTS_HEAD.title}>
            {EVENTS_HEAD.lead}{" "}
            <a href={EVENTS_HEAD.certificateHref} target="_blank" rel="noopener noreferrer">
              {EVENTS_HEAD.certificateLabel}
            </a>
          </Head>
          <ul className="m-0 list-none p-0">
            {EVENTS.map((e) => (
              <li
                key={e.year}
                className="grid grid-cols-[96px_1fr_auto] items-baseline gap-6 border-t border-line py-6 max-sm:grid-cols-1 max-sm:gap-2"
              >
                <span className="font-mono text-xs text-ink-subtle">{e.year}</span>
                <span className="flex flex-col gap-1">
                  <strong className="text-base font-semibold">{e.title}</strong>
                  <span className="text-sm text-ink-muted">{e.line}</span>
                </span>
                <span className={e.award ? "gb-tag gb-tag-award justify-self-start" : "gb-tag justify-self-start"}>{e.result}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div id="play" className="relative overflow-hidden border-t border-line">
        <Shader shape="warp" type="4x4" size={2} speed={0.2} front="line" fade="right" opacity={0.4} />
        <section aria-labelledby="play-h" className={`${sec} relative`}>
          <div className="flex flex-col gap-8">
            <div className="flex max-w-[640px] flex-col gap-3">
              <h2 id="play-h" className="heading m-0">
                {PLAY.title}
              </h2>
              <p className="lead m-0 text-ink-muted">{PLAY.lead}</p>
            </div>
            <ChallengeBoard items={challenges.all} live />
          </div>
        </section>
      </div>
    </>
  )
}
