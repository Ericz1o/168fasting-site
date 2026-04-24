// TabBar.jsx — 底部导航
function TabBar({ current, onChange }) {
  const tabs = [
    { k: 'calendar', l: '日 历', sym: '历' },
    { k: 'home', l: '今 日', sym: '今' },
    { k: 'ach', l: '成 就', sym: '印' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      height: 76, zIndex: 20,
      background: `linear-gradient(to top, ${TOKENS.paper} 70%, transparent)`,
      paddingBottom: 20,
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      borderTop: `0.5px solid ${TOKENS.lineFaint}`,
    }}>
      {tabs.map(t => {
        const active = current === t.k;
        return (
          <button key={t.k} onClick={() => onChange(t.k)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 4, padding: 8,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: active ? TOKENS.greenMist : 'transparent',
              border: active ? `0.5px solid ${TOKENS.green}` : `0.5px solid ${TOKENS.line}`,
              fontFamily: FONTS.serif, fontSize: 12,
              color: active ? TOKENS.greenDeep : TOKENS.inkFaint,
            }}>{t.sym}</div>
            <div style={{
              fontFamily: FONTS.serif, fontSize: 10,
              color: active ? TOKENS.ink : TOKENS.inkFaint,
              letterSpacing: 2,
            }}>{t.l}</div>
          </button>
        );
      })}
    </div>
  );
}

window.TabBar = TabBar;
