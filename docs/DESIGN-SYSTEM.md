# SignHearing design system

Foundation: the original logo, mascot and CSS brand values. No replacement
illustration, new mascot, marketing statistic or new learning content.

| Token | Value / purpose |
| --- | --- |
| Navy | `#082953` — headings, current navigation, quotation surface |
| Blue | `#2678ed` — original brand accent and large hero text |
| Pink | `#f595b3` — small decorative accents, illustration surroundings |
| Sky | `#e7f4ff` — light sections and cards |
| Text / muted | `#244262` / `#617596` |
| Border | `#dce9f6` |
| Accessible button blue | `#1c65cb`, derived from brand blue; hover `#1559b9` |
| Focus | `#ba4e7f`, 3px with 4–5px offset |

The original blue/white pair measures 4.21:1; use the darker derived blue for
small white button text. Large hero text keeps the original blue. Computed
color checks are not a substitute for browser accessibility testing.

System fonts Segoe UI/Arial retain Vietnamese support without remote font
requests. Body 16px, secondary copy 12–15px, headings fluid 30–66px. Content
container 1280px (1360px on large screens), body text constrained for reading.
Spacing follows 4/8/12/16/24/32/48/64/96px steps. Surfaces use 12/18/24/36px
radii; controls use 44px minimum touch height and capsule variants.

`frontend/src/styles/globals.css` defines CSS variables exposed to Tailwind v4
through `@theme inline`. Button and Card use shadcn/ui composition with CVA,
Slot and semantic variables. The mobile menu uses Radix Dialog for focus trap,
Escape, overlay and focus restoration. It is a small client island; content
and translations remain server rendered.

Editorial sections alternate white/sky, two-column reading/quotation layouts,
three challenge cards, brand illustration/product direction, a development
timeline and the community invitation. Motion reveal starts from visible SSR
content and uses only transform/opacity. Reduced-motion disables movement.
No continuous parallax or mascot movement is needed.

Responsive breakpoints: 380, 700, 960, 1200, 1600px. Shared app styling in
`app_shell/modern.css` is loaded after module styles, leaves data attributes and
handlers intact, and provides visible labels in a horizontally scrollable
mobile navigation strip. Cards/learning workspaces stack on narrow screens.
These layouts are implemented but await visual verification in a browser.
