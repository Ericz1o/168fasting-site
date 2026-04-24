function AchievementScreen() {
  const achievements = [
    { sym: 'I',   title: 'First Light',     desc: 'Begin your first fast',         done: true,  date: 'MAR  03' },
    { sym: 'VII', title: 'Seven-day vow',   desc: 'Seven consecutive days',        done: true,  date: 'APR  02' },
    { sym: '½',   title: 'Half Moon',       desc: 'Fifteen consecutive days',      done: true,  date: 'TODAY' },
    { sym: '○',   title: 'A Full Moon',     desc: 'Thirty consecutive days',       done: false, progress: 0.5 },
    { sym: 'C',   title: 'Hundred Days',    desc: 'One hundred days, total',       done: false, progress: 0.23 },
    { sym: '∞',   title: 'A Turning Year',  desc: 'A full revolution of seasons',  done: false, progress: 0.06 },
  ];

  return (
    <div style={{
      height: '100%',
      background: `radial-gradient(ellipse at 80% 0%, ${TOKENS.paperLight}, transparent 60%), ${TOKENS.paper}`,
      overflow: 'auto',
      padding: '64px 0 40px',
    }}>
      <div style={{ padding: '0 28px 20px' }}>
        <div style={{
          fontFamily: FONTS.sans, fontSize: 10,
          color: TOKENS.inkFaint, letterSpacing: 4, marginBottom: 8, fontWeight: 600,
        }}>STEP  BY  STEP,  RECORDED</div>
        <div style={{
          fontFamily: FONTS.serif, fontSize: 36,
          color: TOKENS.ink, letterSpacing: 1, fontStyle: 'italic', fontWeight: 400,
        }}>Milestones</div>
      </div>

      <div style={{
        margin: '0 24px 28px',
        padding: '24px 20px',
        background: `linear-gradient(135deg, ${TOKENS.paperLight}, ${TOKENS.paperDeep})`,
        border: `0.5px solid ${TOKENS.line}`,
        display: 'flex', gap: 20, alignItems: 'center',
      }}>
        <div style={{
          width: 68, height: 68, flexShrink: 0,
          background: TOKENS.rust, color: TOKENS.paperLight,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: FONTS.serif, fontSize: 30, fontStyle: 'italic', fontWeight: 500,
          boxShadow: 'inset 0 0 0 2px rgba(245,239,227,0.4), inset 2px 2px 6px rgba(0,0,0,0.15)',
          transform: 'rotate(-2deg)',
        }}>½</div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: FONTS.sans, fontSize: 9,
            color: TOKENS.inkFaint, letterSpacing: 3, marginBottom: 6, fontWeight: 600,
          }}>EARNED  TODAY</div>
          <div style={{
            fontFamily: FONTS.serif, fontSize: 24, fontStyle: 'italic',
            color: TOKENS.ink, letterSpacing: 0.5, marginBottom: 4, fontWeight: 500,
          }}>Half Moon</div>
          <div style={{
            fontFamily: FONTS.sans, fontSize: 12,
            color: TOKENS.inkSoft, lineHeight: 1.5,
          }}>15 days in a row · a calm mind is home.</div>
        </div>
      </div>

      <div style={{ padding: '0 24px' }}>
        <div style={{
          fontFamily: FONTS.sans, fontSize: 9,
          color: TOKENS.inkFaint, letterSpacing: 4,
          marginBottom: 12, paddingLeft: 2, fontWeight: 600,
        }}>LEDGER  OF  PRACTICE</div>

        {achievements.map((a, i) => (
          <div key={i} style={{
            display: 'flex', gap: 14, alignItems: 'center',
            padding: '14px 0',
            borderBottom: i < achievements.length - 1 ? `0.5px solid ${TOKENS.lineFaint}` : 'none',
            opacity: a.done ? 1 : 0.75,
          }}>
            <div style={{
              width: 42, height: 42, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FONTS.serif, fontSize: 16, fontStyle: 'italic',
              background: a.done ? TOKENS.rust : 'transparent',
              color: a.done ? TOKENS.paperLight : TOKENS.inkFaint,
              border: a.done ? 'none' : `0.5px dashed ${TOKENS.line}`,
              boxShadow: a.done ? 'inset 0 0 0 1.5px rgba(245,239,227,0.35)' : 'none',
              transform: a.done ? `rotate(${-2 + i}deg)` : 'none',
            }}>{a.sym}</div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: FONTS.serif, fontSize: 17, fontStyle: 'italic',
                color: TOKENS.ink, letterSpacing: 0.3, marginBottom: 3, fontWeight: 500,
              }}>{a.title}</div>
              <div style={{
                fontFamily: FONTS.sans, fontSize: 11,
                color: TOKENS.inkSoft, letterSpacing: 0.2,
              }}>{a.desc}</div>
              {!a.done && (
                <div style={{
                  marginTop: 8, height: 1, background: TOKENS.lineFaint,
                  position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute', top: 0, left: 0, height: 1,
                    width: `${a.progress * 100}%`, background: TOKENS.greenSoft,
                  }} />
                </div>
              )}
            </div>
            {a.done && (
              <div style={{
                fontFamily: FONTS.sans, fontSize: 9,
                color: TOKENS.inkFaint, letterSpacing: 2, fontWeight: 600,
              }}>{a.date}</div>
            )}
            {!a.done && (
              <div style={{
                fontFamily: FONTS.serif, fontSize: 14, fontStyle: 'italic',
                color: TOKENS.inkFaint, letterSpacing: 0,
                fontVariantNumeric: 'tabular-nums',
              }}>{Math.round(a.progress * 100)}%</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

window.AchievementScreen = AchievementScreen;
