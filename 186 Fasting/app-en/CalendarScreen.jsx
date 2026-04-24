function CalendarScreen({ monthData }) {
  return (
    <div style={{
      height: '100%',
      background: `radial-gradient(ellipse at 50% 0%, ${TOKENS.paperLight}, transparent 60%), ${TOKENS.paper}`,
      overflow: 'auto',
      padding: '64px 0 40px',
    }}>
      <div style={{ padding: '0 28px 24px' }}>
        <div style={{
          fontFamily: FONTS.sans, fontSize: 10,
          color: TOKENS.inkFaint, letterSpacing: 4, marginBottom: 8, fontWeight: 600,
        }}>YEAR  OF  THE  HORSE</div>
        <div style={{
          fontFamily: FONTS.serif, fontSize: 36,
          color: TOKENS.ink, letterSpacing: 1, fontStyle: 'italic', fontWeight: 400,
          display: 'flex', alignItems: 'baseline', gap: 12,
        }}>
          April
          <span style={{ fontFamily: FONTS.sans, fontStyle: 'normal', fontSize: 11, color: TOKENS.inkFaint, letterSpacing: 3, fontWeight: 500 }}>2026</span>
        </div>
      </div>

      <div style={{
        margin: '0 24px 28px',
        padding: '18px 20px',
        background: TOKENS.paperLight,
        border: `0.5px solid ${TOKENS.lineFaint}`,
        display: 'flex', justifyContent: 'space-between',
      }}>
        {[
          { n: '15', l: 'STREAK' },
          { n: '23', l: 'THIS  MONTH' },
          { n: '89%', l: 'COMPLETION' },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center', flex: 1,
            borderLeft: i > 0 ? `0.5px solid ${TOKENS.lineFaint}` : 'none',
          }}>
            <div style={{
              fontFamily: FONTS.serif, fontSize: 28, fontStyle: 'italic',
              color: TOKENS.green, letterSpacing: 0,
              fontVariantNumeric: 'tabular-nums', fontWeight: 500,
            }}>{s.n}</div>
            <div style={{
              fontFamily: FONTS.sans, fontSize: 9,
              color: TOKENS.inkFaint, letterSpacing: 2,
              marginTop: 4, fontWeight: 600,
            }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
        padding: '0 20px', marginBottom: 12,
      }}>
        {['S','M','T','W','T','F','S'].map((d, i) => (
          <div key={i} style={{
            fontFamily: FONTS.sans, fontSize: 10,
            color: TOKENS.inkFaint, letterSpacing: 2,
            textAlign: 'center', fontWeight: 600,
          }}>{d}</div>
        ))}
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
        padding: '0 20px', gap: 4,
      }}>
        {monthData.map((d, i) => {
          if (!d) return <div key={i} />;
          const r = 14;
          const c = 2 * Math.PI * r;
          const color = d.isToday ? TOKENS.green : d.pct >= 1 ? TOKENS.greenSoft : d.pct > 0 ? TOKENS.clay : TOKENS.lineFaint;
          return (
            <div key={i} style={{
              aspectRatio: '1',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: d.future ? 0.35 : 1,
            }}>
              <div style={{ position: 'relative', width: 36, height: 36 }}>
                <svg width="36" height="36">
                  <circle cx="18" cy="18" r={r} fill={d.isToday ? TOKENS.greenMist : 'none'}
                          stroke={TOKENS.lineFaint} strokeWidth="0.5" opacity={d.pct === 0 ? 0.4 : 1}/>
                  {d.pct > 0 && (
                    <circle cx="18" cy="18" r={r} fill="none"
                            stroke={color} strokeWidth="1.5" strokeLinecap="round"
                            strokeDasharray={c} strokeDashoffset={c * (1 - d.pct)}
                            transform="rotate(-90 18 18)"/>
                  )}
                </svg>
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: FONTS.serif, fontSize: 14,
                  fontWeight: d.isToday ? 500 : 400,
                  color: d.isToday ? TOKENS.greenDeep : d.pct > 0 ? TOKENS.ink : TOKENS.inkFaint,
                }}>{d.date}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        margin: '32px 28px 0', paddingTop: 20,
        borderTop: `0.5px solid ${TOKENS.lineFaint}`,
        display: 'flex', gap: 18, flexWrap: 'wrap',
        fontFamily: FONTS.sans, fontSize: 9,
        color: TOKENS.inkSoft, letterSpacing: 2, fontWeight: 600,
      }}>
        {[
          { c: TOKENS.green, l: 'TODAY' },
          { c: TOKENS.greenSoft, l: 'COMPLETE' },
          { c: TOKENS.clay, l: 'PARTIAL' },
          { c: TOKENS.lineFaint, l: 'UPCOMING' },
        ].map((l, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%',
              border: `1px solid ${l.c}`, background: 'transparent' }} />
            {l.l}
          </div>
        ))}
      </div>
    </div>
  );
}

window.CalendarScreen = CalendarScreen;
