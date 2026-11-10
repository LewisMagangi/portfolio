# GameTheatre

My best rated Lichess wins, replayed the way people watch a game, plus a live view on the same screen.

- `games`: `{ label, speed, rank, me, opp, oppRating, myRating, opening, clock, date, how, url, moves (UCI, space separated), san }`, in play order. The admin's Chess page refreshes these from Lichess's "best rated victories" per time control.
- `pieces`: a map from piece letter (`K Q R B N P k q r b n p`) to an image URL. Uses cburnett by Colin M.L. Burnett, GPLv2+. The credit line is shown under the board.
- `user`: the Lichess handle, `Lique`.

**Replays:** moves play at a watching pace (bullet 0.52s, blitz 0.72s, rapid 0.9s). The final position rests for 2.6s, then the next game starts. Replays begin only while the board is on screen. Each game is labelled, for example "2nd best rated blitz win", with players and ratings shown as Lichess shows them.

**Moving through a game:** scrolling over the board runs through the moves, as on Lichess; the page scrolls normally everywhere else. When the board has focus, the arrow keys, Space, Home and End also work.

**Board colours:** three window-style buttons switch between Gambit (the site's greys, the default), Lichess (brown) and a Chess.com-style green. The choice is remembered.

**Sound:** off by default, and the choice is remembered. Move, capture, check and end sounds are synthesised in the browser. The Lichess standard sound set is marked non-free in Lichess's own licence file, so it is not used.

**Live:** the switch icon flips the same screen to Live. It asks Lichess every 20 seconds whether `user` is playing, streams the game onto the board with clocks, and falls back to a calm empty state otherwise.

Under reduced motion, pieces don't slide and replays start paused.
