// HomeScreen.jsx — English wabi-sabi
const { useState, useEffect } = React;

const ZEN_QUOTES = [
  'A bowl of rice, a cup of tea — neither is small.',
  'Stillness within, coolness without.',
  'Knowing where to stop is the beginning of peace.',
  'Empty room, white light.',
  'A flower not fully open, a moon not yet full.',
  'Eat with rhythm. Live with rhythm.',
];

const TIPS_ZEN = [
  { icon: '茶', title: 'A cup of warm water', body: 'Better than a thousand words. Let the stomach rest, too.' },
  { icon: '月', title: 'The unfinished moon', body: 'Half-bloomed flowers and half-full moons are the best part.' },
  { icon: '石', title: 'Unmoved', body: 'Hunger is a cloud. It comes, and it also goes.' },
];
const TIPS_DIARY = [
  { icon: '记', title: 'Today', body: 'Two extra cups of milk tea today… oops.' },
  { icon: '记', title: 'Yesterday', body: 'Fasted 16h 32m. Felt light.' },
  { icon: '记', title: 'This week', body: 'Six days in a row. Appetite quieter now.' },
];
const TIPS_SMART = {
  idle:   { icon: '始', title: 'Ready',           body: 'Choose a quiet moment. Begin your first meal.' },
  eating: { icon: '食', title: 'Eating',          body: 'Chew slowly. Notice warmth, salt, sweetness.' },
  warn1:  { icon: '钟', title: 'One hour left',   body: 'Begin to wind down. Sip warm water.' },
  warn2:  { icon: '钟', title: 'Half an hour',    body: 'One last dish. Slowness is also a kindness.' },
  warn3:  { icon: '钟', title: 'Fifteen minutes', body: 'The moment to set down chopsticks is near.' },
  fasting:{ icon: '空', title: 'Fasting',         body: 'This emptiness is the body tending to itself.' },
  closed: { icon: '静', title: 'Window closed',   body: "Today's practice is complete. Until tomorrow." },
};

function HomeScreen({ state, setState, mins, totalMins, weekData }) {
  const [tipMode, setTipMode] = useState('zen');
  const [tipIdx, setTipIdx] = useState(0);
  const [zenIdx] = useState(() => Math.floor(Math.random() * ZEN_QUOTES.length));

  const fmt = (m) => {
    const total = Math.max(0, m) * 60;
    const h = Math.floor(total / 3600);
    const mm = Math.floor((total % 3600) / 60);
    const ss = Math.floor(total % 60);
    return `${h}:${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')}`;
  };

  const progress = state === 'idle' ? 0
                 : state === 'closed' ? 1
                 : (1 - mins / totalMins);

  const ringProps = (() => {
    if (state === 'idle') {
      return {
        progress: 0, state: 'idle',
        subText: 'NOT  YET  BEGUN',
        mainText: '— —',
        footText: 'Press to open\nyour eight-hour window.',
      };
    }
    if (state === 'closed') {
      return {
        progress: 1, state: 'closed',
        subText: 'WINDOW  ·  CLOSED',
        mainText: 'See you tomorrow',
        footText: 'Persistence is a promise to oneself.',
      };
    }
    if (state === 'fasting') {
      return {
        progress, state: 'fasting', pulse: true,
        subText: 'FASTING',
        mainText: fmt(mins),
        footText: 'Eight hours until the next meal.',
      };
    }
    const sub = state === 'warn1' ? 'ONE  HOUR  REMAINING'
              : state === 'warn2' ? 'HALF  HOUR  REMAINING'
              : state === 'warn3' ? 'FIFTEEN  MINUTES'
              : 'EATING  WINDOW';
    return {
      progress, state, pulse: state !== 'eating',
      subText: sub,
      mainText: fmt(mins),
      footText: ZEN_QUOTES[zenIdx],
    };
  })();

  const tipList = tipMode === 'zen' ? TIPS_ZEN : tipMode === 'diary' ? TIPS_DIARY : null;
  const tip = tipMode === 'smart' ? TIPS_SMART[state] : tipList[tipIdx % tipList.length];

  return (
    <div style={{
      height: '100%',
      background: `
        radial-gradient(ellipse at 20% 10%, ${TOKENS.paperLight} 0%, transparent 50%),
        radial-gradient(ellipse at 80% 90%, ${TOKENS.paperDeep} 0%, transparent 55%),
        ${TOKENS.paper}
      `,
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='3'/><feColorMatrix values='0 0 0 0 0.4  0 0 0 0 0.3  0 0 0 0 0.15  0 0 0 0.06 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>")`,
        opacity: 0.5, pointerEvents: 'none', mixBlendMode: 'multiply',
      }} />

      {/* Header */}
      <div style={{
        padding: '64px 28px 0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        position: 'relative', zIndex: 2,
      }}>
        <div>
          <div style={{
            fontFamily: FONTS.sans, fontSize: 10,
            color: TOKENS.inkFaint, letterSpacing: 4,
            marginBottom: 6, fontWeight: 500,
          }}>16  ·  8  PROTOCOL</div>
          <div style={{
            fontFamily: FONTS.serif, fontSize: 28,
            color: TOKENS.ink, letterSpacing: 1,
            fontStyle: 'italic', fontWeight: 400,
          }}>April,  late spring</div>
        </div>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
          fontFamily: FONTS.sans, fontSize: 9, color: TOKENS.inkFaint,
          letterSpacing: 2, lineHeight: 1.8, fontWeight: 500,
        }}>
          <div>GRAIN  RAIN</div>
          <div style={{ opacity: 0.7 }}>DAY  15</div>
        </div>
      </div>

      {/* Week strip */}
      <div style={{ padding: '24px 16px 0', position: 'relative', zIndex: 2 }}>
        <WeekCal data={weekData} />
      </div>

      <div style={{
        margin: '28px 40px 0',
        height: 0.5, background: TOKENS.line, opacity: 0.6,
        position: 'relative', zIndex: 2,
      }} />

      {/* Ring */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '20px 0', position: 'relative', zIndex: 2,
      }}>
        <Ring size={280} {...ringProps} />

        {state === 'idle' && (
          <button
            onClick={() => setState('eating')}
            style={{
              marginTop: 24, background: 'none', border: 'none',
              fontFamily: FONTS.sans, fontSize: 11,
              color: TOKENS.green, letterSpacing: 6, fontWeight: 500,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 14,
            }}
          >
            <span style={{ width: 28, height: 0.5, background: TOKENS.green }} />
            BEGIN  FIRST  MEAL
            <span style={{ width: 28, height: 0.5, background: TOKENS.green }} />
          </button>
        )}
        {state === 'closed' && (
          <div style={{
            marginTop: 24,
            fontFamily: FONTS.serif, fontSize: 14, fontStyle: 'italic',
            color: TOKENS.inkFaint, letterSpacing: 2,
          }}>may tomorrow keep its promise</div>
        )}
      </div>

      {/* Tips */}
      <div style={{ margin: '0 24px 20px', position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'flex', gap: 14, alignItems: 'center',
          marginBottom: 10, paddingLeft: 4,
        }}>
          <div style={{
            fontFamily: FONTS.sans, fontSize: 9,
            color: TOKENS.inkFaint, letterSpacing: 4, fontWeight: 600,
          }}>GLEANINGS</div>
          <div style={{ flex: 1, height: 0.5, background: TOKENS.lineFaint }} />
          <div style={{ display: 'flex', gap: 4 }}>
            {[
              { k: 'zen', l: 'Z' },
              { k: 'diary', l: 'D' },
              { k: 'smart', l: 'S' },
            ].map(t => (
              <button key={t.k} onClick={() => setTipMode(t.k)} style={{
                width: 22, height: 22, borderRadius: '50%',
                border: tipMode === t.k ? `0.5px solid ${TOKENS.green}` : `0.5px solid ${TOKENS.line}`,
                background: tipMode === t.k ? TOKENS.greenMist : 'transparent',
                color: tipMode === t.k ? TOKENS.greenDeep : TOKENS.inkFaint,
                fontFamily: FONTS.serif, fontSize: 11, fontStyle: 'italic',
                cursor: 'pointer', padding: 0,
              }}>{t.l}</button>
            ))}
          </div>
        </div>
        <div
          onClick={() => tipMode !== 'smart' && setTipIdx(i => i + 1)}
          style={{
            display: 'flex', gap: 14, alignItems: 'flex-start',
            padding: '14px 16px',
            background: `linear-gradient(135deg, ${TOKENS.paperLight}, transparent)`,
            border: `0.5px solid ${TOKENS.lineFaint}`,
            borderRadius: 2,
            cursor: tipMode !== 'smart' ? 'pointer' : 'default',
          }}
        >
          <div style={{
            width: 34, height: 34, flexShrink: 0,
            borderRadius: '50%',
            background: TOKENS.paperDeep,
            border: `0.5px solid ${TOKENS.line}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: '"Noto Serif SC", serif', fontSize: 14,
            color: TOKENS.green,
          }}>{tip.icon}</div>
          <div style={{ flex: 1, paddingTop: 2 }}>
            <div style={{
              fontFamily: FONTS.serif, fontSize: 16, fontStyle: 'italic',
              color: TOKENS.ink, letterSpacing: 0.3,
              marginBottom: 4, fontWeight: 500,
            }}>{tip.title}</div>
            <div style={{
              fontFamily: FONTS.sans, fontSize: 12,
              color: TOKENS.inkSoft, lineHeight: 1.6,
            }}>{tip.body}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.HomeScreen = HomeScreen;
