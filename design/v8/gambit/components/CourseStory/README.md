# CourseStory

A programme card that flips over to its courses, played as stories. Use it on Education for multi-course tracks.

- `front`: the card face, the same shape as the other programme cards: `{ title, org, dates, result, links: [{label, href}], groups: [{name, items}] }`.
- `stories`: the courses in date order, earliest first: `{ title, image, date, hours, about, chapters: [], verify }`. `image` is the course certificate (880 by 508). It shows at the top of the story, and the bar waits for it to load, as a status does. The next image preloads..
- `duration`: seconds per course, default 7.

A small book button on the face, with the course count, flips the card (a 3D turn, 0.8s on the Tilda curve). The back first loads (the ring spins), then plays. Segmented bars across the top fill at a steady linear pace, one per course. A ringed badge counts the courses seen. Tap the right 70% for the next course and the left 30% for the one before. Press and hold, or use the pause button, to pause. The arrow keys, Space and Esc also work, and the book button turns the card back.

Under reduced motion the card crossfades instead of turning, and starts paused.
