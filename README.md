# The Last Herald: the website

The promotional website for **The Last Herald**, a free point-and-click adventure: three kids from a Swedish sawmill town find a starship under a hill in October 1987.

**https://logge.github.io/last-herald/**

- `index.html`: the game: the story, the kids, pictures, what's in it, and where to get it.
- `privacy/`: the privacy policy, **https://logge.github.io/last-herald/privacy/**, the address to give Google Play (and later the App Store).

It's plain HTML and CSS, served as it is by GitHub Pages from the `main` branch: no build step. It loads nothing from other sites (the font, Pixelify Sans, is in `fonts/`, under the SIL Open Font License in `fonts/OFL.txt`), and has no cookies or analytics.

## When the game is out

The three buttons at the top say "Coming soon" until they have an address. Fill each in at the top of `js/site.js`, and its button goes live:

```js
const STORES = {
  play: 'https://play.google.com/store/apps/details?id=io.github.logge.lastherald',
  itch: '',
  apple: '',
};
```

## The pictures

The screenshots, the icon and the feature graphic are the store pictures from the game's repository (`store/`), and the kids in `assets/kids/` are drawn by the game's own character rig, eight times their size.
