// Ring.jsx — 环形计时器，支持脉动
const { useMemo } = React;

function Ring({
  size = 280,
  progress = 0,      // 0..1
  state = 'idle',    // idle | eating | warn1 | warn2 | warn3 | fasting | closed
  mainText,
  subText,
  footText,
  pulse = false,
}) {
  const stroke = 1.5;
  const r = size / 2 - 20;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;

  // Color by state
  const trackColor = TOKENS.line;
  let progColor = TOKENS.green;
  if (state === 'warn1') progColor = TOKENS.greenSoft;
  if (state === 'warn2') progColor = TOKENS.clay;
  if (state === 'warn3') progColor = TOKENS.rust;
  if (state === 'fasting') progColor = TOKENS.greenDeep;
  if (state === 'closed') progColor = TOKENS.inkFaint;

  // Pulse speed by state
  const pulseDur = state === 'warn3' ? '1.2s' : state === 'warn2' ? '1.8s' : state === 'warn1' ? '2.6s' : '4s';
  const pulseColor = state === 'warn3' ? 'rgba(139,90,60,0.35)'
                    : state === 'warn2' ? 'rgba(176,136,104,0.3)'
                    : state === 'warn1' ? 'rgba(135,155,110,0.3)'
                    : 'rgba(85,107,68,0.18)';

  // Moon marker at progress position
  const angle = progress * 2 * Math.PI - Math.PI / 2;
  const mx = cx + r * Math.cos(angle);
  const my = cy + r * Math.sin(angle);

  const startAngle = -Math.PI / 2;
  const sx = cx + r * Math.cos(startAngle);
  const sy = cy + r * Math.sin(startAngle);

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {/* Pulsating halo */}
      {pulse && (
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          animation: `ringPulse ${pulseDur} ease-in-out infinite`,
          background: `radial-gradient(circle, ${pulseColor} 30%, transparent 65%)`,
          pointerEvents: 'none',
        }} />
      )}
      {/* Inner subtle wash */}
      <div style={{
        position: 'absolute', inset: 18,
        borderRadius: '50%',
        background: `radial-gradient(circle at 35% 30%, ${TOKENS.paperLight}, ${TOKENS.paper} 70%)`,
      }} />

      <svg width={size} height={size} style={{ position: 'relative', display: 'block' }}>
        {/* Outer faint ring (decorative, ink well) */}
        <circle cx={cx} cy={cy} r={r + 8} fill="none" stroke={TOKENS.lineFaint} strokeWidth="0.5" strokeDasharray="1 3" opacity="0.6"/>
        {/* Track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
        {/* Progress */}
        {progress > 0 && (
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={progColor}
            strokeWidth={stroke + 0.5}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - progress)}
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.6s ease' }}
          />
        )}
        {/* Start marker — tiny open circle */}
        <circle cx={sx} cy={sy} r="3.5" fill={TOKENS.paper} stroke={TOKENS.green} strokeWidth="1"/>
        {/* Moving marker — filled ink dot */}
        {progress > 0 && progress < 1 && (
          <>
            <circle cx={mx} cy={my} r="5" fill={TOKENS.paper} stroke={progColor} strokeWidth="1.2"/>
            <circle cx={mx} cy={my} r="2" fill={progColor}/>
          </>
        )}
      </svg>

      {/* Center text */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 40, textAlign: 'center',
      }}>
        {subText && (
          <div style={{
            fontFamily: FONTS.serif, fontSize: 12,
            color: TOKENS.inkSoft, letterSpacing: 6,
            marginBottom: 14, paddingLeft: 6,
          }}>{subText}</div>
        )}
        {mainText && (
          <div style={{
            fontFamily: FONTS.serif, fontSize: 38, fontWeight: 400,
            color: TOKENS.ink, letterSpacing: 1,
            fontVariantNumeric: 'tabular-nums',
            lineHeight: 1,
          }}>{mainText}</div>
        )}
        {footText && (
          <div style={{
            fontFamily: FONTS.serif, fontSize: 13,
            color: TOKENS.inkSoft, marginTop: 18,
            letterSpacing: 2, lineHeight: 1.6,
            maxWidth: size - 80,
          }}>{footText}</div>
        )}
      </div>
    </div>
  );
}

window.Ring = Ring;
