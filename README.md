# Dutch Flip

Mobile-first Dutch flashcards using Next.js, React and TypeScript. No database or account required.

## Run

Use Node.js 20.9 or later. Run `npm install`, then `npm run dev` and open http://localhost:3000.

Tap the card (or press Enter/Space when focused) to flip between Dutch and English. Next word randomly selects a different card and resets to Dutch.

## Add words

Edit `data/vocabulary.json`. Each entry contains `dutch`, `english`, and `emoji`. The count updates automatically. Keep at least one entry.

## Production

Run `npm run typecheck` and `npm run build`, then `npm start`.

The first card is randomly selected in the browser after loading. Subsequent cards are chosen uniformly from all other entries. No persistence or tracking. Fonts are local system fonts; no external services are required.
