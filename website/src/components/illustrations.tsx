// 佔位插畫（純 SVG）。日後換成真實照片時，只要在使用處改成 <img>。

const ALMOND =
  "M0,-95 C26,-95 40,-40 40,25 C40,72 22,95 0,95 C-22,95 -40,72 -40,25 C-40,-40 -26,-95 0,-95Z";
const ROUND =
  "M0,-70 C30,-70 40,-45 40,10 C40,70 22,90 0,90 C-22,90 -40,70 -40,10 C-40,-45 -30,-70 0,-70Z";
const SQUARE = "M-38,-72 L38,-72 C40,-72 40,-70 40,-66 L40,60 C40,82 24,92 0,92 C-24,92 -40,82 -40,60 L-40,-66 C-40,-70 -40,-72 -38,-72Z";

const shapes = { almond: ALMOND, round: ROUND, square: SQUARE } as const;

/** 五瓣小花 */
function Flower({ x, y, r, color, center = "#2a0f22" }: { x: number; y: number; r: number; color: string; center?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse key={deg} cx={0} cy={-r} rx={r * 0.62} ry={r} fill={color} opacity={0.88} transform={`rotate(${deg})`} />
      ))}
      <circle r={r * 0.35} fill={center} />
    </g>
  );
}

function Glitter({ seed, count = 18 }: { seed: number; count?: number }) {
  // 簡單的偽亂數，確保伺服器與瀏覽器輸出一致
  const dots = Array.from({ length: count }, (_, i) => {
    const a = Math.sin(seed * 97 + i * 13.37) * 10000;
    const b = Math.sin(seed * 31 + i * 7.11) * 10000;
    return { x: ((a - Math.floor(a)) - 0.5) * 70, y: ((b - Math.floor(b)) - 0.5) * 180, r: 0.8 + ((a * b) % 1 + 1) % 1 * 1.6 };
  });
  return (
    <g fill="#fff" opacity={0.75}>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x.toFixed(2)} cy={d.y.toFixed(2)} r={d.r.toFixed(2)} />
      ))}
    </g>
  );
}

type NailStyle = "glitter" | "floral" | "french" | "solid";

function Nail({
  id,
  shape = "almond",
  style,
  base,
  accent,
  seed = 1,
}: {
  id: string;
  shape?: keyof typeof shapes;
  style: NailStyle;
  base: string;
  accent: string;
  seed?: number;
}) {
  const d = shapes[shape];
  return (
    <g>
      <defs>
        <clipPath id={`${id}-clip`}>
          <path d={d} />
        </clipPath>
        <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={d} fill={style === "floral" || style === "french" ? "#fbeef3" : base} />
      <g clipPath={`url(#${id}-clip)`}>
        {style === "glitter" && <Glitter seed={seed} />}
        {style === "french" && <path d="M-50,-100 L50,-100 L50,-40 C20,-58 -20,-58 -50,-40Z" fill={base} />}
        {style === "floral" && (
          <>
            <path d="M-30,80 C-10,30 10,0 30,-60" stroke="#2a0f22" strokeWidth={1.6} fill="none" />
            <path d="M-6,20 C4,10 14,12 22,4" stroke="#2a0f22" strokeWidth={1.2} fill="none" />
            <Flower x={8} y={-28} r={14} color={base} />
            <Flower x={-14} y={36} r={11} color={accent} />
            <circle cx={-22} cy={-62} r={3} fill="#fff" />
            <circle cx={-14} cy={-70} r={2.2} fill="#fff" />
          </>
        )}
        <path d={d} fill={`url(#${id}-shine)`} />
      </g>
    </g>
  );
}

/** 首頁 Hero：從下方伸出的五指與指甲彩繪 */
export function HeroNails({ className }: { className?: string }) {
  const fingers = [
    { angle: -36, len: 560, style: "glitter" as const },
    { angle: -17, len: 640, style: "floral" as const },
    { angle: 0, len: 680, style: "glitter" as const },
    { angle: 17, len: 640, style: "floral" as const },
    { angle: 34, len: 560, style: "glitter" as const },
  ];
  return (
    <svg viewBox="0 0 640 640" className={className} role="img" aria-hidden="true">
      <defs>
        <linearGradient id="skin" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e9b79f" />
          <stop offset="0.5" stopColor="#f6d3c2" />
          <stop offset="1" stopColor="#e5ad95" />
        </linearGradient>
      </defs>
      {fingers.map((f, i) => (
        <g key={i} transform={`translate(320 760) rotate(${f.angle}) translate(0 ${-f.len})`}>
          <rect x={-46} y={0} width={92} height={f.len} rx={46} fill="url(#skin)" />
          <g transform="translate(0 66) scale(0.95)">
            <Nail id={`hero-${i}`} style={f.style} base="#8e2a6e" accent="#c25a9a" seed={i + 1} />
          </g>
        </g>
      ))}
    </svg>
  );
}

/** 作品集／服務卡片用的佔位圖 */
export function NailTile({
  id,
  colors,
  shape,
  variant,
  className,
}: {
  id: string;
  colors: [string, string];
  shape: keyof typeof shapes;
  variant: number;
  className?: string;
}) {
  const styles: NailStyle[] = ["solid", "floral", "french", "glitter"];
  const style = styles[variant % styles.length];
  const [base, accent] = colors;
  return (
    <svg viewBox="0 0 300 300" className={className} role="img" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-bg`} cx="0.5" cy="0.4" r="0.75">
          <stop offset="0" stopColor="#fff7fa" />
          <stop offset="1" stopColor="#f7c6d7" />
        </radialGradient>
      </defs>
      <rect width="300" height="300" fill={`url(#${id}-bg)`} />
      {[-1, 0, 1].map((k) => (
        <g key={k} transform={`translate(${150 + k * 78} ${158 + Math.abs(k) * 18}) rotate(${k * 10}) scale(0.82)`}>
          <Nail id={`${id}-${k}`} shape={shape} style={k === 0 ? style : style === "floral" ? "solid" : style} base={base} accent={accent} seed={variant + k + 3} />
        </g>
      ))}
    </svg>
  );
}

/** 背景用的淡色葉片 */
export function LeafDecor({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="currentColor">
      <path d="M100 190 C60 150 40 100 60 40 C80 80 100 100 100 190Z" />
      <path d="M100 190 C140 150 160 100 140 40 C120 80 100 100 100 190Z" opacity="0.7" />
      <path d="M100 190 C70 170 20 160 10 120 C50 120 80 140 100 190Z" opacity="0.5" />
      <path d="M100 190 C130 170 180 160 190 120 C150 120 120 140 100 190Z" opacity="0.4" />
    </svg>
  );
}
