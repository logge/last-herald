// The Last Herald: the website.

// Where the game is. Fill in each address when it's out there, and its button
// on the page goes live ("Get it on Google Play"); while it's empty, the button
// says "Coming soon".
const STORES = {
  play: '', // Google Play: https://play.google.com/store/apps/details?id=io.github.logge.lastherald
  itch: '', // itch.io, in the browser
  apple: '', // the App Store, for iPhone and iPad
};
const LIVE = { play: 'Get it on', itch: 'Play it on', apple: 'Download on the' };

for (const a of document.querySelectorAll('[data-store]')) {
  const url = STORES[a.dataset.store];
  if (!url) continue;
  a.href = url;
  a.rel = 'noopener';
  a.removeAttribute('aria-disabled');
  a.classList.replace('soon', 'live');
  a.querySelector('small').textContent = LIVE[a.dataset.store];
}

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
