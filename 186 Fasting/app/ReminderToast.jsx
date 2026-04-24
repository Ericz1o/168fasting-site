// ReminderToast.jsx — 顶部提醒条
function ReminderToast({ state, onDismiss }) {
  if (!['warn1','warn2','warn3','closed'].includes(state)) return null;

  const msg = {
    warn1: { title: '一时之后，窗将合', body: '可以开始收尾，不必急。' },
    warn2: { title: '还有半个时辰', body: '吃得慢些也是好的。' },
    warn3: { title: '一刻钟', body: '放下碗筷的时刻正在靠近。' },
    closed:{ title: '窗，已合', body: '明日见 · 坚持即是功课。' },
  }[state];

  return (
    <div style={{
      position: 'absolute', top: 44, left: 16, right: 16,
      zIndex: 30,
      background: `linear-gradient(135deg, ${TOKENS.paperLight}, ${TOKENS.paperDeep})`,
      border: `0.5px solid ${TOKENS.line}`,
      boxShadow: '0 8px 24px rgba(60,50,35,0.12)',
      padding: '14px 16px',
      display: 'flex', gap: 12, alignItems: 'center',
      animation: 'slideDown 0.5s ease',
    }}>
      <div style={{
        width: 6, height: 36,
        background: state === 'closed' ? TOKENS.inkSoft
                  : state === 'warn3' ? TOKENS.rust
                  : state === 'warn2' ? TOKENS.clay
                  : TOKENS.greenSoft,
      }} />
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: FONTS.serif, fontSize: 13,
          color: TOKENS.ink, letterSpacing: 2, marginBottom: 2,
        }}>{msg.title}</div>
        <div style={{
          fontFamily: FONTS.serif, fontSize: 11,
          color: TOKENS.inkSoft, letterSpacing: 1,
        }}>{msg.body}</div>
      </div>
      <button onClick={onDismiss} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        fontFamily: FONTS.serif, fontSize: 11,
        color: TOKENS.inkFaint, letterSpacing: 3,
        padding: '4px 2px',
      }}>知 道</button>
    </div>
  );
}

window.ReminderToast = ReminderToast;
