(() => {
  /* Theme: apply saved or system preference before first paint */
  const KEY = 'zidan-theme';
  const root = document.documentElement;
  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = saved || (prefersDark ? 'dark' : 'light');

  /* Links data: replace the placeholder URLs with real destinations */
  const ic = p => `<svg viewBox="0 0 24 24" aria-hidden="true">${p}</svg>`;
  const LINKS = [
    { title: 'Slides',  desc: 'Presentation & deck templates',   url: 'https://example.com/slides',  color: 'linear-gradient(145deg,#FB7185,#E11D48)', icon: ic('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M12 16v4M8 20h8M12 8v4"/>') },
    { title: 'Design',  desc: 'UI/UX, graphic and visual assets', url: 'https://example.com/design',  color: 'linear-gradient(145deg,#60A5FA,#2563EB)', icon: ic('<path d="M12 3 4 7v6c0 4 3.500 6.500 8 8 4.500-1.500 8-4 8-8V7z"/><circle cx="12" cy="11" r="2"/>') },
    { title: 'Project', desc: 'Selected works and case studies',  url: 'https://example.com/project', color: 'linear-gradient(145deg,#8B5CF6,#5B21B6)', icon: ic('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>') },
    { title: 'Tools',   desc: 'Useful tools for productivity',    url: 'https://example.com/tools',   color: 'linear-gradient(145deg,#34D399,#059669)', icon: ic('<path d="M14.500 6.500a4 4 0 0 0-5 5L3 18l3 3 6.500-6.500a4 4 0 0 0 5-5l-2.500 2.500-2.500-.5-.5-2.500z"/>') },
    { title: 'Contact', desc: "Let's work together",              url: 'https://example.com/contact', color: 'linear-gradient(145deg,#6366F1,#3730A3)', icon: ic('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 7 9 6 9-6"/>') }
  ];
  const arrow = ic('<path d="M5 12h14M13 6l6 6-6 6"/>').replace('<svg', '<svg class="arrow"');

  document.addEventListener('DOMContentLoaded', () => {
    /* Render links */
    const list = document.getElementById('link-list');
    list.innerHTML = LINKS.map((l, i) => `
      <li><a class="link" style="--i:${i}" href="${l.url}" target="_blank" rel="noopener" aria-label="${l.title}: ${l.desc}">
        <span class="tile" style="background:${l.color}">${l.icon}</span>
        <span class="txt"><strong>${l.title}</strong><span>${l.desc}</span></span>${arrow}
      </a></li>`).join('');

    /* Staggered reveal (also covers cards scrolled into view later) */
    const items = list.querySelectorAll('.link');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((es, o) => es.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); o.unobserve(e.target); }
      }), { threshold: .1 });
      items.forEach(el => io.observe(el));
    } else items.forEach(el => el.classList.add('in'));

    /* Theme toggle */
    const btn = document.getElementById('theme-toggle');
    const sync = () => {
      const dark = root.dataset.theme === 'dark';
      btn.setAttribute('aria-pressed', dark);
      btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    };
    sync();
    btn.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(KEY, root.dataset.theme); } catch (e) {}
      sync();
    });
  });
})();
