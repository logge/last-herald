// The Last Herald: the website.

// Where the game is. Fill in each address when it's out there, and its button
// on the page goes live ("Get it on Google Play"); while it's empty, the button
// says "Coming soon".
const STORES = {
  play: 'https://play.google.com/store/apps/details?id=io.github.logge.lastherald', // Google Play
  itch: 'https://plogarn.itch.io/the-last-herald', // itch.io, in the browser
  apple: '', // the App Store, for iPhone and iPad
  amiga: 'https://github.com/logge/last-herald/releases/download/amiga-1.0/TheLastHerald-Amiga-1.0.zip', // the Amiga 1200: the release on GitHub (this repository's releases)
};
const LIVE = { play: 'Get it on', itch: 'Play it on', apple: 'Download on the', amiga: 'Download for' };

for (const a of document.querySelectorAll('[data-store]')) {
  const url = STORES[a.dataset.store];
  if (!url) continue;
  a.href = url;
  a.rel = 'noopener';
  a.removeAttribute('aria-disabled');
  a.classList.replace('soon', 'live');
  a.querySelector('small').textContent = LIVE[a.dataset.store];
}

// The game itself, played on the page: itch.io's player, which loads it from itch.io. Nothing comes from itch.io (or
// any other site) until the button is pressed: until then it's only a picture and a button
const player = document.querySelector('.player');
player?.querySelector('button').addEventListener('click', () => {
  const frame = document.createElement('iframe');
  Object.assign(frame, { src: player.dataset.src, title: 'The Last Herald', allow: 'autoplay; fullscreen', allowFullscreen: true });
  player.replaceChildren(frame);
  player.classList.add('playing');
  frame.focus();
});

// The pictures: a click opens one large, and the arrows (or the arrow keys) go through them
const shots = [...document.querySelectorAll('.gallery button')];
const box = document.querySelector('dialog.lightbox');
if (box && shots.length) {
  const img = box.querySelector('img'), caption = box.querySelector('.caption');
  let at = 0;
  const show = (i) => {
    at = (i + shots.length) % shots.length;
    const pic = shots[at].querySelector('img');
    img.src = pic.src;
    img.alt = pic.alt;
    caption.textContent = shots[at].dataset.caption ?? '';
  };
  shots.forEach((b, i) => b.addEventListener('click', () => { show(i); box.showModal(); }));
  box.addEventListener('click', (e) => {
    const go = e.target.closest('[data-go]');
    if (go) return show(at + Number(go.dataset.go));
    if (e.target.closest('[data-close]') || e.target === box) box.close();
  });
  box.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') show(at + 1);
    if (e.key === 'ArrowLeft') show(at - 1);
  });
}
