# Nuôi Tanh: Quỹ Cứu Trợ Khẩn Cấp Cho Chính Tôi

Direction chosen by the owner: a parody emergency appeal told as a sad late-night documentary, in which the victim, the fundraiser, and the recipient are the same person.
Keep the free-feed page at `/free-feed`.

- Audience: Vietnamese visitors who enjoy a dry, personal internet joke. English is available through the VI/EN switcher.
- Voice: the hushed, melodramatic language of a 2 a.m. charity report applied to trivial hardship such as an empty fridge or no bubble tea. Shameless, and open about who receives the money.
- Mood: one dark room, rain outside, a single candle. Night only — there is no light theme, because the joke is set at 2:07 in the morning.
- Palette: ink `#0d0f12` with panels `#14171c`, hairlines `#23262c`, text `#d9d4cb`, muted `#8a857c`, candle gold `#f3b85c`, dried blood `#a33a3a`, and paper `#e9e1d1` on `#2b2620` for the letter and the receipt.
- Typography: Playfair Display for headlines, Be Vietnam Pro (light) for body text and controls, Special Elite for anything typed on paper: the hunger clock, the letter, diary dates, gift amounts, and the merit receipt.
- Composition (home): news ticker, quiet top bar, a candle-lit hero with a live "last full meal" clock, the censored polaroid, a letter that types itself out, a one-month diary with three counters, the donation panel, the hall of benefactors, then the questions.
- Composition (free page): hero, a sticky merit meter with five candles, three free deeds, the Shopee shelf with category filters, a merit receipt, and a last nudge back to the QR.
- Motion: rain on a canvas behind everything, a flickering candle, sections fading in on scroll, the letter typing, counters counting. All of it stops under `prefers-reduced-motion`, and the hold-to-light candle then completes on a single press.
- Interaction jokes: "Tôi không muốn giúp" opens four increasingly quiet replies while the rain gets heavier and the "Vẫn không" button shrinks; an exit-intent popup appears once per session; sad documentary music plays only after the visitor turns it on.
- Responsive: one column throughout, the pay panel and polaroid stack below 620px, tiers stay in a grid down to 360px, and nothing overflows at 320px.
- Payment: the QR image comes from `img.vietqr.io`, with bank details always shown beside it. Custom amounts start at 2.000đ.
- Merit: the free page keeps points in `localStorage` (`nuoitanh-merit`), so the receipt and the candle survive a reload. Points are a joke, not a currency.
- Evidence: the raised amount, stats, diary, and hall of benefactors are hard-coded jokes in `src/data/fund.ts` and `src/locales/`, not real transaction data, and there is no automatic payment confirmation. Product links are disclosed as affiliate links.
