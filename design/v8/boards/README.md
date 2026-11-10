# Canvas boards (reference markup)

These are the full source of three v8 boards from the claude.ai canvas: `Skills`, `Review` and `Chess`. They use the canvas's Design Component format, where `<x-import component-from-global-scope="Gambit.X">` mounts a Gambit component, `{{hole}}` reads from `renderVals()`, and `<sc-for>` and `<sc-if>` handle loops and conditions.

Read them for layout, spacing and copy, then build the real pages as Next.js routes with the ported components. The other changed boards (Home, Education, Career, AI and ML, Certificates, Services, Admin) are described in `../HANDOFF.md`, with their content in `../data/content.json`.
