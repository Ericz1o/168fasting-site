// HomeScreen.jsx — 主页
const { useState, useEffect } = React;

const ZEN_QUOTES = [
  '一粥一饭，当思来之不易',
  '心静，自然凉',
  '知止而后有定',
  '虚室生白',
  '花未全开月未圆',
  '饮食有节，起居有常',
];

const TIPS_ZEN = [
  { icon: '茶', title: '一杯清茶', body: '温热白水胜过千言，让胃也歇一歇。' },
  { icon: '月', title: '月未圆', body: '花未全开月未圆，是人间最好的时节。' },
  { icon: '石', title: '如如不动', body: '饥饿如云，来了也会走。' },
];
const TIPS_DIARY = [
  { icon: '记', title: '今日手记', body: '今天多喝了 2 杯奶茶⋯⋯ ops。' },
  { icon: '记', title: '昨日', body: '断食 16 小时 32 分，轻盈。' },
  { icon: '记', title: '一周', body: '已连续断食 6 日，胃口变小了。' },
];
const TIPS_SMART = {
  idle:   { icon: '始', title: '准备就绪', body: '选一个安静时刻，开启你今日的第一餐。' },
  eating: { icon: '食', title: '正在进食', body: '细嚼慢咽，感受食物的温度与滋味。' },
  warn1:  { icon: '钟', title: '还有一小时', body: '可以开始收尾了，喝一口温水。' },
  warn2:  { icon: '钟', title: '半小时', body: '最后一道，吃得慢些也是好的。' },
  warn3:  { icon: '钟', title: '一刻钟', body: '放下碗筷的时刻正在靠近。' },
  fasting:{ icon: '空', title: '断食中', body: '此刻的空腹，是身体在自我修整。' },
  closed: { icon: '静', title: '窗口已合', body: '今日功课圆满，明日再见。' },
};

function HomeScreen({ state, setState, mins, totalMins, weekData }) {
  const [tipMode, setTipMode] = useState('zen'); // zen | diary | smart
  const [tipIdx, setTipIdx] = useState(0);
  const [zenIdx] = useState(() => Math.floor(Math.random() * ZEN_QUOTES.length));

  // Format HH:MM:SS from mins (float)
  const fmt = (m) => {
    const total = Math.max(0, m) * 60; // seconds
    const h = Math.floor(total / 3600);
    const mm = Math.floor((total % 3600) / 60);
    const ss = Math.floor(total % 60);
    return `${h}:${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')}`;
  };

  // State content map
  const progress = state === 'idle' ? 0
                 : state === 'closed' ? 1
                 : state === 'fasting' ? (1 - mins / totalMins)
                 : (1 - mins / totalMins); // eating: same formula, totalMins = 480

  const ringProps = (() => {
    if (state === 'idle') {
      return {
        progress: 0,
        state: 'idle',
        subText: '今日未始',
        mainText: '— —',
        footText: '按下即开启\n八小时进食之窗',
      };
    }
    if (state === 'closed') {
      return {
        progress: 1,
        state: 'closed',
        subText: '窗 · 已合',
        mainText: '明日见',
        footText: '坚持，是自己与自己的约。',
      };
    }
    if (state === 'fasting') {
      return {
        progress,
        state: 'fasting',
        pulse: true,
        subText: '断食中',
        mainText: fmt(mins),
        footText: '余八小时至次餐',
      };
    }
    // eating states
    const sub = state === 'warn1' ? '将尽一时'
              : state === 'warn2' ? '将尽半时'
              : state === 'warn3' ? '将尽一刻'
              : '进食之窗';
    return {
      progress,
      state,
      pulse: state !== 'eating',
      subText: sub,
      mainText: fmt(mins),
      footText: ZEN_QUOTES[zenIdx],
    };
  })();

  // Tip content
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
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* paper grain texture overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='3'/><feColorMatrix values='0 0 0 0 0.4  0 0 0 0 0.3  0 0 0 0 0.15  0 0 0 0.06 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>")`,
        opacity: 0.5,
        pointerEvents: 'none',
        mixBlendMode: 'multiply',
      }} />

      {/* Header */}
      <div style={{
        padding: '64px 28px 0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        position: 'relative', zIndex: 2,
      }}>
        <div>
          <div style={{
            fontFamily: FONTS.serif, fontSize: 11,
            color: TOKENS.inkFaint, letterSpacing: 4,
            marginBottom: 4,
          }}>一 六 · 八</div>
          <div style={{
            fontFamily: FONTS.serif, fontSize: 22,
            color: TOKENS.ink, letterSpacing: 2,
          }}>四月 · 暮春</div>
        </div>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
          fontFamily: FONTS.serif, fontSize: 10, color: TOKENS.inkFaint,
          letterSpacing: 2, lineHeight: 1.8,
        }}>
          <div>谷雨</div>
          <div style={{ fontSize: 9, opacity: 0.7 }}>第 十 五 日</div>
        </div>
      </div>

      {/* Week calendar */}
      <div style={{ padding: '24px 16px 0', position: 'relative', zIndex: 2 }}>
        <WeekCal data={weekData} />
      </div>

      {/* Divider */}
      <div style={{
        margin: '28px 40px 0',
        height: 0.5, background: TOKENS.line, opacity: 0.6,
        position: 'relative', zIndex: 2,
      }} />

      {/* Ring */}
      <div style={{
        flex: 1,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '20px 0',
        position: 'relative', zIndex: 2,
      }}>
        <Ring size={280} {...ringProps} />

        {/* Action button for idle state */}
        {state === 'idle' && (
          <button
            onClick={() => setState('eating')}
            style={{
              marginTop: 24,
              background: 'none', border: 'none',
              fontFamily: FONTS.serif, fontSize: 14,
              color: TOKENS.green, letterSpacing: 8,
              paddingLeft: 8, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 10,
            }}
          >
            <span style={{
              width: 28, height: 0.5, background: TOKENS.green,
            }} />
            开 启 第 一 餐
            <span style={{
              width: 28, height: 0.5, background: TOKENS.green,
            }} />
          </button>
        )}
        {state === 'closed' && (
          <div style={{
            marginTop: 24,
            fontFamily: FONTS.serif, fontSize: 12,
            color: TOKENS.inkFaint, letterSpacing: 6,
          }}>愿 明 日 如 约</div>
        )}
      </div>

      {/* Tips card */}
      <div style={{
        margin: '0 24px 20px',
        position: 'relative', zIndex: 2,
      }}>
        <div style={{
          display: 'flex', gap: 14, alignItems: 'center',
          marginBottom: 10, paddingLeft: 4,
        }}>
          <div style={{
            fontFamily: FONTS.serif, fontSize: 11,
            color: TOKENS.inkFaint, letterSpacing: 4,
          }}>拾 遗</div>
          <div style={{ flex: 1, height: 0.5, background: TOKENS.lineFaint }} />
          <div style={{ display: 'flex', gap: 4 }}>
            {[
              { k: 'zen', l: '禅' },
              { k: 'diary', l: '记' },
              { k: 'smart', l: '智' },
            ].map(t => (
              <button key={t.k} onClick={() => setTipMode(t.k)} style={{
                width: 22, height: 22, borderRadius: '50%',
                border: tipMode === t.k ? `0.5px solid ${TOKENS.green}` : `0.5px solid ${TOKENS.line}`,
                background: tipMode === t.k ? TOKENS.greenMist : 'transparent',
                color: tipMode === t.k ? TOKENS.greenDeep : TOKENS.inkFaint,
                fontFamily: FONTS.serif, fontSize: 11,
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
            fontFamily: FONTS.serif, fontSize: 14,
            color: TOKENS.green,
          }}>{tip.icon}</div>
          <div style={{ flex: 1, paddingTop: 2 }}>
            <div style={{
              fontFamily: FONTS.serif, fontSize: 13,
              color: TOKENS.ink, letterSpacing: 2,
              marginBottom: 4,
            }}>{tip.title}</div>
            <div style={{
              fontFamily: FONTS.serif, fontSize: 11,
              color: TOKENS.inkSoft, lineHeight: 1.7,
              letterSpacing: 1,
            }}>{tip.body}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.HomeScreen = HomeScreen;
window.ZEN_QUOTES = ZEN_QUOTES;
