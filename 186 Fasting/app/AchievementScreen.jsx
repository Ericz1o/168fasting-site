// AchievementScreen.jsx — 成就墙
function AchievementScreen() {
  const achievements = [
    { sym: '初', title: '初心', desc: '开启第一次断食', done: true, date: '三月 · 初三' },
    { sym: '七', title: '七日之约', desc: '连续断食七日', done: true, date: '四月 · 初二' },
    { sym: '半', title: '半月', desc: '连续断食十五日', done: true, date: '今日 · 达成' },
    { sym: '月', title: '一轮明月', desc: '连续断食三十日', done: false, progress: 0.5 },
    { sym: '百', title: '百日筑基', desc: '累计断食百日', done: false, progress: 0.23 },
    { sym: '岁', title: '一轮四季', desc: '坚持一整年', done: false, progress: 0.06 },
  ];

  return (
    <div style={{
      height: '100%',
      background: `
        radial-gradient(ellipse at 80% 0%, ${TOKENS.paperLight}, transparent 60%),
        ${TOKENS.paper}
      `,
      overflow: 'auto',
      padding: '64px 0 40px',
    }}>
      <div style={{ padding: '0 28px 20px' }}>
        <div style={{
          fontFamily: FONTS.serif, fontSize: 11,
          color: TOKENS.inkFaint, letterSpacing: 4, marginBottom: 6,
        }}>且 行 且 记</div>
        <div style={{
          fontFamily: FONTS.serif, fontSize: 28,
          color: TOKENS.ink, letterSpacing: 4,
        }}>成 就</div>
      </div>

      {/* Hero — current seal */}
      <div style={{
        margin: '0 24px 28px',
        padding: '24px 20px',
        background: `linear-gradient(135deg, ${TOKENS.paperLight}, ${TOKENS.paperDeep})`,
        border: `0.5px solid ${TOKENS.line}`,
        display: 'flex', gap: 20, alignItems: 'center',
      }}>
        {/* 印章 */}
        <div style={{
          width: 68, height: 68, flexShrink: 0,
          background: TOKENS.rust,
          color: TOKENS.paperLight,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: FONTS.serif, fontSize: 36, fontWeight: 500,
          letterSpacing: 0,
          boxShadow: 'inset 0 0 0 2px rgba(245,239,227,0.4), inset 2px 2px 6px rgba(0,0,0,0.15)',
          transform: 'rotate(-2deg)',
          position: 'relative',
        }}>
          半
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: FONTS.serif, fontSize: 10,
            color: TOKENS.inkFaint, letterSpacing: 3, marginBottom: 4,
          }}>今 日 所 得</div>
          <div style={{
            fontFamily: FONTS.serif, fontSize: 20,
            color: TOKENS.ink, letterSpacing: 3, marginBottom: 2,
          }}>半 月</div>
          <div style={{
            fontFamily: FONTS.serif, fontSize: 11,
            color: TOKENS.inkSoft, letterSpacing: 1, lineHeight: 1.6,
          }}>连续断食 十五 日 · 心安即是归处</div>
        </div>
      </div>

      {/* List */}
      <div style={{ padding: '0 24px' }}>
        <div style={{
          fontFamily: FONTS.serif, fontSize: 11,
          color: TOKENS.inkFaint, letterSpacing: 4,
          marginBottom: 12, paddingLeft: 2,
        }}>功 德 簿</div>

        {achievements.map((a, i) => (
          <div key={i} style={{
            display: 'flex', gap: 14, alignItems: 'center',
            padding: '14px 0',
            borderBottom: i < achievements.length - 1 ? `0.5px solid ${TOKENS.lineFaint}` : 'none',
            opacity: a.done ? 1 : 0.75,
          }}>
            {/* seal */}
            <div style={{
              width: 42, height: 42, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FONTS.serif, fontSize: 18,
              background: a.done ? TOKENS.rust : 'transparent',
              color: a.done ? TOKENS.paperLight : TOKENS.inkFaint,
              border: a.done ? 'none' : `0.5px dashed ${TOKENS.line}`,
              boxShadow: a.done ? 'inset 0 0 0 1.5px rgba(245,239,227,0.35)' : 'none',
              transform: a.done ? `rotate(${-2 + i}deg)` : 'none',
            }}>{a.sym}</div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: FONTS.serif, fontSize: 15,
                color: TOKENS.ink, letterSpacing: 2, marginBottom: 3,
              }}>{a.title}</div>
              <div style={{
                fontFamily: FONTS.serif, fontSize: 11,
                color: TOKENS.inkSoft, letterSpacing: 1,
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
                fontFamily: FONTS.serif, fontSize: 10,
                color: TOKENS.inkFaint, letterSpacing: 2,
                writingMode: 'vertical-rl', textOrientation: 'upright',
                lineHeight: 1.2,
              }}>{a.date}</div>
            )}
            {!a.done && (
              <div style={{
                fontFamily: FONTS.serif, fontSize: 12,
                color: TOKENS.inkFaint, letterSpacing: 1,
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
