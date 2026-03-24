const ALPHABET_EMOJIS = {
  a: '🌟', b: '🔥', c: '🌙', d: '⚡', e: '🎵',
  f: '🍀', g: '🌈', h: '❄️', i: '🔑', j: '🎯',
  k: '🧩', l: '💎', m: '🦋', n: '🌻', o: '🍎',
  p: '🐾', q: '👑', r: '🚀', s: '☀️', t: '🌊',
  u: '🎈', v: '🔔', w: '🌸', x: '💀', y: '🧲',
  z: '🎭'
};

function init() {
  renderLegend();

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
