// Weight 3 to 5: strategy and long games.
import { card, cover, die, gem, sparkle } from './frame.mjs';

const star = (x, y, r, fill) => {
  const points = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const k = i % 2 ? r * 0.42 : r;
    return `${(x + k * Math.cos(a)).toFixed(1)},${(y + k * Math.sin(a)).toFixed(1)}`;
  });
  return `<polygon points="${points.join(' ')}" fill="${fill}"/>`;
};

const crown = (x, y, s, fill, band) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-40 20V-22L-20 0L0-32L20 0L40-22V20z" fill="${fill}"/><rect x="-40" y="12" width="80" height="12" rx="3" fill="${band}"/></g>`;

const snow = (points, fill = '#fffdf7') => points.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`).join('');

export default {
  // Weight 3
  'splendor-duel': cover({ from: '#7b2cbf', to: '#10002b', light: '#ffd166', glowY: 160 }, `
    ${crown(150, 70, 0.9, '#ffd166', '#e09f3e')}
    <rect x="70" y="104" width="160" height="160" rx="16" fill="#3c096c"/>
    ${Array.from({ length: 25 }, (_, i) => { const c = ['#2d6a4f', '#e63946', '#3a86ff', '#f8f9fa', '#3d2c2e', '#ffd166'][(i * 7) % 6]; return `<circle cx="${92 + (i % 5) * 29}" cy="${126 + Math.floor(i / 5) * 29}" r="11" fill="${c}"/>`; }).join('')}`),

  'la-tripulacion': cover({ from: '#03045e', to: '#000814', light: '#90e0ef', glowY: 120 }, `
    ${snow([[40, 60, 2], [90, 40, 1.5], [260, 150, 2], [30, 170, 1.5], [200, 40, 1.5], [130, 200, 1.5]])}
    <circle cx="222" cy="86" r="34" fill="#f4a261"/><ellipse cx="222" cy="86" rx="58" ry="12" fill="none" stroke="#ffd166" stroke-width="5" transform="rotate(-20 222 86)"/>
    <g transform="rotate(30 130 140)"><path d="M130 66C152 88 156 132 148 170H112C104 132 108 88 130 66z" fill="#e9ecef"/><circle cx="130" cy="116" r="12" fill="#48cae4" stroke="#6c757d" stroke-width="4"/>
      <path d="M112 146L94 178H112zM148 146L166 178H148z" fill="#e63946"/><path d="M118 170h24l-12 30z" fill="#ffb703"/></g>
    ${[[96, 250, -18, '#e63946'], [130, 242, -6, '#3a86ff'], [164, 242, 6, '#52b788'], [198, 250, 18, '#ffd166']].map(([x, y, r, c]) => card(x, y, 46, 64, r, '#fffdf7', `<circle r="12" fill="${c}"/>`)).join('')}`),

  codex: cover({ from: '#432818', to: '#1a0f08', light: '#ffba08', glowY: 150 }, `
    <path d="M150 128C120 112 80 110 50 118V238C80 230 120 232 150 248z" fill="#f1e3c6"/><path d="M150 128C180 112 220 110 250 118V238C220 230 180 232 150 248z" fill="#e6d3ae"/>
    <path d="M150 128V248" stroke="#bb9457" stroke-width="3"/>
    <g stroke="#9c6644" stroke-width="3" fill="none" stroke-linecap="round">${[146, 168, 190, 212].map(y => `<path d="M70 ${y}h22M100 ${y}l8-8 8 8M124 ${y}h12"/><path d="M168 ${y}h14M188 ${y}v-8h10M206 ${y}h24"/>`).join('')}</g>
    <path d="M150 112c-18-24 6-38 0-64c22 24 22 46 0 64z" fill="#ffba08"/><path d="M150 108c-8-12 2-20 0-32c10 12 10 22 0 32z" fill="#fff3b0"/>
    ${sparkle(96, 84, 12, '#ffba08')}${sparkle(208, 72, 14, '#ffba08')}`),

  'reinos-de-papel': cover({ from: '#f5ebe0', to: '#d5bdaf', light: '#ffffff' }, `
    <path d="M90 240V150L120 120L150 150V240z" fill="#e5989b"/><path d="M120 120L150 150H120z" fill="#b5838d"/>
    <path d="M150 240V110L180 74L210 110V240z" fill="#6d6875"/><path d="M180 74L210 110H180z" fill="#4a4e69"/>
    <path d="M60 240V180L80 160L100 180V240zM200 240V170L224 146L248 170V240z" fill="#b5838d"/><path d="M224 146L248 170H224z" fill="#6d6875"/>
    <path d="M168 240v-30a12 12 0 0 1 24 0v30z" fill="#f5ebe0"/><path d="M180 74v-24l18 8-18 8" fill="#e63946"/>
    <path d="M40 240H262" stroke="#6d6875" stroke-width="4" stroke-linecap="round"/>
    <path d="M60 110l40-30 30 26-26 6z" fill="#fffdf7"/><path d="M100 80l4 32-26-6z" fill="#e9e3dc"/>`),

  'red-outpost': cover({ from: '#d00000', to: '#370617', light: '#ffba08', glowY: 120 }, `
    <path d="M0 230C80 200 220 200 300 226V400H0z" fill="#9d0208"/>
    <path d="M70 224a56 50 0 0 1 112 0z" fill="#ffccd5" opacity="0.85"/><path d="M90 224V196h18v28M140 224V188h20v36" fill="#6a040f"/>
    ${star(126, 172, 16, '#ffba08')}
    <path d="M224 90C238 104 242 140 238 200H210C206 140 210 104 224 90z" fill="#e9ecef"/><circle cx="224" cy="130" r="9" fill="#ffba08"/><path d="M210 180l-12 24h12zM238 180l12 24h-12z" fill="#6a040f"/>
    <path d="M200 206h48" stroke="#370617" stroke-width="6"/>${snow([[50, 60, 2], [100, 90, 1.5], [160, 50, 2], [270, 60, 1.5]], '#ffd6a5')}`),

  'orquesta-negra': cover({ from: '#343a40', to: '#0b090a', light: '#e5383b', glowY: 150 }, `
    <path d="M60 80l130 150" stroke="#f8f9fa" stroke-width="5" stroke-linecap="round"/><circle cx="190" cy="230" r="6" fill="#f8f9fa"/>
    <rect x="70" y="140" width="160" height="104" rx="10" fill="#5c3d2e"/><path d="M126 140v-14a8 8 0 0 1 8-8h32a8 8 0 0 1 8 8v14" stroke="#3b2418" stroke-width="8" fill="none"/>
    <rect x="70" y="176" width="160" height="10" fill="#3b2418"/><rect x="104" y="172" width="16" height="18" rx="3" fill="#d4a373"/><rect x="180" y="172" width="16" height="18" rx="3" fill="#d4a373"/>
    <circle cx="150" cy="104" r="34" fill="#f8f9fa"/><circle cx="150" cy="104" r="28" fill="#fffdf7" stroke="#212529" stroke-width="3"/><path d="M150 84v20l14 8" stroke="#e5383b" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M128 70l-8-8M172 70l8-8" stroke="#f8f9fa" stroke-width="5" stroke-linecap="round"/>`),

  dominion: cover({ from: '#023e8a', to: '#03045e', light: '#ffd166', glowY: 130 }, `
    ${[[-14, 112], [0, 150], [14, 188]].map(([r, x]) => card(x, 176, 80, 112, r, '#fffdf7', `<rect x="-32" y="-46" width="64" height="44" rx="4" fill="${r === 0 ? '#8ecae6' : '#e9d8a6'}"/><rect x="-26" y="12" width="52" height="6" rx="3" fill="#ced4da"/><rect x="-20" y="24" width="40" height="6" rx="3" fill="#ced4da"/>`)).join('')}
    ${crown(150, 88, 1.3, '#ffd166', '#e09f3e')}
    ${[[62, 246], [88, 256], [238, 248]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="13" fill="#ffd166" stroke="#e09f3e" stroke-width="3"/>`).join('')}`),

  'dominion-terramar': cover({ from: '#48cae4', to: '#023e8a', light: '#ffffff', glowY: 120 }, `
    <path d="M150 56V206" stroke="#7f5539" stroke-width="6"/><path d="M156 64C206 90 214 150 156 180z" fill="#fffdf7"/><path d="M144 84C108 110 104 160 144 180z" fill="#f1faee"/>
    ${crown(150, 46, 0.45, '#ffd166', '#e09f3e')}
    <path d="M70 196H234L212 238H96z" fill="#9c6644"/><path d="M80 210H226" stroke="#7f5539" stroke-width="4"/>${[110, 140, 170, 200].map(x => `<circle cx="${x}" cy="222" r="5" fill="#ffd166"/>`).join('')}
    ${[230, 252].map((y, i) => `<path d="M${-10 + i * 20} ${y}q20-12 40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0" stroke="#caf0f8" stroke-width="5" fill="none" stroke-linecap="round" opacity="${0.9 - i * 0.3}"/>`).join('')}`),

  brink: cover({ from: '#ffb703', to: '#9d0208', light: '#fff3b0', glowY: 150 }, `
    <circle cx="200" cy="150" r="54" fill="#fff3b0" opacity="0.9"/>
    <path d="M0 220H170L178 236L166 250L180 270L170 400H0z" fill="#370617"/>
    <path d="M150 220v-36M150 196l-10 12M150 196l10 12M150 220l-8 16M150 220l8 16" stroke="#370617" stroke-width="6" stroke-linecap="round"/><circle cx="150" cy="176" r="9" fill="#370617"/>
    ${[[60, 70], [86, 60], [112, 72]].map(([x, y]) => `<path d="M${x} ${y}q8-8 16 0q8-8 16 0" stroke="#370617" stroke-width="3" fill="none"/>`).join('')}`),

  'welcome-new-las-vegas': cover({ from: '#3a0ca3', to: '#10002b', light: '#f72585', glowY: 140 }, `
    <path d="M20 270V180h30v-30h24v30h20V130h36v140M170 270V150h30v-24h24v24h20v120" fill="#240046"/>
    ${[[34, 196], [104, 150], [104, 180], [184, 170], [228, 170], [228, 200]].map(([x, y]) => `<rect x="${x}" y="${y}" width="8" height="8" fill="#ffd166"/>`).join('')}
    <g fill="none" stroke-linejoin="round"><polygon points="150,50 162,84 198,84 169,104 180,138 150,118 120,138 131,104 102,84 138,84" stroke="#f72585" stroke-width="12" opacity="0.35"/><polygon points="150,50 162,84 198,84 169,104 180,138 150,118 120,138 131,104 102,84 138,84" stroke="#ff99c8" stroke-width="4"/></g>
    ${die(118, 206, 42, -14, 6)}${die(178, 214, 42, 12, 5)}
    ${[[56, 80], [246, 70], [250, 120]].map(([x, y]) => sparkle(x, y, 12, '#4cc9f0')).join('')}`),

  '7-wonders': cover({ from: '#f6bd60', to: '#bc6c25', light: '#ffffff', glowY: 110 }, `
    <circle cx="226" cy="76" r="26" fill="#fff3b0"/>
    <path d="M20 250L84 150L148 250z" fill="#e9c46a"/><path d="M84 150L104 250H148z" fill="#d4a373"/>
    <path d="M150 250L158 112H178L186 250z" fill="#f1faee"/><rect x="152" y="96" width="32" height="18" fill="#e9c46a"/><path d="M168 66l14 30h-28z" fill="#e76f51"/><circle cx="168" cy="104" r="5" fill="#ffd166"/>
    <path d="M196 250V196h80v54z" fill="#f1faee"/><path d="M190 198L236 172L282 198z" fill="#e9c46a"/>${[204, 222, 240, 258].map(x => `<rect x="${x}" y="204" width="8" height="46" fill="#e9dccb"/>`).join('')}
    <path d="M0 250H300" stroke="#9c6644" stroke-width="4"/>`),

  'disney-villainous': cover({ from: '#2d6a4f', to: '#081c15', light: '#b7e4c7', glowY: 150 }, `
    ${[[60, 220], [100, 240], [210, 236], [250, 214]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${18 + (x % 7)}" fill="#52b788" opacity="0.35"/>`).join('')}
    <path d="M150 112c-50-24-92 20-80 70c10 46 44 66 80 50c36 16 70-4 80-50c12-50-30-94-80-70z" fill="#c1121f"/><path d="M104 140c4-14 16-22 28-22" stroke="#ff8fa3" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M150 112c0-20 6-32 18-42" stroke="#432818" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M160 84c20-20 46-12 52-2c-18 8-34 10-52 2z" fill="#52b788"/>
    <path d="M150 176c10 12 0 24 8 34c6 8 0 18-6 14c-4-4 2-10-4-16c-8-10 2-20 2-32z" fill="#70e000"/>
    <circle cx="136" cy="168" r="7" fill="#70e000"/>${sparkle(64, 92, 14, '#b7e4c7')}${sparkle(238, 120, 10, '#b7e4c7')}`),

  'mansiones-locura': cover({ from: '#344e41', to: '#0b0f0b', light: '#a3b18a', glowY: 120 }, `
    <circle cx="232" cy="62" r="24" fill="#e9edc9"/><circle cx="242" cy="56" r="20" fill="#344e41" opacity="0.6"/>
    <path d="M60 230V130L104 96L148 130V112L196 76L244 112V230z" fill="#1b1f1c"/><path d="M180 82V60h12v14" fill="#1b1f1c"/>
    ${[[78, 150], [114, 150], [78, 186], [168, 128], [208, 128], [168, 168], [208, 168]].map(([x, y], i) => `<rect x="${x}" y="${y}" width="16" height="22" rx="2" fill="${i % 3 ? '#ffd166' : '#3a5a40'}"/>`).join('')}
    <path d="M136 230v-28a12 12 0 0 1 24 0v28z" fill="#3a5a40"/>
    <path d="M20 280C30 230 70 240 60 200C54 180 70 170 76 186" stroke="#6a994e" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M280 290C266 240 236 250 246 210C252 190 236 182 230 196" stroke="#6a994e" stroke-width="10" fill="none" stroke-linecap="round"/>`),

  'gloomhaven-fauces': cover({ from: '#bc6c25', to: '#370617', light: '#ffd166' }, `
    ${Array.from({ length: 16 }, (_, i) => { const a = (i * Math.PI) / 8; const p = (r, da = 0) => `${(150 + r * Math.cos(a + da)).toFixed(1)} ${(150 + r * Math.sin(a + da)).toFixed(1)}`; return `<path d="M${p(50, -0.22)}L${p(96)}L${p(50, 0.22)}z" fill="${i % 2 ? '#9c4221' : '#e76f51'}"/>`; }).join('')}
    <circle cx="150" cy="150" r="60" fill="#e9a03b"/><path d="M118 132l20 6M182 132l-20 6" stroke="#370617" stroke-width="6" stroke-linecap="round"/>
    <path d="M136 162h28l-14 14z" fill="#370617"/><path d="M150 176v12M150 188q-14 10-24 0M150 188q14 10 24 0" stroke="#370617" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M128 196l6 12 6-10M160 198l6 10 6-12" fill="#fffdf7"/>`),

  'dead-of-winter': cover({ from: '#a8dadc', to: '#1d3557', light: '#ffffff', glowY: 120 }, `
    <path d="M0 220C80 200 220 204 300 222V400H0z" fill="#f1faee"/>
    <path d="M98 196V150L150 116L202 150V196z" fill="#6f4518"/><path d="M90 152L150 108L210 152" stroke="#f1faee" stroke-width="10" fill="none" stroke-linecap="round"/><rect x="138" y="164" width="24" height="32" fill="#3d2309"/><rect x="110" y="160" width="18" height="16" fill="#ffd166"/>
    ${Array.from({ length: 9 }, (_, i) => `<path d="M${24 + i * 30} 222V184l6-8 6 8V222" fill="#9c6644"/>`).join('')}<path d="M20 196H290M20 210H290" stroke="#7f5539" stroke-width="4"/>
    <path d="M216 270v-26l-6-12m6 12l-2-16m2 16l6-14m-6 14l10-8" stroke="#6a994e" stroke-width="7" stroke-linecap="round" fill="none"/>
    ${snow([[40, 60, 3], [80, 100, 2], [130, 50, 2.5], [250, 70, 3], [210, 110, 2], [270, 150, 2.5], [30, 140, 2]])}`),

  'this-war-of-mine': cover({ from: '#adb5bd', to: '#343a40', light: '#ffd166', glowY: 170 }, `
    <path d="M60 270V100L90 86L96 110L130 92V60L180 74L176 120L210 104L240 130V270z" fill="#212529"/>
    ${[[80, 130], [80, 170], [150, 110], [194, 150], [150, 210], [214, 210]].map(([x, y]) => `<rect x="${x}" y="${y}" width="18" height="22" fill="#495057"/>`).join('')}
    <rect x="150" y="160" width="18" height="22" fill="#ffd166"/><path d="M168 160l12 10" stroke="#212529" stroke-width="3"/>
    <path d="M110 230l30-10 10 20-24 14z" fill="#343a40"/>
    <path d="M200 70c-6-20 10-26 4-46M214 74c-4-14 8-20 4-34" stroke="#6c757d" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.7"/>
    ${snow([[40, 60, 2], [70, 90, 1.5], [260, 60, 2], [250, 150, 1.5], [30, 200, 2], [270, 230, 1.5]], '#dee2e6')}`),

  // Weight 4
  'telon-de-acero': cover({ from: '#c1121f', to: '#1d3557', light: '#ffffff', glowY: 150 }, `
    <rect x="124" y="50" width="52" height="220" fill="#6c757d"/>${[132, 144, 156, 168].map(x => `<rect x="${x}" y="50" width="4" height="220" fill="#495057"/>`).join('')}<rect x="118" y="44" width="64" height="12" rx="4" fill="#495057"/>
    ${card(70, 160, 70, 98, -10, '#fffdf7', `<rect x="-26" y="-38" width="10" height="10" fill="#c1121f"/><rect x="-26" y="-24" width="10" height="10" fill="#c1121f"/><rect x="-10" y="-38" width="10" height="10" fill="#1d3557"/>`)}
    ${card(230, 160, 70, 98, 10, '#fffdf7', `<rect x="-26" y="-38" width="10" height="10" fill="#1d3557"/><rect x="-10" y="-38" width="10" height="10" fill="#1d3557"/><rect x="-26" y="-24" width="10" height="10" fill="#c1121f"/>`)}
    ${star(70, 168, 20, '#c1121f')}${star(230, 168, 20, '#1d3557')}`),

  'puerto-rico': cover({ from: '#48cae4', to: '#0077b6', light: '#ffffff', glowY: 110 }, `
    <path d="M30 270C40 200 50 140 60 110" stroke="#7f5539" stroke-width="9" fill="none" stroke-linecap="round"/>
    ${[[-150, 40], [-110, 44], [-60, 42], [-20, 40], [20, 36]].map(([a, l]) => `<path d="M60 110l${(l * Math.cos((a * Math.PI) / 180)).toFixed(1)} ${(l * Math.sin((a * Math.PI) / 180) + 14).toFixed(1)}" stroke="#40916c" stroke-width="12" stroke-linecap="round"/>`).join('')}
    <path d="M176 60V196" stroke="#6f4518" stroke-width="6"/><path d="M182 70C222 86 226 136 182 156z" fill="#fffdf7"/><path d="M170 80C140 98 136 140 170 154z" fill="#f1faee"/><path d="M176 60l22 8-22 8" fill="#e63946"/>
    <path d="M110 190H250L230 232H128z" fill="#9c6644"/>
    ${[[96, 250, '#6f4518'], [130, 256, '#f1faee'], [222, 254, '#bc6c25']].map(([x, y, c]) => `<rect x="${x - 14}" y="${y - 16}" width="28" height="32" rx="8" fill="${c}"/><path d="M${x - 14} ${y - 6}h28M${x - 14} ${y + 6}h28" stroke="#3d2c2e" stroke-width="2"/>`).join('')}
    <path d="M100 236q20-10 40 0t40 0t40 0t40 0" stroke="#caf0f8" stroke-width="4" fill="none" stroke-linecap="round"/>`),

  'batalla-rokugan': cover({ from: '#9d0208', to: '#1a0000', light: '#ffba08', glowY: 130 }, `
    <circle cx="150" cy="132" r="76" fill="#e85d04" opacity="0.55"/>
    <g stroke-linecap="round"><path d="M60 250L240 80" stroke="#dee2e6" stroke-width="7"/><path d="M60 250L90 222" stroke="#1d1d1f" stroke-width="11"/><path d="M240 250L60 80" stroke="#dee2e6" stroke-width="7"/><path d="M240 250L210 222" stroke="#1d1d1f" stroke-width="11"/></g>
    <path d="M96 170C96 120 204 120 204 170z" fill="#1d1d1f"/><path d="M80 170H220L230 196L196 186L150 200L104 186L70 196z" fill="#370617"/>
    <path d="M150 128C130 100 112 86 92 82C116 100 128 116 140 136zM150 128C170 100 188 86 208 82C184 100 172 116 160 136z" fill="#ffba08"/><circle cx="150" cy="138" r="9" fill="#ffba08"/>`),

  'castillos-borgona': cover({ from: '#a7c957', to: '#283618', light: '#ffe8a3', glowY: 120 }, `
    <path d="M0 210C70 170 160 176 300 200V400H0z" fill="#606c38"/>
    <rect x="96" y="120" width="108" height="80" fill="#e9dccb"/>${[96, 118, 140, 162, 184].map(x => `<rect x="${x}" y="110" width="12" height="12" fill="#e9dccb"/>`).join('')}
    <rect x="80" y="92" width="34" height="108" fill="#f5ebe0"/><path d="M74 94L97 56L120 94z" fill="#3a86ff"/><rect x="186" y="92" width="34" height="108" fill="#f5ebe0"/><path d="M180 94L203 56L226 94z" fill="#3a86ff"/>
    <path d="M97 56V36l16 6-16 6M203 56V36l16 6-16 6" fill="#e63946"/><path d="M138 200v-28a12 12 0 0 1 24 0v28z" fill="#6f4518"/><rect x="90" y="120" width="12" height="16" rx="6" fill="#6f4518"/><rect x="198" y="120" width="12" height="16" rx="6" fill="#6f4518"/>
    ${die(108, 246, 44, -12, 4)}${die(190, 250, 44, 14, 6)}`),

  'arkham-horror-lcg': cover({ from: '#1b4332', to: '#081c15', light: '#95d5b2', glowY: 120 }, `
    <path d="M150 40c40 0 72 24 82 44c-10 20-42 44-82 44s-72-24-82-44c10-20 42-44 82-44z" fill="#d8f3dc" opacity="0.9"/><circle cx="150" cy="84" r="26" fill="#2d6a4f"/><ellipse cx="150" cy="84" rx="6" ry="20" fill="#081c15"/>
    ${[[70, 300, 40, 180], [230, 300, 260, 180], [110, 320, 90, 210]].map(([x1, y1, x2, y2]) => `<path d="M${x1} ${y1}C${x1 - 20} ${y1 - 60} ${x2 + 30} ${y2 + 40} ${x2} ${y2}" stroke="#2d6a4f" stroke-width="12" fill="none" stroke-linecap="round"/>`).join('')}
    <circle cx="150" cy="200" r="40" fill="#ffd166" opacity="0.25"/><rect x="132" y="150" width="36" height="10" rx="3" fill="#6c757d"/><path d="M134 160h32l6 58h-44z" fill="#495057"/><path d="M140 166h20l4 46h-28z" fill="#ffd166"/><rect x="128" y="218" width="44" height="10" rx="3" fill="#6c757d"/><path d="M140 150a10 10 0 0 1 20 0" stroke="#6c757d" stroke-width="4" fill="none"/>`),

  // Weight 5
  agricola: cover({ from: '#bde0fe', to: '#90be6d', light: '#ffffff', glowY: 110 }, `
    <path d="M0 196C100 180 200 182 300 194V400H0z" fill="#6a994e"/>
    <rect x="70" y="120" width="110" height="78" fill="#bc6c25"/><path d="M60 124L125 72L190 124z" fill="#e9c46a"/><path d="M76 116L125 78L174 116" stroke="#d4a373" stroke-width="3" fill="none"/>
    <rect x="114" y="160" width="22" height="38" fill="#6f4518"/><rect x="84" y="136" width="20" height="18" fill="#fff3b0"/><rect x="148" y="136" width="20" height="18" fill="#fff3b0"/>
    <path d="M20 232H280M20 248H280" stroke="#f1e3c6" stroke-width="5"/>${[30, 80, 130, 180, 230, 270].map(x => `<rect x="${x}" y="222" width="7" height="34" fill="#f1e3c6"/>`).join('')}
    <g transform="translate(222 176)"><ellipse rx="26" ry="18" fill="#fffdf7"/>${[-16, -4, 8].map(x => `<circle cx="${x}" cy="-10" r="10" fill="#fffdf7"/>`).join('')}<circle cx="24" cy="-6" r="10" fill="#3d2c2e"/><path d="M-14 16v10M10 16v10" stroke="#3d2c2e" stroke-width="5"/></g>
    ${[36, 52].map(x => `<path d="M${x} 196V140" stroke="#e9c46a" stroke-width="3"/><ellipse cx="${x}" cy="136" rx="5" ry="12" fill="#e9c46a"/>`).join('')}`),

  diplomacy: cover({ from: '#e9d8a6', to: '#bb9457', light: '#ffffff' }, `
    <rect x="44" y="60" width="212" height="196" rx="10" fill="#f5ebe0"/>
    <path d="M60 80H140L150 140L100 170L60 150z" fill="#a8dadc"/><path d="M140 80H236V130L180 150L150 140z" fill="#f4a261"/><path d="M60 150L100 170L120 240H60z" fill="#e5989b"/><path d="M100 170L150 140L180 150L200 240H120z" fill="#b5e48c"/><path d="M180 150L236 130V240H200z" fill="#cdb4db"/>
    <path d="M60 80H236V240H60z" fill="none" stroke="#6f4518" stroke-width="3"/>
    ${[[96, 120, '#3d5a80'], [190, 110, '#e63946'], [150, 200, '#2a9d8f']].map(([x, y, c]) => `<rect x="${x - 9}" y="${y - 9}" width="18" height="18" rx="3" fill="${c}"/>`).join('')}
    <g transform="rotate(-40 200 210)"><path d="M200 140l8 14v62h-16v-62z" fill="#dee2e6"/><rect x="182" y="214" width="36" height="8" rx="4" fill="#9c6644"/><rect x="195" y="222" width="10" height="26" fill="#3d2c2e"/></g>
    <rect x="70" y="214" width="62" height="40" rx="3" fill="#fffdf7" transform="rotate(-8 100 234)"/><circle cx="102" cy="236" r="10" fill="#c1121f"/>`),

  scythe: cover({ from: '#f6bd60', to: '#84a59d', light: '#ffffff', glowY: 110 }, `
    <path d="M0 220C100 200 200 206 300 214V400H0z" fill="#a98467"/>${[230, 246, 262].map(y => `<path d="M0 ${y}C100 ${y - 18} 200 ${y - 12} 300 ${y - 6}" stroke="#e9c46a" stroke-width="3" fill="none"/>`).join('')}
    <path d="M140 150L110 224M170 150L210 224M110 224h-14M210 224h14" stroke="#495057" stroke-width="10" stroke-linecap="round"/><circle cx="124" cy="188" r="7" fill="#343a40"/><circle cx="190" cy="188" r="7" fill="#343a40"/>
    <rect x="110" y="96" width="94" height="62" rx="12" fill="#6c757d"/><rect x="128" y="108" width="34" height="22" rx="5" fill="#ffd166"/><rect x="180" y="66" width="12" height="32" fill="#495057"/>
    <path d="M186 60c-8-14 8-18 2-32" stroke="#dee2e6" stroke-width="7" fill="none" stroke-linecap="round" opacity="0.7"/><path d="M110 120H78l-10 12" stroke="#495057" stroke-width="8" stroke-linecap="round" fill="none"/>
    <path d="M60 224v-30M60 200l-10 12M60 200l14-14" stroke="#3d2c2e" stroke-width="5" stroke-linecap="round"/><circle cx="60" cy="186" r="7" fill="#3d2c2e"/><path d="M74 186l14-30q14 6 10 22" stroke="#3d2c2e" stroke-width="3" fill="none"/>`),

  'scythe-fenris': cover({ from: '#caf0f8', to: '#023e8a', light: '#ffffff', glowY: 110 }, `
    <circle cx="96" cy="84" r="34" fill="#fffdf7" opacity="0.9"/>
    <path d="M150 250L156 190L140 150L148 110L170 74L178 94L190 84L192 116L210 140L230 150L214 160L200 156L196 186L206 250z" fill="#14213d"/>
    <path d="M0 250C100 230 200 236 300 244V400H0z" fill="#e9f5fb"/>
    <path d="M60 250L44 200M80 250L96 200" stroke="#495057" stroke-width="7" stroke-linecap="round"/><rect x="36" y="172" width="70" height="34" rx="8" fill="#6c757d"/><rect x="48" y="180" width="20" height="14" rx="3" fill="#90e0ef"/>
    ${snow([[30, 40, 2.5], [150, 50, 2], [250, 70, 3], [270, 130, 2], [40, 140, 2], [240, 200, 2.5], [120, 160, 1.5]])}`),
};
