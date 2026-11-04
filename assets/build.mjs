// Generates the README's SVGs (header + project cards, dark and light). Run: node assets/build.mjs
import { writeFileSync } from "node:fs";

const themes = {
  dark: { bg: "#0d1117", fg: "#e6edf3", muted: "#8b949e", border: "#30363d", accent: "#58a6ff", grid: "#161b22", major: "#1c2330", chip: "#161b22", code: "#11161d" },
  light: { bg: "#ffffff", fg: "#1f2328", muted: "#59636e", border: "#d1d9e0", accent: "#0969da", grid: "#f0f3f6", major: "#e3e8ee", chip: "#f6f8fa", code: "#f6f8fa" },
};
const SANS = `-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif`;
const MONO = `ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,monospace`;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function header(t) {
  const W = 1200, H = 360;
  // isometric L-bracket, same geometry as the old header, shifted right/down
  const P = (pts) => pts.map(([x, y]) => `${(x + 70).toFixed(1)},${(y + 32).toFixed(1)}`).join(" ");
  const L = ([x1, y1, x2, y2]) => `<line x1="${x1 + 70}" y1="${y1 + 32}" x2="${x2 + 70}" y2="${y2 + 32}"/>`;
  const edges = [[1020.6,219.6,1020.6,173.2],[1020.6,173.2,945.2,129.7],[945.2,129.7,945.2,48.5],[945.2,48.5,900,22.4],[940.2,266,1020.6,219.6],[940.2,219.6,1020.6,173.2],[864.8,176.1,945.2,129.7],[864.8,94.9,945.2,48.5],[819.6,68.8,900,22.4]];
  const hidden = [[819.6,196.4,900,150],[900,150,1020.6,219.6],[900,150,900,22.4]];
  const front = [[819.6,196.4],[940.2,266],[940.2,219.6],[864.8,176.1],[864.8,94.9],[819.6,68.8]];
  const ticks = [];
  for (let i = 1; i <= 6; i++) {
    const x = (W / 6) * i - W / 12;
    ticks.push(`<text x="${x}" y="11" text-anchor="middle">${i}</text><text x="${x}" y="${H - 3}" text-anchor="middle">${i}</text>`);
    if (i < 6) ticks.push(`<line x1="${(W / 6) * i}" y1="0" x2="${(W / 6) * i}" y2="14"/><line x1="${(W / 6) * i}" y1="${H - 14}" x2="${(W / 6) * i}" y2="${H}"/>`);
  }
  ["A", "B", "C"].forEach((c, i) => {
    const y = (H / 3) * i + H / 6 + 4;
    ticks.push(`<text x="7" y="${y}" text-anchor="middle">${c}</text><text x="${W - 7}" y="${y}" text-anchor="middle">${c}</text>`);
    if (i < 2) ticks.push(`<line x1="0" y1="${(H / 3) * (i + 1)}" x2="14" y2="${(H / 3) * (i + 1)}"/><line x1="${W - 14}" y1="${(H / 3) * (i + 1)}" x2="${W}" y2="${(H / 3) * (i + 1)}"/>`);
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Muhammad Abdul Moiz, CAD developer working in C++">
<defs>
<pattern id="g" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="${t.grid}" stroke-width="1"/></pattern>
<pattern id="G" width="120" height="120" patternUnits="userSpaceOnUse"><path d="M120 0H0V120" fill="none" stroke="${t.major}" stroke-width="1"/></pattern>
<linearGradient id="f" x1="0" x2="1"><stop offset="0" stop-color="${t.bg}"/><stop offset="0.45" stop-color="${t.bg}" stop-opacity="0.9"/><stop offset="0.75" stop-color="${t.bg}" stop-opacity="0"/></linearGradient>
<clipPath id="c"><rect width="${W}" height="${H}" rx="14"/></clipPath>
</defs>
<g clip-path="url(#c)">
<rect width="${W}" height="${H}" fill="${t.bg}"/>
<rect x="14" y="14" width="${W - 28}" height="${H - 28}" fill="url(#g)"/>
<rect x="14" y="14" width="${W - 28}" height="${H - 28}" fill="url(#G)"/>
<rect width="${W}" height="${H}" fill="url(#f)"/>
<g stroke="${t.border}" stroke-width="1" font-family="${MONO}" font-size="10" fill="${t.muted}">${ticks.join("")}</g>
<rect x="14.5" y="14.5" width="${W - 29}" height="${H - 29}" fill="none" stroke="${t.border}"/>

<polygon points="${P(front)}" fill="${t.accent}" fill-opacity="0.12"/>
<g fill="none" stroke-linecap="round" stroke-linejoin="round">
<g stroke="${t.accent}" stroke-width="1.3" stroke-dasharray="4 6" opacity="0.55">${hidden.map(L).join("")}</g>
<g stroke="${t.accent}" stroke-width="2">${edges.map(L).join("")}</g>
<polygon points="${P(front)}" stroke="${t.accent}" stroke-width="2.5"/>
<ellipse cx="${942.7 + 70}" cy="${174.7 + 32}" rx="22.7" ry="13.1" stroke="${t.accent}" stroke-width="2"/>
<g stroke="${t.muted}" stroke-width="1" opacity="0.7">${[[916.7,174.7,968.7,174.7],[942.7,160.7,942.7,188.7]].map(L).join("")}</g>
<g stroke="${t.muted}" stroke-width="1.2">${[[792,212.4,912.6,282],[813.6,199.9,784.5,216.7],[934.2,269.5,905,286.3]].map(L).join("")}</g>
</g>
<text transform="translate(${852.3 + 70},${253.2 + 32}) rotate(30)" text-anchor="middle" dy="18" font-family="${MONO}" font-size="13" fill="${t.muted}">240.00</text>
<text x="${W - 34}" y="${H - 30}" text-anchor="end" font-family="${MONO}" font-size="11" fill="${t.muted}" letter-spacing="1">SHEET 01 · SCALE 1:1 · REV 26</text>

<text x="72" y="98" font-family="${MONO}" font-size="15" fill="${t.accent}" letter-spacing="1">// CAD DEVELOPER · C++</text>
<text x="70" y="164" font-family="${SANS}" font-size="58" font-weight="700" fill="${t.fg}" letter-spacing="-1.5">Muhammad Abdul Moiz</text>
<text x="72" y="208" font-family="${SANS}" font-size="23" fill="${t.muted}">I build CAD software in C++, and open-source tools on the side.</text>
<rect x="72" y="240" width="452" height="46" rx="8" fill="${t.code}" stroke="${t.border}"/>
<text x="92" y="269" font-family="${MONO}" font-size="17" fill="${t.fg}"><tspan fill="${t.accent}">Body</tspan> part = <tspan fill="${t.accent}">Extrude</tspan>(sketch, <tspan fill="${t.muted}">24.0_mm</tspan>);</text>
</g>
<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="14" fill="none" stroke="${t.border}"/>
</svg>
`;
}

const projects = [
  { id: "samaat", kicker: "SIDE PROJECT", title: "Samaat", sub: "samaat.io",
    desc: ["One Windows app for Bluetooth earbuds from any brand.", "Per-bud battery, noise control, EQ and shared audio."],
    tags: ["C#", ".NET", "Avalonia"] },
  { id: "openmouse", kicker: "CONTRIBUTOR", title: "OpenMouse", sub: "openmouse.app",
    desc: ["Browser control panel for gaming mice over WebHID.", "Working on drivers, the protocol package and Bridge."],
    tags: ["TypeScript", "WebHID", "Node.js"] },
  { id: "projectmx", kicker: "CONTRIBUTOR", title: "ProjectMX", sub: "Windows + Android",
    desc: ["Native Windows project catalog with an Android", "companion to browse, commit and push from a phone."],
    tags: ["Python", "Android", "Git"] },
  { id: "aidoku", kicker: "CONTRIBUTOR", title: "Aidoku", sub: "community sources",
    desc: ["Manga sources for Aidoku, the open-source iOS", "reader. Writing and fixing sources in Rust."],
    tags: ["Rust", "WebAssembly"] },
];

function card(p, t) {
  const W = 600, H = 196;
  let x = 32;
  const chips = p.tags.map((tag) => {
    const w = tag.length * 8.4 + 24;
    const s = `<rect x="${x}" y="148" width="${w}" height="28" rx="6" fill="${t.chip}" stroke="${t.border}"/><text x="${x + w / 2}" y="167" text-anchor="middle">${esc(tag)}</text>`;
    x += w + 8;
    return s;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${p.title}: ${esc(p.desc.join(" "))}">
<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="12" fill="${t.bg}" stroke="${t.border}"/>
<g stroke="${t.border}" stroke-width="1"><path d="M${W - 44} 28h20M${W - 34} 18v20"/><circle cx="${W - 34}" cy="28" r="5" fill="none"/></g>
<circle cx="37" cy="36" r="4" fill="${t.accent}"/>
<text x="50" y="41" font-family="${MONO}" font-size="13" fill="${t.accent}" letter-spacing="1.2">${p.kicker}</text>
<text x="32" y="84" font-family="${SANS}" font-size="32" font-weight="700" fill="${t.fg}" letter-spacing="-0.5">${p.title}<tspan dx="14" font-family="${MONO}" font-size="14" font-weight="400" fill="${t.muted}" letter-spacing="0">${esc(p.sub)}</tspan></text>
<text font-family="${SANS}" font-size="17" fill="${t.muted}"><tspan x="32" y="110">${esc(p.desc[0])}</tspan><tspan x="32" y="130">${esc(p.desc[1])}</tspan></text>
<g font-family="${MONO}" font-size="14" fill="${t.fg}">${chips}</g>
</svg>
`;
}

const dir = new URL(".", import.meta.url);
for (const [name, t] of Object.entries(themes)) {
  writeFileSync(new URL(`header-${name}.svg`, dir), header(t));
  for (const p of projects) writeFileSync(new URL(`card-${p.id}-${name}.svg`, dir), card(p, t));
}
