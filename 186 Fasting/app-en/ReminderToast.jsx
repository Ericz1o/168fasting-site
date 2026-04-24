function ReminderToast({ state, onDismiss }) {
  if (!['warn1','warn2','warn3','closed'].includes(state)) return null;

  const msg = {
    warn1: { title: 'In one hour, the window will close', body: 'Begin to wind down. No need to rush.' },
    warn2: { title: 'Half an hour remaining',             body: 'Eating slowly is also good.' },
    warn3: { title: 'Fifteen minutes',                    body: 'The moment to set down chopsticks draws near.' },
    closed:{ title: 'The window has closed',              body: 'See you tomorrow · persistence is the practice.' },
  }[state];

  return (
    <div style={{
      position: 'absolute', top: 44, left: 16, right: 16, zIndex: 30,
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
          fontFamily: FONTS.serif, fontSize: 15, fontStyle: 'italic',
          color: TOKENS.ink, letterSpacing: 0.3, marginBottom: 2, fontWeight: 500,
        }}>{msg.title}</div>
        <div style={{
          fontFamily: FONTS.sans, fontSize: 11,
          color: TOKENS.inkSoft, letterSpacing: 0.2,
        }}>{msg.body}</div>
      </div>
      <button onClick={onDismiss} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        fontFamily: FONTS.sans, fontSize: 9,
        color: TOKENS.inkFaint, letterSpacing: 2, fontWeight: 600,
        padding: '4px 2px',
      }}>NOTED</button>
    </div>
  );
}

window.ReminderToast = ReminderToast;
