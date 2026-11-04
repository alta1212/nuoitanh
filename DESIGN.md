# Nuôi Tanh: Quỹ Cứu Trợ Khẩn Cấp Cho Chính Tôi

Direction chosen by the owner: a parody emergency-appeal page in which the victim, the fundraiser, and the recipient are the same person.
Keep the free-feed page at `/free-feed`.

- Audience: Vietnamese visitors who enjoy a dry, personal internet joke. English is available through the VI/EN switcher.
- Voice: the solemn language of a charity appeal applied to trivial hardship such as an empty fridge or no bubble tea. Shameless, and open about who receives the money.
- Palette: paper `#f6f1e7`, ink `#1b1714`, muted `#6b6258`, alarm red `#c8102e`, gold `#c99a2e`, cards `#fffdf8`. Night mode swaps in navy paper `#0f1220` with coral `#ff4d6d` and gold `#f0c35a`.
- Typography: Playfair Display for headlines, chosen for its newspaper-appeal character; Be Vietnam Pro for body text and controls; Patrick Hand for the sticky note and stomach growl.
- Composition: alert ticker, fund masthead, then a hero beside the victim's photo, a progress bar, the victim's circumstances, donation tiers beside the QR code, a donor board, and an FAQ.
- Motif: a censored photo, "verified poor" stamp, sticky note, and an absurd 1 billion đồng goal. These borrow from charity campaigns and tabloid reporting.
- Free-feed page: a checklist of ₫0 good deeds with a merit counter, followed by the Shopee catalog using actual product metadata.
- Surfaces: bordered cards with one hard offset shadow on the donation panel and modals. Night mode adds stars and a soft gradient.
- Theme: light by day and dark automatically from 22:00 to 05:00, until the visitor chooses one.
- Dials: ENERGY 8 / RHYTHM 5 / MOTION 7. Coin rain, the ticker, and the runaway "no" button are part of the joke; respect reduced motion.
- Interaction jokes: the "no" button runs away, an exit-intent popup appears once per session, and sad documentary music plays only after the visitor turns it on.
- Responsive: hero and donation panels stack below 860px; tiers stay in two columns until 340px; layouts must not overflow at 320px.
- Payment: the QR image comes from `img.vietqr.io`, with bank details always shown beneath it. Custom amounts start at 2.000đ.
- Evidence: the raised amount, stats, and donor board are hard-coded jokes in `src/data/fund.ts` and `src/locales/`, not real transaction data, and there is no automatic payment confirmation. Product links are disclosed as affiliate links.
