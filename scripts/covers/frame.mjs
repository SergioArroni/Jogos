// Common frame for every cover: background gradient, soft light behind the subject and
// a paper grain. Illustrations have no text: the app overlays the title at the bottom.
const W = 300;
const H = 400;

/** Wraps one illustration in the common frame. */
export function cover({ from, to, light = '#ffffff', glowY = 150 }, art) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient>
<radialGradient id="glow" cx="0.5" cy="${glowY / H}" r="0.45"><stop offset="0" stop-color="${light}" stop-opacity="0.35"/><stop offset="1" stop-color="${light}" stop-opacity="0"/></radialGradient>
<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="4"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.7 0 0 0 -0.3"/></filter>
<filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000" flood-opacity="0.25"/></filter>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<rect width="${W}" height="${H}" fill="url(#glow)"/>
<g filter="url(#shadow)">${art}</g>
<rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.3"/>
</svg>
`;
}

export const dots = (cx, cy, color) =>
  [-14, 0, 14].map(dx => `<circle cx="${cx + dx}" cy="${cy}" r="4.5" fill="${color}"/>`).join('');

export const die = (x, y, size, rotate, pips) => {
  const p = size / 4;
  const spots = {
    1: [[2, 2]], 2: [[1, 1], [3, 3]], 3: [[1, 1], [2, 2], [3, 3]], 4: [[1, 1], [3, 1], [1, 3], [3, 3]],
    5: [[1, 1], [3, 1], [2, 2], [1, 3], [3, 3]], 6: [[1, 1], [3, 1], [1, 2], [3, 2], [1, 3], [3, 3]],
  }[pips];
  return `<g transform="translate(${x} ${y}) rotate(${rotate})"><rect x="${-size / 2}" y="${-size / 2}" width="${size}" height="${size}" rx="${size / 6}" fill="#fffdf7"/>${spots.map(([i, j]) => `<circle cx="${-size / 2 + i * p}" cy="${-size / 2 + j * p}" r="${size / 11}" fill="#2b2d42"/>`).join('')}</g>`;
};


/** Round token split in wedges (Trivial style); `missing` leaves one wedge empty. */
export const pie = (cx, cy, r, colors, missing = -1, base = '#1d1d1f') => {
  const step = (2 * Math.PI) / colors.length;
  const at = a => `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
  const wedges = colors.map((color, i) => {
    if (i === missing) return '';
    const a = -Math.PI / 2 + i * step;
    return `<path d="M${cx} ${cy}L${at(a)}A${r} ${r} 0 0 1 ${at(a + step)}z" fill="${color}" stroke="${base}" stroke-width="5" stroke-linejoin="round"/>`;
  });
  return `<circle cx="${cx}" cy="${cy}" r="${r + 7}" fill="${base}"/>${wedges.join('')}`;
};

/** Four-pointed sparkle. */
export const sparkle = (x, y, size, fill) =>
  `<path transform="translate(${x} ${y}) scale(${size / 14})" d="M0-14l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="${fill}"/>`;

/** Playing card centred on (x, y), rotated by `rotate` degrees. */
export const card = (x, y, w, h, rotate, fill, inner = '') =>
  `<g transform="translate(${x} ${y}) rotate(${rotate})"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${Math.min(w, h) / 8}" fill="${fill}"/>${inner}</g>`;

/** Faceted gem centred on (x, y). */
export const gem = (x, y, s, color, shine = '#ffffff') =>
  `<g transform="translate(${x} ${y})"><path d="M${-s * 0.8} ${-s * 0.35}L${-s * 0.45} ${-s}H${s * 0.45}L${s * 0.8} ${-s * 0.35}L0 ${s}z" fill="${color}"/><path d="M${-s * 0.8} ${-s * 0.35}H${s * 0.8}L0 ${s}z" fill="#000" opacity="0.18"/><path d="M${-s * 0.45} ${-s}L${-s * 0.2} ${-s * 0.35}H${s * 0.2}L${s * 0.45} ${-s}z" fill="${shine}" opacity="0.45"/></g>`;

/** Firework burst. */
export const burst = (cx, cy, r, color, rays = 12) =>
  Array.from({ length: rays }, (_, i) => {
    const a = (i * 2 * Math.PI) / rays;
    const p = k => `${(cx + r * k * Math.cos(a)).toFixed(1)} ${(cy + r * k * Math.sin(a)).toFixed(1)}`;
    return `<path d="M${p(0.35)}L${p(0.85)}" stroke="${color}" stroke-width="4" stroke-linecap="round"/><circle cx="${p(1).split(' ')[0]}" cy="${p(1).split(' ')[1]}" r="4" fill="${color}"/>`;
  }).join('');
