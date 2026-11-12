// Chess page content, verbatim from design/v8/boards/Chess.dc.html and content.json › chess.
import type { Challenge } from "@/components/gambit/challenge-board"
import { OFF } from "@/lib/content/home"

export const HERO = {
  title: "Calculate first, / then commit.",
  lead: "I played for JOOUST at three straight WEKUSA championships. In 2023, on board 2, my 7 wins from 9 helped the team finish second runners up. The same habit runs my engineering: read the position, count the trade offs, then move.",
  theatreNote:
    "Beside this are my five best rated wins in each time control on Lichess, replayed as they happened. Scroll over the board to run through a game, change the colours with the three buttons, or switch to Live to watch me play.",
}

export const ONLINE = {
  title: "Online, as Lique.",
  lead: "Over 19,000 rated games on Lichess, most of them bullet. The best wins above came against players rated up to 2501.",
  facts: [
    { label: "Bullet peak", value: "2117", games: "14,024 games" },
    { label: "Blitz peak", value: "1945", games: "5,033 games" },
    { label: "Rapid peak", value: "2024", games: "637 games" },
  ],
}

export const EVENTS_HEAD = {
  title: "Championships",
  lead: "WEKUSA, the Western Kenya Universities Sports Association, playing for JOOUST.",
  certificateLabel: "View the participation certificate",
  certificateHref: "https://drive.google.com/file/d/1T-LmqogVA1arZuytaOaE8Zuyg-PQjLst/view?usp=sharing",
}

export const EVENTS: { year: string; title: string; line: string; result: string; award?: boolean }[] = [
  {
    year: "2023",
    title: "WEKUSA Chess Championship",
    line: "Board 2 for JOOUST. Won 7 of 9 games, and the team finished second runners up.",
    result: "7/9, team third",
    award: true,
  },
  { year: "2022", title: "WEKUSA Chess Championship", line: "Board 3 for JOOUST. Won 2 of 5 games.", result: "2/5" },
  {
    year: "2021",
    title: "WEKUSA Chess Championship",
    line: "Masinde Muliro University, 13 to 14 Nov 2021. Board 3 for JOOUST. Won 3 of 5 games.",
    result: "3/5",
  },
]

export const PLAY = {
  title: "Up for a game?",
  lead: "Challenge me on the board, or race me on a coding problem. Ratings update from Lichess, Chess.com and Codewars when they’re reachable.",
  challenges: OFF.challenges as readonly Challenge[],
}

export const RAIL = [
  { id: "online", label: "Online" },
  { id: "championships", label: "Championships" },
  { id: "play", label: "Play me" },
]
