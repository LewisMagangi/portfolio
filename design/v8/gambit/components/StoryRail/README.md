# StoryRail

A reading battery. Pass the page's sections as `items` ({id, label}) and the hero id as `after`. Once the hero leaves, a 1px hairline at the left of the 1080px column fills as you read (≥1280px), and at its foot a small battery shows the same progress: its cell fills from the left with a faint ink wash, and turns solid at 100%. No move labels, no dots, no floating pill; the header carries navigation.

Under 820px the battery sits in the bottom book bar with the current section and the booking button (`bookHref`, `ctaLabel`).

`Battery` is exported on its own too: `value` 0 to 100.

Use it on long pages: Home, Skills, Career, Education, Services, Chess and blog posts.
