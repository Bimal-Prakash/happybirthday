const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const placeholders = [
  {
    filename: 'photo1-placeholder.svg',
    title: 'The First Spark',
    fileHint: 'assets/photo1.png',
    icon: '✨',
    color1: '#ff758c',
    color2: '#7928ca',
    symbol: 'M-15 -5 C-25 -20 0 -25 0 -5 C0 -25 25 -20 15 -5 C5 10 0 20 0 20 C0 20 -5 10 -15 -5 Z'
  },
  {
    filename: 'photo2-placeholder.svg',
    title: 'Our Favorite Date',
    fileHint: 'assets/photo2.png',
    icon: '☕',
    color1: '#f72585',
    color2: '#4361ee',
    symbol: 'M-15 -10 L15 -10 L12 12 C12 18 -12 18 -12 12 Z M15 -6 C22 -6 22 4 15 4'
  },
  {
    filename: 'photo3-placeholder.svg',
    title: 'That Radiant Smile',
    fileHint: 'assets/photo3.png',
    icon: '🌸',
    color1: '#ff4d6d',
    color2: '#ffb703',
    symbol: 'M0 -15 C8 -15 15 -8 15 0 C15 8 8 15 0 15 C-8 15 -15 8 -15 0 C-15 -8 -8 -15 0 -15 Z'
  },
  {
    filename: 'photo4-placeholder.svg',
    title: 'Fun & Silly Adventures',
    fileHint: 'assets/photo4.png',
    icon: '🚗',
    color1: '#9d4edd',
    color2: '#ff007f',
    symbol: 'M-18 6 L18 6 L12 -8 L-12 -8 Z'
  },
  {
    filename: 'photo5-placeholder.svg',
    title: 'Golden Hour Sunset',
    fileHint: 'assets/photo5.png',
    icon: '🌅',
    color1: '#fb5607',
    color2: '#ff006e',
    symbol: 'M-20 10 L20 10 M-16 0 C-16 -12 16 -12 16 0'
  },
  {
    filename: 'photo6-placeholder.svg',
    title: 'To Forever & Always',
    fileHint: 'assets/photo6.png',
    icon: '💫',
    color1: '#7209b7',
    color2: '#f72585',
    symbol: 'M-18 0 C-18 -10 -5 -10 0 0 C5 10 18 10 18 0 C18 -10 5 -10 0 0 C-5 10 -18 10 -18 0'
  }
];

placeholders.forEach((p, idx) => {
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <linearGradient id="grad${idx}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.color1}" stop-opacity="0.35" />
      <stop offset="100%" stop-color="${p.color2}" stop-opacity="0.15" />
    </linearGradient>
    <linearGradient id="strokeGrad${idx}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.color1}" />
      <stop offset="100%" stop-color="${p.color2}" />
    </linearGradient>
  </defs>

  <!-- Background Base -->
  <rect width="600" height="600" rx="20" fill="#181124" />
  <rect width="600" height="600" rx="20" fill="url(#grad${idx})" />
  
  <!-- Subtle Grid Lines -->
  <circle cx="300" cy="270" r="160" fill="none" stroke="url(#strokeGrad${idx})" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.4" />
  <circle cx="300" cy="270" r="90" fill="${p.color1}" fill-opacity="0.08" />

  <!-- Center Badge / Icon -->
  <g transform="translate(300, 240)">
    <circle cx="0" cy="0" r="52" fill="#ffffff" fill-opacity="0.08" stroke="url(#strokeGrad${idx})" stroke-width="2" />
    <text x="0" y="14" font-size="38" text-anchor="middle">${p.icon}</text>
  </g>

  <!-- Titles -->
  <text x="300" y="345" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="22" font-weight="700" fill="#ffffff" text-anchor="middle">
    ${p.title}
  </text>
  <text x="300" y="380" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="15" font-weight="600" fill="${p.color1}" text-anchor="middle">
    📸 Replace with: ${p.fileHint}
  </text>
  <text x="300" y="415" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#cfc2dc" opacity="0.8" text-anchor="middle">
    Recommended: 800 x 800px (Square Photo)
  </text>

  <!-- Polaroid Tape Accent -->
  <rect x="250" y="15" width="100" height="30" rx="4" fill="#ffffff" fill-opacity="0.15" transform="rotate(-3 300 30)" />
</svg>`;

  fs.writeFileSync(path.join(assetsDir, p.filename), svgContent);
  console.log(`Generated: ${p.filename}`);
});
