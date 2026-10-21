// Weight 1: the simplest games.
import { card, cover, die, dots, pie, sparkle } from './frame.mjs';

export default {
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
  // Casa Enzo
  'codigo-secreto': cover({ from: '#2b4162', to: '#12100e', light: '#f4d35e', glowY: 130 }, `
    ${[0, 1, 2].flatMap(row => [0, 1, 2].map(col => `<rect x="${72 + col * 54}" y="${152 + row * 38}" width="48" height="32" rx="5" fill="${['#d64545', '#efe1c6', '#3d7dd8', '#3d7dd8', '#2b2d42', '#efe1c6', '#efe1c6', '#d64545', '#3d7dd8'][row * 3 + col]}"/>`)).join('')}
    <path d="M100 112C100 76 116 60 150 60s50 16 50 52z" fill="#1b1b1e"/><path d="M132 62q18 14 36 0" stroke="#2b2d42" stroke-width="5" fill="none"/>
    <rect x="100" y="98" width="100" height="12" fill="#d64545"/><ellipse cx="150" cy="114" rx="82" ry="12" fill="#1b1b1e"/>
    <rect x="110" y="122" width="34" height="18" rx="8" fill="#1b1b1e"/><rect x="156" y="122" width="34" height="18" rx="8" fill="#1b1b1e"/><path d="M144 128h12" stroke="#1b1b1e" stroke-width="4"/>
    <path d="M116 126l10 0" stroke="#f4d35e" stroke-width="3" stroke-linecap="round"/>`),

  'codigo-secreto-disney': cover({ from: '#7b2cbf', to: '#240046', light: '#ffd6ff', glowY: 110 }, `
    <rect x="92" y="108" width="116" height="38" fill="#f8edff"/>
    <rect x="98" y="88" width="28" height="58" fill="#f8edff"/><path d="M94 90L112 56L130 90z" fill="#4cc9f0"/>
    <rect x="174" y="88" width="28" height="58" fill="#f8edff"/><path d="M170 90L188 56L206 90z" fill="#4cc9f0"/>
    <rect x="132" y="66" width="36" height="80" fill="#fff"/><path d="M126 68L150 26L174 68z" fill="#ff70a6"/><path d="M150 26v-14l14 5-14 5" fill="#ffd166"/>
    <path d="M140 146v-18a10 10 0 0 1 20 0v18z" fill="#7b2cbf"/><circle cx="150" cy="92" r="6" fill="#ffd166"/>
    ${[0, 1, 2].flatMap(row => [0, 1, 2].map(col => `<rect x="${72 + col * 54}" y="${162 + row * 34}" width="48" height="28" rx="5" fill="${['#ff70a6', '#fff3e6', '#4cc9f0', '#4cc9f0', '#fff3e6', '#ff70a6', '#fff3e6', '#ff70a6', '#4cc9f0'][row * 3 + col]}"/>`)).join('')}
    ${sparkle(56, 70, 14, '#ffd166')}${sparkle(244, 54, 18, '#fff')}${sparkle(250, 130, 10, '#ffd166')}`),

  'dungeons-drinks': cover({ from: '#5a8f29', to: '#1e3a14', light: '#fff3b0' }, `
    <g transform="rotate(-35 150 160)"><rect x="144" y="34" width="12" height="160" rx="3" fill="#dfe7ec"/><rect x="118" y="190" width="64" height="10" rx="5" fill="#b08968"/><rect x="145" y="200" width="10" height="34" fill="#6f4e37"/><circle cx="150" cy="238" r="8" fill="#b08968"/></g>
    <path d="M188 134h16c16 0 16 66 0 66h-16" stroke="#8d5b34" stroke-width="11" fill="none"/>
    <rect x="102" y="112" width="88" height="112" rx="10" fill="#c08552"/><rect x="102" y="128" width="88" height="8" fill="#8d5b34"/><rect x="102" y="200" width="88" height="8" fill="#8d5b34"/>
    <rect x="114" y="140" width="10" height="54" rx="5" fill="#dda15e"/>
    ${[[108, 108, 14], [128, 100, 17], [152, 98, 18], [176, 104, 15], [190, 114, 10], [120, 118, 10]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fffdf7"/>`).join('')}
    <path d="M44 262c0-40 64-40 64 0z" fill="#a7c957"/><circle cx="66" cy="246" r="5" fill="#1e3a14"/><circle cx="86" cy="246" r="5" fill="#1e3a14"/><path d="M68 256q8 6 16 0" stroke="#1e3a14" stroke-width="3" fill="none"/>`),

  timeline: cover({ from: '#2a9d8f', to: '#1d3557', light: '#e9f5db', glowY: 140 }, `
    <path d="M24 226H268" stroke="#e9f5db" stroke-width="5" stroke-linecap="round"/><path d="M268 216l14 10-14 10z" fill="#e9f5db"/>
    ${[[74, -6], [150, 3], [226, -3]].map(([x, r]) => `<circle cx="${x}" cy="226" r="8" fill="#e9c46a"/><path d="M${x} 218v-12" stroke="#e9f5db" stroke-width="3"/>${card(x, 150, 66, 92, r, '#fffdf7', '<rect x="-20" y="30" width="40" height="8" rx="4" fill="#d8e2dc"/>')}`).join('')}
    <g transform="translate(74 140) rotate(-6)"><path d="M-22 14L0-22L22 14z" fill="#e9c46a"/><path d="M0-22L7 14H22z" fill="#d4a373"/></g>
    <g transform="translate(150 140) rotate(3)"><circle cx="0" cy="-6" r="16" fill="#ffd166"/><rect x="-7" y="9" width="14" height="10" rx="2" fill="#8d99ae"/><path d="M-5-6l5 6 5-6" stroke="#e76f51" stroke-width="2.5" fill="none"/></g>
    <g transform="translate(226 140) rotate(-3)"><path d="M0-26C10-16 12 0 8 14H-8C-12 0-10-16 0-26z" fill="#e76f51"/><circle cx="0" cy="-6" r="5" fill="#a8dadc"/><path d="M-8 4l-8 12h8zM8 4l8 12h-8z" fill="#264653"/><path d="M-4 16h8l-4 10z" fill="#ffb703"/></g>`),

  virus: cover({ from: '#264653', to: '#14213d', light: '#e9f5db' }, `
    ${[[108, 118, 34, '#e63946'], [200, 104, 27, '#4895ef'], [124, 210, 30, '#52b788'], [210, 200, 36, '#ffd166']].map(([cx, cy, r, c]) => `<g transform="translate(${cx} ${cy})">${Array.from({ length: 8 }, (_, i) => { const a = (i * Math.PI) / 4 + 0.3; return `<path d="M0 0L${((r + 12) * Math.cos(a)).toFixed(1)} ${((r + 12) * Math.sin(a)).toFixed(1)}" stroke="${c}" stroke-width="5"/><circle cx="${((r + 14) * Math.cos(a)).toFixed(1)}" cy="${((r + 14) * Math.sin(a)).toFixed(1)}" r="6" fill="${c}"/>`; }).join('')}<circle r="${r}" fill="${c}"/><circle cx="${-r / 3}" cy="${-r / 6}" r="${r / 7}" fill="#1d1d1f"/><circle cx="${r / 3}" cy="${-r / 6}" r="${r / 7}" fill="#1d1d1f"/><path d="M${-r / 3} ${r / 4}q${r / 3} ${r / 4} ${(2 * r) / 3} 0" stroke="#1d1d1f" stroke-width="3" fill="none" stroke-linecap="round"/></g>`).join('')}`),

  'so-clover': cover({ from: '#95d5b2', to: '#2d6a4f', light: '#ffffff', glowY: 150 }, `
    <path d="M152 196q12 50-14 96" stroke="#1b4332" stroke-width="9" fill="none" stroke-linecap="round"/>
    ${[[-1, -1, '#52b788'], [1, -1, '#40916c'], [1, 1, '#52b788'], [-1, 1, '#40916c']].map(([dx, dy, c]) => `<rect x="${150 + dx * 44 - 38}" y="${150 + dy * 44 - 38}" width="76" height="76" rx="30" fill="${c}" transform="rotate(45 ${150 + dx * 44} ${150 + dy * 44})"/><rect x="${150 + dx * 44 - 20}" y="${150 + dy * 44 - 8}" width="40" height="6" rx="3" fill="#d8f3dc"/><rect x="${150 + dx * 44 - 14}" y="${150 + dy * 44 + 4}" width="28" height="6" rx="3" fill="#d8f3dc"/>`).join('')}
    <circle cx="150" cy="150" r="10" fill="#1b4332"/>`),

  'just-one': cover({ from: '#4361ee', to: '#3a0ca3', light: '#bde0fe', glowY: 120 }, `
    ${card(150, 108, 74, 100, -4, '#fffdf7', '<text x="0" y="16" text-anchor="middle" font-family="Georgia, serif" font-size="50" font-weight="700" fill="#4361ee">?</text>')}
    ${[[60, false], [114, true], [168, false], [222, true]].map(([x, crossed]) => `<path d="M${x - 14} 244l6-30M${x + 14} 244l-6-30" stroke="#bde0fe" stroke-width="4" stroke-linecap="round"/><rect x="${x - 24}" y="186" width="48" height="34" rx="5" fill="#fffdf7"/><path d="M${x - 14} 200q7-8 14 0t14 0" stroke="#2b2d42" stroke-width="3" fill="none" stroke-linecap="round"/>${crossed ? `<path d="M${x - 16} 192l32 22M${x + 16} 192l-32 22" stroke="#ef476f" stroke-width="4" stroke-linecap="round"/>` : ''}`).join('')}`),

  'the-decades': cover({ from: '#ff006e', to: '#3a0ca3', light: '#ffbe0b', glowY: 160 }, `
    <path d="M30 80l20-20 20 20 20-20 20 20" stroke="#3a86ff" stroke-width="6" fill="none" stroke-linejoin="round"/>
    <path d="M226 52l30 8-22 22z" fill="#ffbe0b"/><circle cx="62" cy="250" r="16" fill="none" stroke="#8ecae6" stroke-width="5"/><path d="M220 240h40M230 252h40" stroke="#06d6a0" stroke-width="5" stroke-linecap="round"/>
    <rect x="70" y="106" width="160" height="104" rx="12" fill="#1d1d1f"/><rect x="84" y="118" width="132" height="44" rx="4" fill="#ffbe0b"/><rect x="84" y="134" width="132" height="6" fill="#ff006e"/><rect x="84" y="144" width="132" height="6" fill="#3a86ff"/>
    <rect x="110" y="172" width="80" height="26" rx="13" fill="#3d3d40"/>
    ${[124, 176].map(x => `<circle cx="${x}" cy="185" r="15" fill="#fffdf7"/><circle cx="${x}" cy="185" r="6" fill="#1d1d1f"/>`).join('')}
    <path d="M96 210l10-14h88l10 14" fill="#2d2d30"/>`),

  'sushi-go': cover({ from: '#ff8fa3', to: '#c9184a', light: '#fff0f3' }, `
    <g transform="rotate(-18 150 80)"><rect x="60" y="70" width="190" height="7" rx="3.5" fill="#d4a373"/><rect x="60" y="86" width="190" height="7" rx="3.5" fill="#bc8a5f"/></g>
    <g transform="translate(140 158)"><ellipse rx="70" ry="34" fill="#fffdf7"/><path d="M-76-14C-60-44 60-50 78-16C60-4-60-2-76-14z" fill="#f4845f"/>${[-40, -12, 16, 44].map(x => `<path d="M${x}-36q8 12 0 26" stroke="#ffd6a5" stroke-width="5" fill="none" stroke-linecap="round"/>`).join('')}
      <circle cx="-20" cy="10" r="5" fill="#1d1d1f"/><circle cx="20" cy="10" r="5" fill="#1d1d1f"/><path d="M-8 18q8 8 16 0" stroke="#1d1d1f" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="-34" cy="18" r="6" fill="#ffafcc"/><circle cx="34" cy="18" r="6" fill="#ffafcc"/></g>
    ${[[84, 236, '#06d6a0'], [204, 230, '#ffd166']].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="34" fill="#1b4332"/><circle cx="${x}" cy="${y}" r="26" fill="#fffdf7"/><circle cx="${x}" cy="${y}" r="11" fill="${c}"/>`).join('')}`),

  'trivial-real-madrid': cover({ from: '#3c096c', to: '#10002b', light: '#e0aaff' }, `
    ${pie(140, 140, 72, ['#fffdf7', '#9d4edd', '#ffd166', '#fffdf7', '#9d4edd', '#ffd166'], 4, '#10002b')}
    <g transform="translate(212 214)"><circle r="36" fill="#fffdf7"/><path d="M0-12l11 8-4 13H-7l-4-13z" fill="#1d1d1f"/>${[[0, -12, 0, -36], [11, -4, 34, -11], [7, 9, 21, 29], [-7, 9, -21, 29], [-11, -4, -34, -11]].map(([a, b, c, d]) => `<path d="M${a} ${b}L${c} ${d}" stroke="#1d1d1f" stroke-width="2.5"/>`).join('')}</g>
    ${sparkle(52, 236, 16, '#ffd166')}${sparkle(244, 62, 12, '#e0aaff')}`),

  'torre-de-bloques': cover({ from: '#ffd6a5', to: '#e76f51', light: '#ffffff', glowY: 160 }, `
    ${Array.from({ length: 9 }, (_, i) => {
      const y = 246 - i * 20;
      if (i % 2) return `<rect x="105" y="${y}" width="90" height="18" rx="3" fill="${i === 5 ? '#d4a373' : '#deb887'}"/><path d="M110 ${y + 9}h80" stroke="#c9a06b" stroke-width="1.5"/>`;
      return [0, 1, 2].map(b => (i === 4 && b === 1) ? '' : `<rect x="${105 + b * 30 + (i === 6 && b === 2 ? 34 : 0)}" y="${y}" width="28" height="18" rx="3" fill="${b % 2 ? '#d4a373' : '#e6c08f'}"/>`).join('');
    }).join('')}
    <g transform="rotate(16 200 60)"><rect x="170" y="52" width="60" height="18" rx="3" fill="#e6c08f"/></g>
    <path d="M232 92q14-8 20 4M240 104q12-2 14 8" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>`),

  'trivial-pursuit': cover({ from: '#4895ef', to: '#14213d', light: '#caf0f8' }, `
    ${pie(150, 156, 82, ['#3a86ff', '#ff70a6', '#ffd166', '#8d6e63', '#52b788', '#fb8500'], 2, '#14213d')}
    <path d="M196 40a46 34 0 1 1 26 30l-20 14 6-18a46 34 0 0 1-12-26z" fill="#fffdf7"/><text x="242" y="62" text-anchor="middle" font-family="Georgia, serif" font-size="34" font-weight="700" fill="#4895ef">?</text>`),

  'trivial-senor-anillos': cover({ from: '#344e41', to: '#0b0f0b', light: '#ffd166', glowY: 120 }, `
    <path d="M0 270L60 200L100 236L160 160L220 230L260 196L300 240V400H0z" fill="#1b2a1f"/>
    <ellipse cx="150" cy="118" rx="62" ry="58" fill="none" stroke="#e9b949" stroke-width="16"/><ellipse cx="150" cy="118" rx="62" ry="58" fill="none" stroke="#fff3b0" stroke-width="3" stroke-dasharray="40 160" stroke-dashoffset="20"/>
    ${pie(80, 236, 30, ['#e9b949', '#a3b18a', '#bc6c25', '#e9b949', '#a3b18a', '#bc6c25'], 1, '#0b0f0b')}
    ${sparkle(222, 70, 14, '#fff3b0')}${sparkle(70, 76, 10, '#fff3b0')}`),

  'hues-and-cues': cover({ from: '#22223b', to: '#0d0d1a', light: '#ffffff', glowY: 150 }, `
    ${Array.from({ length: 6 }, (_, row) => Array.from({ length: 8 }, (_, col) => `<rect x="${44 + col * 27}" y="${76 + row * 27}" width="24" height="24" rx="4" fill="hsl(${col * 42 + row * 6} ${80 - row * 4}% ${36 + row * 8}%)"/>`).join('')).join('')}
    <rect x="${44 + 4 * 27 - 4}" y="${76 + 27 - 4}" width="${3 * 27 + 5}" height="${3 * 27 + 5}" rx="8" fill="none" stroke="#fffdf7" stroke-width="4"/>
    <path d="M${44 + 5 * 27 + 12} ${76 + 2 * 27 - 26}l-14 36h28z" fill="#fffdf7"/><circle cx="${44 + 5 * 27 + 12}" cy="${76 + 2 * 27 - 30}" r="9" fill="#fffdf7"/>`),
};
