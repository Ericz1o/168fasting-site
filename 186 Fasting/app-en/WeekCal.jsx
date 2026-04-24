// Week calendar strip — 数字 + 当日断食完成度小圆环
function WeekCal({ data, today = 2 }) {
  // data: [{day: '一', date: 14, pct: 0.8, isToday: false}]
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between',
      padding: '0 6px',
    }}>
      {data.map((d, i) => {
        const r = 16;
        const c = 2 * Math.PI * r;
        const color = d.isToday ? TOKENS.green : (d.pct >= 1 ? TOKENS.greenSoft : TOKENS.line);
        return (
          <div key={i} style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 8,
            opacity: d.future ? 0.4 : 1,
          }}>
            <div style={{
              fontFamily: FONTS.serif, fontSize: 11,
              color: d.isToday ? TOKENS.green : TOKENS.inkFaint,
              letterSpacing: 2,
            }}>{d.day}</div>
            <div style={{ position: 'relative', width: 38, height: 38 }}>
              <svg width="38" height="38">
                <circle cx="19" cy="19" r={r} fill="none"
                        stroke={d.isToday ? TOKENS.paperLight : TOKENS.lineFaint}
                        strokeWidth="1"/>
                {d.pct > 0 && (
                  <circle cx="19" cy="19" r={r} fill="none"
                          stroke={color}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeDasharray={c}
                          strokeDashoffset={c * (1 - d.pct)}
                          transform="rotate(-90 19 19)"/>
                )}
                {d.isToday && (
                  <circle cx="19" cy="19" r={r + 3} fill="none"
                          stroke={TOKENS.green} strokeWidth="0.5"
                          strokeDasharray="1 2" opacity="0.5"/>
                )}
              </svg>
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: FONTS.serif,
                fontSize: 15,
                fontWeight: d.isToday ? 500 : 400,
                color: d.isToday ? TOKENS.ink : TOKENS.inkSoft,
              }}>{d.date}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

window.WeekCal = WeekCal;
