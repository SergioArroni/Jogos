// Weight 2: games with a few more rules.
import { burst, card, cover, gem, sparkle } from './frame.mjs';

const fedora = (x, y, s, band) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-50-2C-50-38-34-54 0-54s50 16 50 52z" fill="#1b1b1e"/><path d="M-18-52q18 14 36 0" stroke="#2b2d42" stroke-width="5" fill="none"/><rect x="-50" y="-16" width="100" height="12" fill="${band}"/><ellipse cy="0" rx="82" ry="12" fill="#1b1b1e"/></g>`;

const tile = (x, y, size, fill) => `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="${size / 7}" fill="${fill}"/>`;

export default {
  trio: cover({ from: '#06d6a0', to: '#118ab2', light: '#ffffff' }, `
    ${[[104, 154, -16], [150, 140, 0], [196, 154, 16]].map(([x, y, r]) => card(x, y, 76, 108, r, '#fffdf7', `<circle r="27" fill="#118ab2"/><text y="16" text-anchor="middle" font-family="Georgia, serif" font-size="44" font-weight="700" fill="#fffdf7">7</text><text x="-28" y="-36" font-family="Georgia, serif" font-size="13" font-weight="700" fill="#118ab2">7</text>`)).join('')}
    ${[[76, 250], [150, 262], [224, 250]].map(([x, y]) => card(x, y, 40, 56, 0, '#073b4c', '<circle r="9" fill="#06d6a0"/>')).join('')}`),

  'get-on-board': cover({ from: '#ffd166', to: '#f77f00', light: '#ffffff', glowY: 130 }, `
    <g stroke="#fff3d6" stroke-width="3" opacity="0.7">${[60, 110, 160, 210, 260].map(y => `<path d="M20 ${y}H280"/>`).join('')}${[40, 100, 160, 220, 280].map(x => `<path d="M${x} 40V280"/>`).join('')}</g>
    <path d="M40 260H100V210H160V260H220V210" stroke="#3a86ff" stroke-width="9" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
    ${[[100, 210], [160, 260], [220, 210]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="#fffdf7" stroke="#3a86ff" stroke-width="4"/>`).join('')}
    <rect x="78" y="66" width="144" height="112" rx="16" fill="#e63946"/><rect x="78" y="124" width="144" height="8" fill="#ffd166"/>
    ${[90, 122, 154, 186].map(x => `<rect x="${x}" y="78" width="24" height="30" rx="4" fill="#caf0f8"/><rect x="${x}" y="140" width="24" height="24" rx="4" fill="#caf0f8"/>`).join('')}
    ${[106, 194].map(x => `<circle cx="${x}" cy="180" r="15" fill="#1d1d1f"/><circle cx="${x}" cy="180" r="6" fill="#adb5bd"/>`).join('')}`),

  munchkin: cover({ from: '#f4a261', to: '#9c4221', light: '#ffe8a3' }, `
    <path d="M94 128C56 120 44 82 54 52C66 82 82 100 104 108z" fill="#fffdf7"/><path d="M206 128C244 120 256 82 246 52C234 82 218 100 196 108z" fill="#fffdf7"/>
    <path d="M90 150a60 60 0 0 1 120 0z" fill="#adb5bd"/><path d="M110 108a52 52 0 0 1 44-14" stroke="#e9ecef" stroke-width="6" fill="none" stroke-linecap="round"/>
    <rect x="82" y="144" width="136" height="18" rx="6" fill="#6c757d"/>${[96, 124, 152, 180, 206].map(x => `<circle cx="${x}" cy="153" r="3.5" fill="#dee2e6"/>`).join('')}
    <rect x="96" y="162" width="108" height="66" rx="30" fill="#ffcdb2"/>
    <circle cx="128" cy="186" r="15" fill="#fffdf7"/><circle cx="174" cy="186" r="12" fill="#fffdf7"/><circle cx="133" cy="190" r="6" fill="#1d1d1f"/><circle cx="170" cy="182" r="5" fill="#1d1d1f"/>
    <path d="M128 212q22 14 44 0" stroke="#9c4221" stroke-width="5" fill="none" stroke-linecap="round"/><rect x="146" y="214" width="9" height="8" fill="#fffdf7"/>
    ${[[52, 236], [246, 222], [228, 252]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="11" fill="#ffd166" stroke="#e09f3e" stroke-width="3"/>`).join('')}`),

  'isla-prohibida': cover({ from: '#48cae4', to: '#03045e', light: '#ffffff', glowY: 130 }, `
    <ellipse cx="150" cy="176" rx="96" ry="28" fill="#95d5b2"/><ellipse cx="150" cy="170" rx="80" ry="20" fill="#b7e4c7"/>
    <rect x="104" y="150" width="92" height="12" rx="2" fill="#e9d8a6"/>${[112, 136, 160, 184].map(x => `<rect x="${x}" y="104" width="10" height="46" fill="#f1e3c6"/>`).join('')}
    <rect x="104" y="96" width="92" height="10" fill="#e9d8a6"/><path d="M100 98L150 66L200 98z" fill="#e9d8a6"/>
    ${gem(222, 132, 14, '#f77f00', '#ffe8a3')}
    <g transform="rotate(-12 70 220)"><rect x="40" y="200" width="56" height="40" rx="6" fill="#74c69d"/></g><g transform="rotate(10 236 228)"><rect x="210" y="206" width="52" height="38" rx="6" fill="#74c69d"/></g>
    ${[190, 212, 234].map((y, i) => `<path d="M${10 + i * 6} ${y}q20-12 40 0t40 0t40 0t40 0t40 0t40 0t40 0" stroke="#caf0f8" stroke-width="5" fill="none" stroke-linecap="round" opacity="${0.9 - i * 0.2}"/>`).join('')}
    <path d="M0 214q20-12 40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0V400H0z" fill="#0077b6" opacity="0.55"/>`),

  'little-secret': cover({ from: '#ffafcc', to: '#7b2cbf', light: '#ffffff', glowY: 150 }, `
    <path d="M86 168C106 146 132 150 150 160C168 150 194 146 214 168C194 176 172 178 150 176C128 178 106 176 86 168z" fill="#d62828"/>
    <path d="M86 168C108 200 192 200 214 168C194 176 172 178 150 176C128 178 106 176 86 168z" fill="#ef476f"/>
    <rect x="138" y="94" width="24" height="112" rx="12" fill="#ffcdb2"/><path d="M142 102q8-6 16 0" stroke="#e5989b" stroke-width="3" fill="none"/>
    ${[[60, 80], [238, 100], [66, 238]].map(([x, y]) => `<path d="M${x - 30} ${y}a30 22 0 1 1 16 20l-12 10 3-12a30 22 0 0 1-7-18z" fill="#fffdf7" opacity="0.92"/><g fill="#7b2cbf">${[-10, 0, 10].map(dx => `<circle cx="${x + dx}" cy="${y}" r="3.5"/>`).join('')}</g>`).join('')}
    ${sparkle(236, 236, 14, '#fffdf7')}`),

  'boomerang-europa': cover({ from: '#8ecae6', to: '#219ebc', light: '#ffffff', glowY: 120 }, `
    <path d="M40 240C80 120 220 60 260 140" stroke="#fffdf7" stroke-width="4" stroke-dasharray="2 12" stroke-linecap="round" fill="none"/>
    <g transform="translate(150 150) rotate(-20)"><rect x="-14" y="-14" width="112" height="28" rx="14" fill="#e76f51" transform="rotate(-32)"/><rect x="-14" y="-14" width="112" height="28" rx="14" fill="#f4845f" transform="rotate(-148)"/><circle r="14" fill="#e76f51"/>
      ${[34, 60, 84].map(d => `<circle cx="${d}" r="4" fill="#fff3b0" transform="rotate(-32)"/><circle cx="${d}" r="4" fill="#fff3b0" transform="rotate(-148)"/>`).join('')}</g>
    <g fill="#023047"><path d="M226 262L240 196L254 262h-6l-8-30-8 30z"/><rect x="230" y="222" width="20" height="5"/><rect x="238" y="186" width="4" height="12"/></g>
    <g transform="translate(40 244)"><rect width="46" height="22" rx="5" fill="#fb8500"/><rect x="50" width="40" height="22" rx="5" fill="#ffb703"/><rect x="6" y="5" width="10" height="8" fill="#caf0f8"/><rect x="22" y="5" width="10" height="8" fill="#caf0f8"/><rect x="58" y="5" width="10" height="8" fill="#caf0f8"/>${[10, 36, 60, 80].map(x => `<circle cx="${x}" cy="24" r="5" fill="#023047"/>`).join('')}</g>`),

  'impostor-kings': cover({ from: '#9d0208', to: '#1a0000', light: '#ffba08' }, `
    <g transform="rotate(32 150 150)"><path d="M150 40l9 18v112h-18V58z" fill="#e9ecef"/><rect x="128" y="168" width="44" height="9" rx="4" fill="#6c757d"/><rect x="145" y="177" width="10" height="34" fill="#370617"/></g>
    <path d="M86 196V108L118 140L150 90L182 140L214 108V196z" fill="#ffba08"/><rect x="86" y="182" width="128" height="20" rx="4" fill="#e85d04"/>
    ${[[86, 104], [150, 86], [214, 104]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="#ffba08"/>`).join('')}
    ${gem(118, 192, 7, '#d00000', '#fff')}${gem(150, 192, 8, '#3a86ff', '#fff')}${gem(182, 192, 7, '#d00000', '#fff')}
    <path d="M104 150q46-24 92 0q-6 24-28 22q-14-2-18-12q-4 10-18 12q-22 2-28-22z" fill="#1d1d1f"/><ellipse cx="128" cy="154" rx="10" ry="6" fill="#9d0208"/><ellipse cx="172" cy="154" rx="10" ry="6" fill="#9d0208"/>`),

  carcassonne: cover({ from: '#a7c957', to: '#386641', light: '#ffffff' }, `
    <g transform="rotate(-8 150 160)">
      ${[[80, 90], [152, 90], [80, 162], [152, 162]].map(([x, y]) => `<rect x="${x}" y="${y}" width="70" height="70" rx="4" fill="#90be6d" stroke="#6a994e" stroke-width="2"/>`).join('')}
      <path d="M80 90H222V122C190 150 120 150 80 128z" fill="#d4a373"/><path d="M80 128C120 150 190 150 222 122" stroke="#7f5539" stroke-width="6" fill="none"/>
      ${[104, 132, 160, 188].map(x => `<rect x="${x}" y="98" width="14" height="16" fill="#bc6c25"/><path d="M${x - 2} 98l9-10 9 10z" fill="#c1121f"/>`).join('')}
      <path d="M80 204H222" stroke="#f1faee" stroke-width="10"/><path d="M150 204V232" stroke="#f1faee" stroke-width="10"/>
    </g>
    <path transform="translate(196 170)" d="M-26 24L-9 0L-28-6C-32-12-28-18-20-18H20C28-18 32-12 28-6L9 0L26 24H6L0 10L-6 24z" fill="#e63946"/><circle cx="196" cy="140" r="11" fill="#e63946"/>`),

  'codigo-secreto-duo': cover({ from: '#80ed99', to: '#22577a', light: '#ffffff', glowY: 120 }, `
    ${fedora(104, 112, 0.62, '#38a3a5')}${fedora(196, 112, 0.62, '#57cc99')}
    <path d="M86 126h36M178 126h36" stroke="#1b1b1e" stroke-width="12" stroke-linecap="round"/>
    ${Array.from({ length: 25 }, (_, i) => `<rect x="${70 + (i % 5) * 33}" y="${148 + Math.floor(i / 5) * 23}" width="29" height="19" rx="3" fill="${[3, 7, 11, 17, 21].includes(i) ? '#38a3a5' : i === 13 ? '#1b1b1e' : '#f1faee'}"/>`).join('')}`),

  'magic-maze': cover({ from: '#c77dff', to: '#3c096c', light: '#ffd6ff' }, `
    <rect x="62" y="80" width="176" height="176" rx="10" fill="#5a189a"/>
    <path d="M86 104H214V160H130V214H214M86 104V232H170" stroke="#e0aaff" stroke-width="18" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
    ${[[104, 136, '#52b788'], [188, 132, '#f77f00'], [150, 196, '#4cc9f0'], [200, 230, '#ffd166']].map(([x, y, c]) => `<path d="M${x - 10} ${y + 14}L${x - 6} ${y - 2}H${x + 6}L${x + 10} ${y + 14}z" fill="${c}"/><circle cx="${x}" cy="${y - 8}" r="7" fill="${c}"/>`).join('')}
    <g transform="translate(232 70)"><rect x="-20" y="-30" width="40" height="7" rx="3" fill="#ffd6ff"/><rect x="-20" y="23" width="40" height="7" rx="3" fill="#ffd6ff"/><path d="M-15-23h30c0 16-11 18-11 23s11 7 11 23h-30c0-16 11-18 11-23s-11-7-11-23z" fill="#fff3b0"/><path d="M-9 23c2-8 7-10 9-10s7 2 9 10z" fill="#f4a261"/></g>`),

  'dnd-aventura': cover({ from: '#d00000', to: '#370617', light: '#ffba08' }, `
    <path d="M150 64L216 102V178L150 216L84 178V102z" fill="#e5383b"/>
    <path d="M150 88L196 166H104z" fill="#f25c54"/><path d="M150 64L150 88L104 166L84 178M150 64L150 88L196 166L216 178M84 102L104 166M216 102L196 166M150 216L104 166M150 216L196 166" stroke="#9d0208" stroke-width="3" fill="none" stroke-linejoin="round"/>
    <path d="M84 102L150 88L216 102" stroke="#9d0208" stroke-width="3" fill="none"/>
    <text x="150" y="146" text-anchor="middle" font-family="Georgia, serif" font-size="30" font-weight="700" fill="#fffdf7">20</text>
    <path d="M44 214h44v26c0 20-22 30-22 30s-22-10-22-30z" fill="#adb5bd"/><path d="M66 214v56" stroke="#6c757d" stroke-width="4"/>
    ${sparkle(236, 72, 16, '#ffba08')}${sparkle(244, 220, 12, '#ffba08')}`),

  azul: cover({ from: '#f1e3d3', to: '#c9a27e', light: '#ffffff' }, `
    <rect x="62" y="66" width="176" height="176" rx="14" fill="#fffdf7" transform="rotate(-6 150 154)"/>
    <g transform="rotate(-6 150 154)">${Array.from({ length: 25 }, (_, i) => {
      const row = Math.floor(i / 5); const col = i % 5;
      const fill = ['#2a6f97', '#f4a261', '#e63946', '#1d1d1f', '#8ecae6'][(col - row + 5) % 5];
      return [2, 8, 14, 15, 19, 21].includes(i) ? `<rect x="${74 + col * 31}" y="${78 + row * 31}" width="27" height="27" rx="4" fill="none" stroke="#e9dccb" stroke-width="2"/>` : tile(74 + col * 31, 78 + row * 31, 27, fill);
    }).join('')}</g>
    ${[[80, 268, 20, '#2a6f97'], [118, 276, -12, '#e63946'], [196, 270, 8, '#f4a261']].map(([x, y, r, c]) => `<g transform="rotate(${r} ${x} ${y})">${tile(x - 14, y - 14, 28, c)}</g>`).join('')}`),

  'welcome-to': cover({ from: '#bde0fe', to: '#5e60ce', light: '#ffffff', glowY: 130 }, `
    <rect x="0" y="210" width="300" height="190" fill="#95d5b2" opacity="0.8"/>
    ${[[40, '#ffafcc', '#e5383b'], [108, '#ffd166', '#3a86ff'], [176, '#a8dadc', '#e76f51']].map(([x, wall, roof]) => `<rect x="${x}" y="150" width="60" height="62" fill="${wall}"/><path d="M${x - 8} 152L${x + 30} 114L${x + 68} 152z" fill="${roof}"/><rect x="${x + 22}" y="182" width="16" height="30" rx="2" fill="#5e60ce"/><rect x="${x + 8}" y="162" width="14" height="14" rx="2" fill="#fffdf7"/><rect x="${x + 38}" y="162" width="14" height="14" rx="2" fill="#fffdf7"/>`).join('')}
    <circle cx="258" cy="168" r="20" fill="#52b788"/><rect x="255" y="184" width="6" height="28" fill="#7f5539"/>
    <path d="M20 218H280" stroke="#fffdf7" stroke-width="4"/>${Array.from({ length: 14 }, (_, i) => `<rect x="${24 + i * 19}" y="206" width="5" height="18" rx="2" fill="#fffdf7"/>`).join('')}
    <rect x="96" y="238" width="86" height="28" rx="14" fill="#4cc9f0"/><path d="M110 252q8-5 16 0t16 0t16 0" stroke="#caf0f8" stroke-width="3" fill="none"/>`),

  'coffee-rush': cover({ from: '#e6ccb2', to: '#7f5539', light: '#ffffff' }, `
    ${[[118, 56], [150, 50], [182, 56]].map(([x, y]) => `<path d="M${x} ${y + 40}c-10-12 10-20 0-32" stroke="#fffdf7" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.85"/>`).join('')}
    <path d="M108 112H192L180 246H120z" fill="#fffdf7"/><rect x="100" y="100" width="100" height="18" rx="7" fill="#3d2c2e"/><rect x="112" y="92" width="76" height="12" rx="5" fill="#3d2c2e"/>
    <path d="M113 156H187L183 204H117z" fill="#b08968"/><circle cx="150" cy="180" r="12" fill="#fffdf7"/><path d="M144 180q6-8 12 0" stroke="#7f5539" stroke-width="3" fill="none"/>
    ${[[56, 220, 20], [240, 200, -30], [74, 254, 60], [222, 250, 10]].map(([x, y, r]) => `<g transform="rotate(${r} ${x} ${y})"><ellipse cx="${x}" cy="${y}" rx="14" ry="10" fill="#582f0e"/><path d="M${x - 10} ${y}q10-4 20 0" stroke="#b08968" stroke-width="2.5" fill="none"/></g>`).join('')}`),

  'cities-of-splendor': cover({ from: '#bc6c25', to: '#3d1f0b', light: '#ffd166', glowY: 110 }, `
    <path d="M20 270V200H44V170H60V200H84V150a26 26 0 0 1 52 0V200H150V120L166 96L182 120V200H196V176H220V200H236V160H260V200H280V270z" fill="#2b1608"/>
    ${[[54, 186], [110, 180], [170, 170], [228, 186]].map(([x, y]) => `<rect x="${x}" y="${y}" width="8" height="12" fill="#ffd166" opacity="0.8"/>`).join('')}
    ${gem(82, 100, 20, '#2d6a4f', '#b7e4c7')}${gem(150, 70, 24, '#e63946', '#ffccd5')}${gem(218, 100, 20, '#3a86ff', '#caf0f8')}
    <circle cx="116" cy="144" r="13" fill="#ffd166" stroke="#e09f3e" stroke-width="3"/><circle cx="186" cy="146" r="11" fill="#ffd166" stroke="#e09f3e" stroke-width="3"/>`),

  hanabi: cover({ from: '#1d3557', to: '#0b0f1e', light: '#f1faee', glowY: 120 }, `
    ${burst(96, 96, 44, '#e63946')}${burst(200, 80, 36, '#ffd166')}${burst(150, 168, 48, '#4cc9f0', 14)}${burst(80, 212, 30, '#52b788')}${burst(222, 196, 34, '#f1faee')}
    <path d="M150 300V222" stroke="#4cc9f0" stroke-width="3" stroke-dasharray="4 8" opacity="0.7"/>`),

  'secret-hitler': cover({ from: '#e85d04', to: '#370617', light: '#ffba08', glowY: 110 }, `
    <rect x="94" y="62" width="112" height="76" rx="6" fill="#f1e3c6"/><path d="M94 66L150 108L206 66" stroke="#bc8a5f" stroke-width="4" fill="none"/><circle cx="150" cy="106" r="10" fill="#9d0208"/>
    ${card(104, 204, 84, 112, -10, '#fffdf7', '<text y="12" text-anchor="middle" font-family="Georgia, serif" font-size="30" font-weight="700" fill="#2d6a4f">Ja!</text>')}
    ${card(196, 204, 84, 112, 10, '#1d1d1f', '<text y="10" text-anchor="middle" font-family="Georgia, serif" font-size="24" font-weight="700" fill="#e85d04">Nein</text>')}`),

  perspectives: cover({ from: '#577590', to: '#1d2d44', light: '#f9c74f', glowY: 150 }, `
    ${[[70, 92, -16], [232, 96, 14], [80, 232, 10], [222, 226, -12]].map(([x, y, r]) => card(x, y, 64, 74, r, '#fffdf7', `<rect x="-26" y="-30" width="52" height="44" fill="${['#90be6d', '#f9844a', '#43aa8b', '#f8961e'][Math.abs(r) % 4]}"/><path d="M-26 6l14-14 12 10 10-6 16 10v8h-52z" fill="#1d2d44" opacity="0.5"/>`)).join('')}
    <path d="M66 162C100 112 200 112 234 162C200 212 100 212 66 162z" fill="#fffdf7"/><circle cx="150" cy="162" r="32" fill="#f9c74f"/><circle cx="150" cy="162" r="15" fill="#1d2d44"/><circle cx="158" cy="154" r="6" fill="#fffdf7"/>`),

  'cluedo-harry-potter': cover({ from: '#6a040f', to: '#250902', light: '#ffba08' }, `
    <path d="M30 270V190L50 160L70 190V270M220 270V170L244 130L268 170V270" fill="#250902"/><rect x="44" y="206" width="12" height="18" rx="6" fill="#ffba08" opacity="0.8"/>
    <g transform="rotate(38 200 180)"><rect x="196" y="100" width="9" height="150" rx="4" fill="#6f4518"/><rect x="194" y="216" width="13" height="36" rx="5" fill="#3d2309"/></g>
    ${sparkle(240, 88, 16, '#ffe8a3')}${sparkle(214, 70, 9, '#ffe8a3')}
    <circle cx="124" cy="138" r="52" fill="#caf0f8" opacity="0.25"/><circle cx="124" cy="138" r="52" fill="none" stroke="#ffba08" stroke-width="11"/>
    <path d="M86 176L46 226" stroke="#3d2309" stroke-width="16" stroke-linecap="round"/><path d="M104 112a28 28 0 0 1 22-10" stroke="#fffdf7" stroke-width="5" fill="none" stroke-linecap="round"/>`),

  'cold-case': cover({ from: '#6c757d', to: '#212529', light: '#f8f9fa' }, `
    <path d="M52 92H120L132 106H248V250H52z" fill="#c9a27e"/>
    ${card(118, 166, 96, 124, -6, '#fffdf7', `${[-40, -26, -12, 2, 16].map(y => `<rect x="-36" y="${y}" width="${y === 16 ? 40 : 72}" height="6" rx="3" fill="#ced4da"/>`).join('')}`)}
    ${card(196, 150, 76, 88, 8, '#fffdf7', '<rect x="-30" y="-36" width="60" height="56" fill="#495057"/><circle cx="0" cy="-14" r="12" fill="#adb5bd"/><path d="M-20 20a20 16 0 0 1 40 0z" fill="#adb5bd"/>')}
    <path d="M96 112L190 112L226 216L120 226z" stroke="#d00000" stroke-width="3" fill="none"/>${[[96, 112], [190, 112], [226, 216], [120, 226]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#d00000"/><circle cx="${x - 2}" cy="${y - 2}" r="2.5" fill="#ffccd5"/>`).join('')}`),

  mysterium: cover({ from: '#5a189a', to: '#10002b', light: '#c8b6ff', glowY: 140 }, `
    ${card(66, 104, 52, 72, -14, '#c8b6ff', '<path d="M6-16a14 14 0 1 0 0 28a10 10 0 1 1 0-28z" fill="#5a189a"/>')}
    ${card(236, 112, 52, 72, 12, '#ffd6ff', '<path d="M-14 0q14-14 28 0q-14 14-28 0z" fill="#5a189a"/><circle r="4" fill="#ffd6ff"/>')}
    ${card(232, 230, 52, 72, -8, '#b8c0ff', '<circle r="13" fill="none" stroke="#5a189a" stroke-width="3"/><path d="M0-8v8l6 4" stroke="#5a189a" stroke-width="3" fill="none"/>')}
    <path d="M106 222V128a44 44 0 0 1 88 0V222l-15-13-14 13-15-13-15 13-14-13z" fill="#f1e9ff" opacity="0.92"/>
    <ellipse cx="134" cy="132" rx="7" ry="11" fill="#240046"/><ellipse cx="166" cy="132" rx="7" ry="11" fill="#240046"/><ellipse cx="150" cy="162" rx="8" ry="10" fill="#240046"/>
    ${sparkle(64, 220, 12, '#e0aaff')}${sparkle(196, 60, 10, '#e0aaff')}`),

  splendor: cover({ from: '#14746f', to: '#0b2b26', light: '#ffd166', glowY: 140 }, `
    ${gem(80, 112, 24, '#2d6a4f', '#b7e4c7')}${gem(150, 82, 28, '#e63946', '#ffccd5')}${gem(220, 112, 24, '#3a86ff', '#caf0f8')}${gem(104, 192, 22, '#f8f9fa', '#ffffff')}${gem(196, 192, 22, '#3d2c2e', '#adb5bd')}
    <circle cx="150" cy="168" r="24" fill="#ffd166" stroke="#e09f3e" stroke-width="5"/><circle cx="150" cy="168" r="12" fill="none" stroke="#e09f3e" stroke-width="3"/>`),

  'los-inseparables': cover({ from: '#d6ccc2', to: '#6b5a48', light: '#ffffff', glowY: 120 }, `
    <path d="M200 92c-16-18-44-14-56 4c18-6 30-2 36 8z" fill="#fffdf7"/><path d="M196 88c10-20 30-26 44-20c-16 2-26 12-30 26z" fill="#f8f9fa"/><path d="M176 102c10 6 30 6 42-6l14 2-12 6c-14 14-36 12-44-2z" fill="#fffdf7"/>
    <path d="M232 98c10 4 16 12 18 20" stroke="#6a994e" stroke-width="3" fill="none"/><ellipse cx="246" cy="112" rx="5" ry="3" fill="#6a994e"/><ellipse cx="240" cy="106" rx="5" ry="3" fill="#6a994e"/>
    <ellipse cx="150" cy="184" rx="86" ry="18" fill="#6b705c"/><path d="M96 182C96 124 204 124 204 182z" fill="#7f8467"/><path d="M110 160a46 34 0 0 1 30-26" stroke="#a5a58d" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M20 248H280" stroke="#3d3229" stroke-width="3"/>${Array.from({ length: 9 }, (_, i) => `<path d="M${34 + i * 30} 240l8 16M${42 + i * 30} 240l-8 16" stroke="#3d3229" stroke-width="3"/>`).join('')}`),
};
