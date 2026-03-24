const ALPHABET_EMOJIS = {
  a: '🌟', b: '🔥', c: '🌙', d: '⚡', e: '🎵',
  f: '🍀', g: '🌈', h: '❄️', i: '🔑', j: '🎯',
  k: '🧩', l: '💎', m: '🦋', n: '🌻', o: '🍎',
  p: '🐾', q: '👑', r: '🚀', s: '☀️', t: '🌊',
  u: '🎈', v: '🔔', w: '🌸', x: '💀', y: '🧲',
  z: '🎭'
};

const THEME_CONFIG = {
  dark: {
    attibute: () => {
      document.documentElement.removeAttribute('data-theme');
    },
    textContent: '🌙',
    localStorage: 'dark'
  },
  light: {
    attibute: () => {
      document.documentElement.setAttribute('data-theme', 'light');
    },
    textContent: '☀️',
    localStorage: 'light'
  }
}

function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme');

  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    toggle.textContent = '☀️';
  }

  toggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const theme = isLight ? 'dark' : 'light';
    const themeConfig = THEME_CONFIG[theme];

    themeConfig.attibute();
    toggle.textContent = themeConfig.textContent;
    localStorage.setItem('theme', themeConfig.localStorage);
  });
}

function init() {
  renderLegend();
  initThemeToggle();

  const input = document.getElementById('phrase-input');
  const btn = document.getElementById('translate-btn');

  btn.addEventListener('click', translate);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') translate();
  });
}

function renderLegend() {
  const grid = document.getElementById('legend-grid');
  for (const [letter, emoji] of Object.entries(ALPHABET_EMOJIS)) {
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `
      <span class="emoji">${emoji}</span>
      <span class="letter">${letter.toUpperCase()}</span>
    `;
    grid.appendChild(item);
  }
}

function removeAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function translate() {
  const phrase = removeAccents(document.getElementById('phrase-input').value.toLowerCase());
  if (!phrase.trim()) return;

  const result = document.getElementById('result');
  const output = document.getElementById('emoji-output');
  output.innerHTML = '';
  result.hidden = false;

  const words = phrase.split(' ');

  words.forEach((word, wi) => {
    const wordGroup = document.createElement('div');
    wordGroup.className = 'word-group';

    for (const char of word) {
      const cell = document.createElement('div');
      cell.className = 'emoji-cell';

      const emoji = ALPHABET_EMOJIS[char];
      if (emoji) {
        cell.innerHTML = `
          <span class="emoji">${emoji}</span>
          <div class="letter-box"></div>
        `;
      } else {
        cell.innerHTML = `
          <span class="emoji">${char}</span>
          <div class="letter-box"></div>
        `;
      }
      wordGroup.appendChild(cell);
    }

    output.appendChild(wordGroup);
  });
}

init();
