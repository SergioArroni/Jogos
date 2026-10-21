// Draws the game covers in public/covers/ (vector art, no text in the image: the app
// overlays the title). Shared style: background gradient, soft light behind the
// subject and a paper grain. Run: node scripts/covers.mjs
import { mkdirSync, writeFileSync } from 'node:fs';

const W = 300;
const H = 400;

/** Wraps one illustration in the common frame. */
function cover({ from, to, light = '#ffffff', glowY = 150 }, art) {
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

const dots = (cx, cy, color) =>
  [-14, 0, 14].map(dx => `<circle cx="${cx + dx}" cy="${cy}" r="4.5" fill="${color}"/>`).join('');

const die = (x, y, size, rotate, pips) => {
  const p = size / 4;
  const spots = {
    1: [[2, 2]], 2: [[1, 1], [3, 3]], 3: [[1, 1], [2, 2], [3, 3]], 4: [[1, 1], [3, 1], [1, 3], [3, 3]],
    5: [[1, 1], [3, 1], [2, 2], [1, 3], [3, 3]], 6: [[1, 1], [3, 1], [1, 2], [3, 2], [1, 3], [3, 3]],
  }[pips];
  return `<g transform="translate(${x} ${y}) rotate(${rotate})"><rect x="${-size / 2}" y="${-size / 2}" width="${size}" height="${size}" rx="${size / 6}" fill="#fffdf7"/>${spots.map(([i, j]) => `<circle cx="${-size / 2 + i * p}" cy="${-size / 2 + j * p}" r="${size / 11}" fill="#2b2d42"/>`).join('')}</g>`;
};

const COVERS = {
  'times-up': cover({ from: '#f07167', to: '#b5446e', light: '#ffe8a3' }, `
    <rect x="92" y="58" width="116" height="16" rx="8" fill="#3d2c2e"/>
    <rect x="92" y="238" width="116" height="16" rx="8" fill="#3d2c2e"/>
    <path d="M108 74h84c0 48-30 60-34 82c4 22 34 34 34 82h-84c0-48 30-60 34-82c-4-22-34-34-34-82z" fill="#fff8ee" fill-opacity="0.9"/>
    <path d="M118 90h64c-3 28-22 40-32 54c-10-14-29-26-32-54z" fill="#ffd166"/>
    <rect x="148.5" y="146" width="3" height="56" rx="1.5" fill="#ffd166"/>
    <path d="M114 236c8-30 22-42 36-42s28 12 36 42z" fill="#ffd166"/>
    <rect x="98" y="74" width="6" height="164" fill="#3d2c2e"/><rect x="196" y="74" width="6" height="164" fill="#3d2c2e"/>
    <path d="M28 102a30 26 0 1 1 18 24l-14 10 4-14a30 26 0 0 1-8-20z" fill="#fff"/>${dots(57, 102, '#b5446e')}
    <path d="M236 168a26 24 0 1 1 30 22l10 12-16-6a26 24 0 0 1-24-28z" fill="#ffd166"/>
    <rect x="258" y="152" width="7" height="22" rx="3.5" fill="#b5446e"/><circle cx="261.5" cy="182" r="4" fill="#b5446e"/>`),

  'throw-throw-burrito': cover({ from: '#f6bd60', to: '#e76f51', light: '#fff3b0' }, `
    <g stroke="#fff3e0" stroke-width="6" stroke-linecap="round" opacity="0.7"><path d="M22 120h56"/><path d="M36 144h44"/><path d="M28 168h50"/></g>
    <g transform="translate(160 146) rotate(-18)">
      <ellipse cx="0" cy="0" rx="78" ry="38" fill="#f3d9a4"/>
      <path d="M-60-18c30 12 90 12 120 0M-66 4c40 12 92 12 132 0M-58 22c34 8 82 8 116 0" stroke="#d9b06c" stroke-width="4" fill="none" stroke-linecap="round"/>
      <ellipse cx="74" cy="0" rx="16" ry="36" fill="#f8e9c9"/>
      <circle cx="72" cy="-14" r="9" fill="#6a994e"/><circle cx="78" cy="6" r="8" fill="#d62828"/><circle cx="68" cy="16" r="7" fill="#fffdf7"/><circle cx="82" cy="-4" r="5" fill="#bc6c25"/>
      <circle cx="-30" cy="-6" r="5" fill="#3d2c2e"/><circle cx="-6" cy="-6" r="5" fill="#3d2c2e"/><path d="M-30 10q12 12 24 0" stroke="#3d2c2e" stroke-width="4" fill="none" stroke-linecap="round"/>
    </g>
    <path d="M232 54l8 20 22-6-14 18 16 14-22-2-4 22-10-20-20 8 12-18-16-14 22 2z" fill="#fff3b0"/>
    <g transform="translate(96 242) rotate(24) scale(0.45)"><ellipse rx="78" ry="38" fill="#f3d9a4"/><ellipse cx="74" rx="16" ry="36" fill="#f8e9c9"/><circle cx="74" cy="-10" r="10" fill="#6a994e"/><circle cx="76" cy="10" r="9" fill="#d62828"/></g>`),

  sussed: cover({ from: '#ffd166', to: '#f4a261', light: '#ffffff', glowY: 170 }, `
    ${[['A', -16, 100, '#ef476f'], ['B', 0, 150, '#118ab2'], ['C', 16, 200, '#06d6a0']].map(([letter, angle, x, color]) => `
      <g transform="translate(${x} 196) rotate(${angle})"><rect x="-38" y="-56" width="76" height="112" rx="12" fill="#fffdf7"/><circle cx="0" cy="-6" r="24" fill="${color}"/>
      <text x="0" y="4" text-anchor="middle" font-family="Georgia, serif" font-size="30" font-weight="700" fill="#fffdf7">${letter}</text><rect x="-22" y="32" width="44" height="6" rx="3" fill="#e9dccb"/></g>`).join('')}
    <path d="M108 52a62 46 0 1 1 30 40l-24 16 6-22a62 46 0 0 1-12-34z" fill="#3d2c2e"/>
    <text x="150" y="78" text-anchor="middle" font-family="Georgia, serif" font-size="56" font-weight="700" fill="#ffd166">?</text>`),

  'la-polilla-tramposa': cover({ from: '#2e1a47', to: '#6b3fa0', light: '#f7d6ff', glowY: 140 }, `
    <circle cx="236" cy="62" r="26" fill="#fdf0d5"/><circle cx="246" cy="56" r="22" fill="#3a2258"/>
    ${[[60, 250, -20], [100, 274, 12], [214, 262, -8]].map(([x, y, r]) => `<rect x="${x - 18}" y="${y - 26}" width="36" height="52" rx="6" fill="#f2e9e4" transform="rotate(${r} ${x} ${y})"/><circle cx="${x}" cy="${y}" r="6" fill="#c77dff" transform="rotate(${r} ${x} ${y})"/>`).join('')}
    <g transform="translate(150 150)">
      <path d="M-6-6C-46-70-112-58-104-10C-98 24-40 22-6 6z" fill="#e0aaff"/><path d="M6-6C46-70 112-58 104-10C98 24 40 22 6 6z" fill="#e0aaff"/>
      <path d="M-6 6C-48 18-86 44-70 72C-56 92-22 64-4 20z" fill="#c77dff"/><path d="M6 6C48 18 86 44 70 72C56 92 22 64 4 20z" fill="#c77dff"/>
      <circle cx="-62" cy="-22" r="12" fill="#7b2cbf"/><circle cx="62" cy="-22" r="12" fill="#7b2cbf"/><circle cx="-62" cy="-22" r="5" fill="#ffd166"/><circle cx="62" cy="-22" r="5" fill="#ffd166"/>
      <ellipse cx="0" cy="8" rx="10" ry="40" fill="#3c096c"/><circle cx="0" cy="-34" r="11" fill="#3c096c"/>
      <path d="M-4-42C-14-70-30-78-38-74M4-42C14-70 30-78 38-74" stroke="#3c096c" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="-4" cy="-36" r="2.5" fill="#fff"/><circle cx="5" cy="-36" r="2.5" fill="#fff"/>
    </g>
    <path d="M30 52q22-18 44 0q-22 18-44 0z" fill="#fdf0d5"/><circle cx="52" cy="52" r="7" fill="#2e1a47"/>`),

  scram: cover({ from: '#52b788', to: '#1b4332', light: '#ffe8a3', glowY: 190 }, `
    ${[[40, 50], [92, 34], [214, 44], [262, 78], [150, 26]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.5" fill="#fefae0"/>`).join('')}
    <path d="M40 222L106 108L172 222z" fill="#e76f51"/><path d="M106 108L128 222H84z" fill="#9c3d2e"/>
    <g transform="translate(206 210)"><rect x="-36" y="0" width="72" height="12" rx="6" fill="#7f5539" transform="rotate(14)"/><rect x="-36" y="0" width="72" height="12" rx="6" fill="#9c6644" transform="rotate(-14)"/>
      <path d="M0-74C24-46 30-24 22-6C16 6-16 6-22-6C-30-24-16-38-6-50C-6-36 2-30 6-34C10-46 4-58 0-74z" fill="#ffb703"/><path d="M0-40C12-26 12-12 6-4C2 2-6 2-8-4C-12-14-6-24 0-40z" fill="#fff3b0"/></g>
    ${[[60, 270, -10], [96, 290, 14], [140, 268, -6], [178, 288, 10]].map(([x, y, r]) => `<g transform="translate(${x} ${y}) rotate(${r})" fill="#fefae0" opacity="0.85"><ellipse cx="0" cy="4" rx="8" ry="7"/><circle cx="-8" cy="-7" r="3.2"/><circle cx="-2" cy="-10" r="3.2"/><circle cx="5" cy="-9" r="3.2"/><circle cx="10" cy="-4" r="3"/></g>`).join('')}`),

  spoilers: cover({ from: '#4a4e69', to: '#1d1b2f', light: '#f2e9e4' }, `
    <circle cx="198" cy="112" r="62" fill="#22223b"/><circle cx="198" cy="112" r="18" fill="#4a4e69"/>
    ${[0, 72, 144, 216, 288].map(a => `<circle cx="${198 + 38 * Math.cos((a * Math.PI) / 180)}" cy="${112 + 38 * Math.sin((a * Math.PI) / 180)}" r="12" fill="#4a4e69"/>`).join('')}
    <g transform="translate(118 172)"><rect x="-76" y="-14" width="152" height="96" rx="8" fill="#f2e9e4"/>
      <g transform="rotate(-14 -76 -14)"><rect x="-76" y="-46" width="152" height="30" rx="5" fill="#22223b"/>${[-60, -24, 12, 48].map(x => `<path d="M${x} -46h18l-14 30h-18z" fill="#f2e9e4"/>`).join('')}</g>
      <rect x="-76" y="-14" width="152" height="14" fill="#22223b"/>${[-56, -20, 16, 52].map(x => `<path d="M${x} -14h18l-12 14h-18z" fill="#f2e9e4"/>`).join('')}
      <circle cx="-24" cy="36" r="14" fill="#c9ada7"/><rect x="2" y="26" width="58" height="8" rx="4" fill="#c9ada7"/><rect x="2" y="42" width="40" height="8" rx="4" fill="#c9ada7"/></g>
    <path d="M226 228c0-16 28-16 28 0v26h-28z" fill="#f4a261"/><rect x="218" y="210" width="44" height="10" rx="5" fill="#e63946"/>
    <rect x="236" y="182" width="8" height="34" rx="4" fill="#f2e9e4"/>`),

  'mision-secreta': cover({ from: '#1f3a6b', to: '#0b132b', light: '#8ecae6' }, `
    <rect x="146" y="40" width="8" height="34" rx="4" fill="#8ecae6"/><circle cx="150" cy="38" r="10" fill="#ffb703"/>
    <rect x="70" y="72" width="80" height="80" rx="16" fill="#219ebc"/><rect x="150" y="72" width="80" height="80" rx="16" fill="#8ecae6"/>
    <rect x="70" y="152" width="80" height="80" rx="16" fill="#8ecae6"/><rect x="150" y="152" width="80" height="80" rx="16" fill="#219ebc"/>
    <rect x="70" y="72" width="160" height="160" rx="24" fill="none" stroke="#0b132b" stroke-width="5"/><path d="M150 72v160M70 152h160" stroke="#0b132b" stroke-width="5"/>
    <path d="M58 128c40-20 144-20 184 0l-8 30c-36-14-132-14-168 0z" fill="#0b132b"/>
    <circle cx="116" cy="140" r="11" fill="#ffb703"/><circle cx="184" cy="140" r="11" fill="#ffb703"/>
    <rect x="114" y="192" width="72" height="14" rx="7" fill="#0b132b"/>${[124, 140, 156, 172].map(x => `<rect x="${x}" y="195" width="6" height="8" rx="2" fill="#8ecae6"/>`).join('')}
    <rect x="52" y="140" width="18" height="40" rx="8" fill="#023047"/><rect x="230" y="140" width="18" height="40" rx="8" fill="#023047"/>`),

  'chao-pescao': cover({ from: '#48cae4', to: '#023e8a', light: '#caf0f8', glowY: 170 }, `
    <path d="M196 0v104" stroke="#caf0f8" stroke-width="3"/><path d="M196 104v26c0 18-26 18-26 2" stroke="#caf0f8" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M170 132l-8-10 12 2z" fill="#caf0f8"/>
    <g transform="translate(140 196) rotate(-8)">
      <path d="M70 0L112-34V34z" fill="#f77f00"/>
      <ellipse cx="0" cy="0" rx="82" ry="46" fill="#fcbf49"/>
      <path d="M-20-44c10 30 10 58 0 88M10-44c10 30 10 58 0 88" stroke="#f77f00" stroke-width="7" fill="none"/>
      <path d="M-52-12l12 12M-40-12l-12 12" stroke="#3d2c2e" stroke-width="5" stroke-linecap="round"/>
      <path d="M-76 14q8 8 16 0" stroke="#3d2c2e" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M-4-44q20-24 40 0z" fill="#f77f00"/>
    </g>
    ${[[52, 120, 10], [70, 92, 6], [250, 220, 8], [236, 250, 5], [60, 270, 7]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#caf0f8" stroke-width="3"/>`).join('')}`),

  mimika: cover({ from: '#fefae0', to: '#e9d8a6', light: '#ffffff' }, `
    <path d="M60 300c10-60 50-84 90-84s80 24 90 84z" fill="#fffdf7"/>
    ${[232, 252, 272, 292].map(y => `<path d="M${74 + (y - 232) * 0.2} ${y}h${152 - (y - 232) * 0.4}" stroke="#1d1d1f" stroke-width="10"/>`).join('')}
    <ellipse cx="150" cy="150" rx="62" ry="74" fill="#fffdf7"/>
    <path d="M86 104c10-40 118-40 128 0c-30-16-98-16-128 0z" fill="#1d1d1f"/><circle cx="150" cy="70" r="7" fill="#1d1d1f"/>
    <path d="M114 134q12-12 24 0M162 134q12-12 24 0" stroke="#1d1d1f" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M126 112l-6 8M174 112l6 8" stroke="#1d1d1f" stroke-width="3" stroke-linecap="round"/>
    <path d="M126 178q24 22 48 0q-24 10-48 0z" fill="#d62828"/>
    <path d="M178 150l-4 16" stroke="#118ab2" stroke-width="4" stroke-linecap="round"/>
    <g fill="#fffdf7" stroke="#1d1d1f" stroke-width="3"><path d="M30 176c0-22 8-30 16-30s10 8 10 20v40H34z"/><path d="M270 176c0-22-8-30-16-30s-10 8-10 20v40h22z"/></g>
    <path d="M44 150v-60M256 150v-60" stroke="#1d1d1f" stroke-width="3" stroke-dasharray="6 6"/>`),

  'game-off': cover({ from: '#415a77', to: '#0d1b2a', light: '#ff8fab' }, `
    ${[[-24, '#e0e1dd'], [-8, '#e0e1dd'], [8, '#e0e1dd'], [24, '#fffdf7']].map(([r, fill]) => `<rect x="112" y="96" width="76" height="110" rx="10" fill="${fill}" transform="rotate(${r} 150 220)"/>`).join('')}
    <g transform="rotate(24 150 220)"><path d="M137 127.5A26 26 0 1 0 163 127.5" fill="none" stroke="#ff595e" stroke-width="9" stroke-linecap="round"/><rect x="145.5" y="114" width="9" height="34" rx="4.5" fill="#ff595e"/></g>
    ${[[56, 70], [244, 90], [70, 250], [236, 262]].map(([x, y]) => `<path d="M${x} ${y - 8}l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="#ff8fab"/>`).join('')}`),

  'alguien-ha-probado': cover({ from: '#ffb703', to: '#fb8500', light: '#fff3b0', glowY: 120 }, `
    <path d="M70 160l80-34 80 34-80 34z" fill="#bc6c25"/><path d="M70 160v86l80 34v-86z" fill="#dda15e"/><path d="M230 160v86l-80 34v-86z" fill="#bc6c25"/>
    <path d="M70 160l-26-34 80-34 26 34z" fill="#e9c46a"/><path d="M230 160l26-34-80-34-26 34z" fill="#e9c46a"/>
    <text x="150" y="128" text-anchor="middle" font-family="Georgia, serif" font-size="96" font-weight="700" fill="#fffdf7">?</text>
    ${[[64, 70, 1], [236, 62, 0.8], [256, 116, 0.6], [44, 118, 0.7]].map(([x, y, s]) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0-14l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="#fffdf7"/>`).join('')}`),

  'la-vacuna-espanola': cover({ from: '#e63946', to: '#9d0208', light: '#ffccd5' }, `
    <g transform="rotate(-32 150 150)">
      <rect x="84" y="128" width="132" height="44" rx="10" fill="#f1faee"/><rect x="96" y="134" width="70" height="32" rx="6" fill="#a8dadc"/>
      ${[110, 126, 142, 158, 174, 190].map(x => `<rect x="${x}" y="128" width="3" height="14" fill="#457b9d"/>`).join('')}
      <rect x="216" y="142" width="40" height="16" rx="4" fill="#f1faee"/><rect x="256" y="132" width="8" height="36" rx="3" fill="#457b9d"/>
      <rect x="40" y="146" width="44" height="8" fill="#ced4da"/><path d="M40 146l-16 4 16 4z" fill="#ced4da"/>
      <circle cx="122" cy="146" r="4" fill="#1d3557"/><circle cx="140" cy="146" r="4" fill="#1d3557"/><path d="M118 156q13 10 26 0" stroke="#1d3557" stroke-width="3" fill="none" stroke-linecap="round"/>
    </g>
    <path d="M34 58a44 30 0 1 1 24 26l-18 12 4-16a44 30 0 0 1-10-22z" fill="#ffccd5"/><text x="78" y="66" text-anchor="middle" font-family="Georgia, serif" font-size="22" font-weight="700" fill="#9d0208">ja ja</text>
    <path d="M200 236a40 28 0 1 1 22 24l-16 12 4-14a40 28 0 0 1-10-22z" fill="#ffccd5"/><text x="240" y="244" text-anchor="middle" font-family="Georgia, serif" font-size="20" font-weight="700" fill="#9d0208">¡ay!</text>`),

  'el-cubilete': cover({ from: '#9d0208', to: '#370617', light: '#ffba08', glowY: 170 }, `
    <g transform="rotate(-24 120 150)"><path d="M70 70h100l-12 140H82z" fill="#6f1d1b"/><path d="M70 70h100l-2 18H72z" fill="#432818"/>
      <path d="M78 104h84M80 186h80" stroke="#bb9457" stroke-width="3" stroke-dasharray="6 5"/><ellipse cx="120" cy="210" rx="38" ry="8" fill="#2b0f0e"/></g>
    ${die(196, 214, 46, 18, 5)}${die(148, 252, 40, -12, 3)}${die(236, 266, 36, 30, 6)}`),

  'juego-de-beber': cover({ from: '#ffbe0b', to: '#fb5607', light: '#fff3b0', glowY: 140 }, `
    <g transform="rotate(-14 110 170)"><path d="M70 96h76l-10 140H80z" fill="#fff8e1" fill-opacity="0.55"/><path d="M74 124h68l-8 108H82z" fill="#ffb703"/><path d="M70 96h76v26c-12 8-24 0-38 8s-26 0-38-8z" fill="#fffdf7"/><path d="M72 136h-14c-12 0-12 50 0 50h18" stroke="#fff8e1" stroke-width="7" fill="none"/></g>
    <g transform="rotate(14 190 170)"><path d="M154 96h76l-10 140h-56z" fill="#fff8e1" fill-opacity="0.55"/><path d="M158 124h68l-8 108h-52z" fill="#ffb703"/><path d="M154 96h76v26c-12 8-24 0-38 8s-26 0-38-8z" fill="#fffdf7"/><path d="M228 136h14c12 0 12 50 0 50h-18" stroke="#fff8e1" stroke-width="7" fill="none"/></g>
    ${[[150, 60, 9], [132, 40, 6], [170, 34, 7], [116, 68, 5], [186, 70, 5]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fffdf7"/>`).join('')}
    ${[[110, 170], [118, 198], [196, 184], [188, 210]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#fff3b0"/>`).join('')}`),
};

const out = new URL('../public/covers/', import.meta.url);
mkdirSync(out, { recursive: true });
for (const [slug, svg] of Object.entries(COVERS)) writeFileSync(new URL(`${slug}.svg`, out), svg);
console.log(`${Object.keys(COVERS).length} portadas en public/covers/`);
