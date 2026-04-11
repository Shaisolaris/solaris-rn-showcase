# Solaris Feed — React Native App Showcase

A visual showcase of a React Native social feed app running inside an iOS phone frame. Tap posts, like them, switch tabs, explore profile and search — every interaction works.

**Live demo:** https://shaisolaris.github.io/solaris-rn-showcase/

## What it shows

- **iOS phone frame** (360×760) with status bar, navigation bar, tab bar
- **Social feed app** with 4 screens:
  - **Feed** — 6 posts with author, body, like/comment/repost counts, gradient media tiles
  - **Search** — trending topics list
  - **Activity** — notifications feed
  - **Profile** — gradient banner, avatar, bio, follower stats, tabs
- **Post detail view** — tap any post to open
- **Like interactions** — real state, counts update live
- **iOS design language** — San Francisco-style typography, iOS blue (#007AFF), gray separators, chevron navigation
- **Dark mode** toggle on the outer page
- Companion info on the left: stack chips, feature grid, what React Native does well

## What this demo represents

This is the **visual proof** for a React Native engagement. The real RN project (JS/TS source, `app.json`, `eas.json`, native iOS/Android builds) lives in companion repositories. This showcase compiles the same UI concepts into a Next.js-hosted preview.

## Stack

- Next.js 15 (App Router, static export)
- React 19 + TypeScript
- Tailwind CSS 3
- Deployed to GitHub Pages

## Run locally

```bash
npm install
npm run dev
```

## License

MIT.
