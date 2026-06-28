const Mockups = {

  mockup(kind, big) {
    if (kind === 'dashboard') return big ? Mockups.lifeosBig() : Mockups.lifeosSmall();
    const h = big ? 'clamp(168px,24vw,238px)' : 'clamp(96px,12vw,138px)';
    const sh = big ? '0 22px 48px -22px rgba(27,26,22,0.32)' : '0 8px 20px -12px rgba(27,26,22,0.22)';
    const frame = (inner) => /* html */`
      <div style="border:1px solid rgba(27,26,22,0.1);border-radius:${big ? '12px' : '9px'};overflow:hidden;background:#FBF9F4;height:${h};display:flex;flex-direction:column;box-shadow:${sh};">
        <div style="display:flex;gap:5px;padding:8px 10px;border-bottom:1px solid rgba(27,26,22,0.07);flex:0 0 auto;">
          <span style="width:6px;height:6px;border-radius:50%;background:rgba(27,26,22,0.2);"></span>
          <span style="width:6px;height:6px;border-radius:50%;background:rgba(27,26,22,0.13);"></span>
          <span style="width:6px;height:6px;border-radius:50%;background:rgba(27,26,22,0.1);"></span>
        </div>
        <div style="flex:1;position:relative;overflow:hidden;">${inner}</div>
      </div>`;
    const bar = (w, c) => /* html */`<span style="display:block;height:5px;width:${w};border-radius:3px;background:${c || 'rgba(27,26,22,0.12)'};"></span>`;
    if (kind === 'card') return frame(/* html */`
      <div style="display:flex;height:100%;align-items:center;gap:8px;padding:10px;">
        <div style="flex:1;display:flex;flex-direction:column;gap:6px;">
          ${bar('70%', 'rgba(27,26,22,0.22)')}${bar('90%')}${bar('50%')}
          <span style="display:inline-block;width:46px;height:14px;border-radius:7px;background:#12886A;margin-top:3px;"></span>
        </div>
        <div style="flex:0 0 42%;height:54px;border-radius:8px;background:linear-gradient(135deg,#16302B,#0c1c18);border:1px solid rgba(18,136,106,0.3);padding:8px;display:flex;flex-direction:column;justify-content:space-between;">
          <span style="width:16px;height:11px;border-radius:2px;background:rgba(31,182,140,0.6);"></span>
          <span style="font-family:monospace;font-size:7px;letter-spacing:1px;color:rgba(244,240,232,0.6);">•••• 4291</span>
        </div>
      </div>`);
    if (kind === 'flow') return frame(/* html */`
      <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:space-around;padding:0 8px;">
        <div style="width:24%;height:30px;border-radius:6px;background:rgba(27,26,22,0.05);border:1px solid rgba(27,26,22,0.12);"></div>
        <div style="width:24%;height:30px;border-radius:6px;background:rgba(204,134,54,0.16);border:1px solid rgba(204,134,54,0.45);"></div>
        <div style="width:24%;height:30px;border-radius:6px;background:rgba(27,26,22,0.05);border:1px solid rgba(27,26,22,0.12);"></div>
      </div>
      <svg style="position:absolute;inset:0;width:100%;height:100%;" preserveAspectRatio="none">
        <line x1="33%" y1="50%" x2="42%" y2="50%" stroke="#CC8636" stroke-width="1"></line>
        <line x1="58%" y1="50%" x2="67%" y2="50%" stroke="#CC8636" stroke-width="1"></line>
      </svg>`);
    if (kind === 'code') return frame(/* html */`
      <div style="display:flex;height:100%;">
        <div style="flex:1;border-right:1px solid rgba(27,26,22,0.06);padding:9px;display:flex;flex-direction:column;gap:6px;">
          ${bar('60%')}${bar('80%', 'rgba(18,136,106,0.35)')}${bar('45%')}
        </div>
        <div style="flex:1;padding:9px;display:flex;flex-direction:column;gap:5px;">
          ${bar('40%', 'rgba(18,136,106,0.45)')}${bar('70%', 'rgba(27,26,22,0.18)')}${bar('55%', 'rgba(27,26,22,0.12)')}${bar('65%', 'rgba(18,136,106,0.28)')}
        </div>
      </div>`);
    return frame(/* html */`
      <div style="display:flex;height:100%;align-items:center;justify-content:center;">
        <div style="width:40px;height:76px;border:1px solid rgba(27,26,22,0.16);border-radius:9px;padding:6px 5px;display:flex;flex-direction:column;gap:5px;background:#fff;">
          <span style="width:14px;height:3px;border-radius:2px;background:rgba(27,26,22,0.16);margin:0 auto;"></span>
          ${bar('100%', 'rgba(18,136,106,0.3)')}${bar('80%')}${bar('90%')}${bar('60%')}
        </div>
      </div>`);
  },

  losSidebar(compact) {
    const gap = compact ? 2 : 3;
    const px = compact ? 4 : 5;
    const logoSz = compact ? 10 : 13;
    const dotSz = compact ? 4 : 5;
    const barH = compact ? 3.5 : 4;
    return /* html */`
      <div style="flex:0 0 ${compact ? '24%' : '22%'};background:#F7F6F3;border-right:1px solid #E7E5E4;padding:${compact ? 6 : 8}px ${px}px;display:flex;flex-direction:column;gap:${gap}px;">
        <div style="display:flex;align-items:center;gap:3px;margin-bottom:${compact ? 5 : 7}px;padding:2px 3px;">
          <span style="width:${logoSz}px;height:${logoSz}px;border-radius:${compact ? 3 : 4}px;background:#16A34A;flex:0 0 auto;display:flex;align-items:center;justify-content:center;font-size:${compact ? 5 : 6}px;color:#fff;font-weight:700;font-family:'Bricolage Grotesque';">L</span>
          <span style="height:${barH}px;flex:1;border-radius:2px;background:rgba(28,25,23,0.18);"></span>
        </div>
        <div style="padding:${compact ? 2 : 3}px ${compact ? 3 : 4}px;border-radius:${compact ? 3 : 4}px;background:rgba(22,163,74,0.08);display:flex;align-items:center;gap:3px;">
          <span style="width:${dotSz}px;height:${dotSz}px;border-radius:1px;background:rgba(22,163,74,0.55);flex:0 0 auto;"></span>
          <span style="height:${barH}px;flex:1;border-radius:2px;background:rgba(22,163,74,0.4);"></span>
        </div>
        ${[1, 2, 3, 4, 5].map(() => /* html */`
          <div style="padding:${compact ? 2 : 3}px ${compact ? 3 : 4}px;display:flex;align-items:center;gap:3px;">
            <span style="width:${dotSz}px;height:${dotSz}px;border-radius:1px;background:rgba(28,25,23,0.1);flex:0 0 auto;"></span>
            <span style="height:${barH}px;flex:1;border-radius:2px;background:rgba(28,25,23,0.07);"></span>
          </div>`).join('')}
      </div>`;
  },

  losChrome(extra) {
    return /* html */`
      <div style="display:flex;align-items:center;gap:4px;padding:6px 9px;border-bottom:1px solid #E7E5E4;flex:0 0 auto;background:rgba(255,255,255,0.96);">
        <span style="width:5px;height:5px;border-radius:50%;background:rgba(255,90,90,0.72);"></span>
        <span style="width:5px;height:5px;border-radius:50%;background:rgba(255,190,50,0.72);"></span>
        <span style="width:5px;height:5px;border-radius:50%;background:rgba(50,195,90,0.72);"></span>
        ${extra || '<span style="flex:1;height:9px;background:rgba(28,25,23,0.05);border-radius:3px;margin-left:4px;"></span>'}
      </div>`;
  },

  lifeosSmall() {
    return `<img src="assets/lifeos-collapsed-thumbnail.webp" alt="LifeOS dashboard preview" style="width:100%;height:auto;border-radius:10px;display:block;">`;
  },

  lifeosBig() {
    return `<img src="assets/lifeos-expanded-hero.webp" alt="LifeOS full dashboard" style="width:100%;height:clamp(320px,45vw,560px);object-fit:cover;object-position:top center;border-radius:12px;display:block;">`;
  },

  losScreen(screen) {
    const sidebar = Mockups.losSidebar(false);
    const wrap = (content) => /* html */`
      <div style="display:flex;height:100%;background:#FAFAF9;">
        ${sidebar}
        <div style="flex:1;padding:11px;overflow:hidden;display:flex;flex-direction:column;gap:6px;background:#FAFAF9;">${content}</div>
      </div>`;

    if (screen === 'today') return wrap(/* html */`
      <div>
        <span style="font-size:8px;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.08em;display:block;margin-bottom:4px;">FRIDAY, JUNE 26</span>
        <span style="font-size:13px;font-weight:700;color:#1C1917;letter-spacing:-0.02em;display:block;font-family:'Bricolage Grotesque';line-height:1.1;margin-bottom:8px;">Good afternoon, Midhun.<br><span style="color:#57534E;">Stay grounded.</span></span>
      </div>
      <div style="background:rgba(22,163,74,0.07);border:1px solid rgba(22,163,74,0.2);border-radius:8px;padding:8px 10px;flex:0 0 auto;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;">
          <span style="font-size:7px;font-weight:700;color:#16A34A;font-family:'JetBrains Mono';letter-spacing:0.1em;">FOCUS TODAY</span>
          <span style="font-size:6px;color:#A8A29E;font-family:'JetBrains Mono';">● Not started</span>
        </div>
        <span style="font-size:8px;color:#57534E;font-family:'Hanken Grotesk';display:block;margin-bottom:6px;">No focus blocks scheduled yet.</span>
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:7px;color:#A8A29E;font-family:'JetBrains Mono';">0 of 3 blocks · 0m deep work</span>
          <span style="background:#1C1917;color:#fff;font-size:7px;font-weight:600;padding:4px 9px;border-radius:100px;font-family:'Hanken Grotesk';white-space:nowrap;">⚡ Enter focus</span>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;flex:1;min-height:0;">
        <div style="background:#fff;border:1px solid #E7E5E4;border-radius:8px;padding:7px;">
          <span style="font-size:6.5px;font-weight:700;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.08em;display:block;margin-bottom:5px;">PRIORITIES</span>
          <span style="font-size:7px;color:#A8A29E;font-family:'Hanken Grotesk';display:block;">No tasks yet.</span>
          <div style="display:flex;gap:4px;margin-top:6px;">
            <span style="font-size:7px;color:#16A34A;background:rgba(22,163,74,0.08);padding:3px 7px;border-radius:100px;font-family:'Hanken Grotesk';">Ada's picks</span>
            <span style="font-size:7px;color:#57534E;padding:3px 7px;border-radius:100px;border:1px solid #E7E5E4;font-family:'Hanken Grotesk';">All tasks</span>
          </div>
        </div>
        <div style="background:#fff;border:1px solid #E7E5E4;border-radius:8px;padding:7px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
            <span style="font-size:6.5px;font-weight:700;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.08em;">HOW ARE YOU</span>
            <span style="font-size:6px;color:#A8A29E;font-family:'JetBrains Mono';">1:11 PM</span>
          </div>
          <div style="display:flex;gap:3px;margin-bottom:5px;">${['#1C1917', 'rgba(28,25,23,0.12)', 'rgba(28,25,23,0.15)', 'rgba(28,25,23,0.1)', 'rgba(28,25,23,0.08)'].map(c => `<span style="width:11px;height:11px;border-radius:50%;background:${c};border:1px solid rgba(28,25,23,0.1);display:block;"></span>`).join('')}</div>
          <div style="display:flex;align-items:center;gap:4px;">
            <span style="font-size:7px;color:#57534E;font-family:'Hanken Grotesk';">Energy</span>
            <div style="flex:1;height:3px;background:rgba(28,25,23,0.07);border-radius:2px;position:relative;overflow:hidden;"><span style="position:absolute;left:0;top:0;height:100%;width:70%;background:#16A34A;border-radius:2px;display:block;"></span></div>
            <span style="font-size:7px;font-weight:600;color:#1C1917;font-family:'Hanken Grotesk';">7/10</span>
          </div>
        </div>
      </div>`);

    if (screen === 'tasks') return wrap(/* html */`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
        <span style="font-size:13px;font-weight:700;color:#1C1917;letter-spacing:-0.02em;font-family:'Bricolage Grotesque';">Tasks</span>
        <span style="background:#1C1917;color:#fff;font-size:7px;font-weight:600;padding:5px 10px;border-radius:100px;font-family:'Hanken Grotesk';">+ New task</span>
      </div>
      <div style="display:flex;gap:4px;margin-bottom:2px;">
        <span style="font-size:7px;background:#1C1917;color:#fff;padding:4px 8px;border-radius:100px;font-family:'Hanken Grotesk';">List</span>
        <span style="font-size:7px;color:#57534E;padding:4px 8px;border-radius:100px;border:1px solid #E7E5E4;font-family:'Hanken Grotesk';">Kanban</span>
        <span style="font-size:7px;color:#57534E;padding:4px 8px;border-radius:100px;border:1px solid #E7E5E4;font-family:'Hanken Grotesk';">Timeline</span>
      </div>
      <div style="display:flex;gap:4px;margin-bottom:6px;">
        <span style="font-size:7px;color:#16A34A;background:rgba(22,163,74,0.08);padding:3px 7px;border-radius:100px;font-family:'Hanken Grotesk';">Ada's picks</span>
        <span style="font-size:7px;color:#57534E;padding:3px 7px;border-radius:100px;border:1px solid #E7E5E4;font-family:'Hanken Grotesk';">Personal</span>
        <span style="font-size:7px;color:#57534E;padding:3px 7px;border-radius:100px;border:1px solid #E7E5E4;font-family:'Hanken Grotesk';">This week</span>
        <span style="margin-left:auto;font-size:7px;color:#A8A29E;font-family:'JetBrains Mono';">0 open · 0 done</span>
      </div>
      <div style="background:#fff;border:1px solid #E7E5E4;border-radius:8px;overflow:hidden;flex:1;">
        <div style="display:grid;grid-template-columns:1fr 60px 52px 40px;gap:0;padding:6px 10px;border-bottom:1px solid #E7E5E4;background:rgba(28,25,23,0.02);">
          ${['TASK', 'PROJECT', 'ENERGY', 'EST'].map(l => `<span style="font-size:6px;font-weight:700;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.08em;">${l}</span>`).join('')}
        </div>
        <div style="padding:18px;text-align:center;"><span style="font-size:8px;color:#A8A29E;font-family:'Hanken Grotesk';">No tasks yet</span></div>
      </div>`);

    if (screen === 'calendar') return wrap(/* html */`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
        <div>
          <span style="font-size:8px;color:#A8A29E;font-family:'JetBrains Mono';display:block;margin-bottom:2px;">JUNE 2026</span>
          <span style="font-size:12px;font-weight:700;color:#1C1917;font-family:'Bricolage Grotesque';">Week of June 22</span>
        </div>
        <div style="display:flex;gap:3px;">
          ${['Day', 'Week', 'Month'].map((t, i) => `<span style="font-size:7px;padding:4px 7px;border-radius:100px;font-family:'Hanken Grotesk';${i === 1 ? 'background:#1C1917;color:#fff;' : 'color:#57534E;border:1px solid #E7E5E4;'}">${t}</span>`).join('')}
          <span style="font-size:7px;padding:4px 8px;border-radius:100px;background:#1C1917;color:#fff;font-family:'Hanken Grotesk';">+ Add</span>
        </div>
      </div>
      <div style="background:#fff;border:1px solid #E7E5E4;border-radius:8px;overflow:hidden;flex:1;">
        <div style="display:grid;grid-template-columns:30px repeat(5,1fr);border-bottom:1px solid #E7E5E4;">
          <span></span>
          ${['Mon 22', 'Tue 23', 'Wed 24', 'Thu 25', 'Fri 26'].map((d, i) => `<div style="padding:5px 3px;text-align:center;border-left:1px solid rgba(28,25,23,0.05);${i === 4 ? 'background:rgba(22,163,74,0.04);' : ''}"><span style="font-size:6px;color:#A8A29E;display:block;font-family:'JetBrains Mono';">${d.split(' ')[0]}</span><span style="font-size:9px;font-weight:600;color:${i === 4 ? '#16A34A' : '#1C1917'};font-family:'Bricolage Grotesque';">${d.split(' ')[1]}</span></div>`).join('')}
        </div>
        <div style="display:flex;align-items:center;justify-content:center;height:50px;">
          <span style="font-size:8px;color:#A8A29E;font-family:'Hanken Grotesk';">No events this week</span>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;flex:0 0 auto;">
        <div style="background:#fff;border:1px solid #E7E5E4;border-radius:7px;padding:7px;">
          <span style="font-size:6.5px;font-weight:700;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.08em;display:block;margin-bottom:4px;">SCHEDULE BALANCE</span>
          <span style="font-size:7px;color:#57534E;font-family:'Hanken Grotesk';">No events yet</span>
        </div>
        <div style="background:#fff;border:1px solid #E7E5E4;border-radius:7px;padding:7px;">
          <span style="font-size:6.5px;font-weight:700;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.08em;display:block;margin-bottom:4px;">QUICK ADD</span>
          <div style="display:flex;gap:3px;">${['Focus block', 'Meeting', 'Rest break'].map(t => `<span style="font-size:6px;padding:3px 5px;border-radius:100px;border:1px solid #E7E5E4;color:#57534E;white-space:nowrap;font-family:'Hanken Grotesk';">${t}</span>`).join('')}</div>
        </div>
      </div>`);

    if (screen === 'habits') return wrap(/* html */`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
        <span style="font-size:12px;font-weight:700;color:#1C1917;letter-spacing:-0.02em;font-family:'Bricolage Grotesque';">Habits</span>
        <span style="background:#1C1917;color:#fff;font-size:7px;font-weight:600;padding:5px 10px;border-radius:100px;font-family:'Hanken Grotesk';">+ New habit</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px;flex:0 0 auto;">
        ${[['Active Habits', '0 tracked'], ['Weekly Consistency', '0 this week'], ['Best Streak', '0 days']].map(([l, v]) => `
          <div style="background:#fff;border:1px solid #E7E5E4;border-radius:8px;padding:8px;">
            <span style="font-size:6px;font-weight:700;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.06em;display:block;margin-bottom:4px;">${l.toUpperCase()}</span>
            <span style="font-size:16px;font-weight:700;color:#1C1917;font-family:'Bricolage Grotesque';display:block;">0</span>
            <span style="font-size:7px;color:#A8A29E;font-family:'Hanken Grotesk';">${v}</span>
          </div>`).join('')}
      </div>
      <div style="background:#fff;border:1px solid #E7E5E4;border-radius:8px;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;">
        <span style="font-size:8.5px;color:#57534E;font-family:'Hanken Grotesk';">No habits tracked yet.</span>
        <span style="background:#1C1917;color:#fff;font-size:7px;padding:5px 12px;border-radius:100px;font-family:'Hanken Grotesk';">+ Add your first habit</span>
      </div>`);

    if (screen === 'ada') return /* html */`
      <div style="display:flex;height:100%;background:#FAFAF9;">
        ${Mockups.losSidebar(false)}
        <div style="flex:1;padding:11px;overflow:hidden;display:flex;flex-direction:column;gap:5px;background:#FAFAF9;">
          <span style="font-size:12px;font-weight:700;color:#1C1917;font-family:'Bricolage Grotesque';">Today</span>
          <div style="background:rgba(22,163,74,0.06);border:1px solid rgba(22,163,74,0.15);border-radius:7px;padding:6px 8px;">
            <span style="height:3px;width:50%;border-radius:2px;background:rgba(28,25,23,0.1);display:block;margin-bottom:3px;"></span>
            <span style="height:3px;width:75%;border-radius:2px;background:rgba(28,25,23,0.06);display:block;"></span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;flex:1;min-height:0;">
            <div style="background:#fff;border:1px solid #E7E5E4;border-radius:7px;padding:6px;"></div>
            <div style="background:#fff;border:1px solid #E7E5E4;border-radius:7px;padding:6px;"></div>
          </div>
        </div>
        <div style="flex:0 0 34%;background:#fff;border-left:1px solid #E7E5E4;display:flex;flex-direction:column;">
          <div style="padding:8px 10px;border-bottom:1px solid #E7E5E4;">
            <div style="display:flex;align-items:center;gap:5px;margin-bottom:2px;">
              <span style="width:18px;height:18px;border-radius:50%;background:rgba(22,163,74,0.08);border:1px solid rgba(22,163,74,0.2);display:flex;align-items:center;justify-content:center;font-size:9px;color:#16A34A;">✦</span>
              <div>
                <span style="font-size:9px;font-weight:700;color:#1C1917;display:block;font-family:'Bricolage Grotesque';">Ada</span>
                <span style="font-size:6px;color:#16A34A;font-family:'Hanken Grotesk';">● available · quiet mode</span>
              </div>
            </div>
          </div>
          <div style="flex:1;padding:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:4px;">
            <span style="width:26px;height:26px;border-radius:50%;background:rgba(22,163,74,0.08);border:1px solid rgba(22,163,74,0.18);display:flex;align-items:center;justify-content:center;font-size:12px;color:#16A34A;">✦</span>
            <span style="font-size:7.5px;color:#57534E;max-width:120px;line-height:1.4;font-family:'Hanken Grotesk';">Hi, I'm Ada. Ask me anything about your day.</span>
          </div>
          <div style="padding:8px 10px;border-top:1px solid #E7E5E4;">
            <span style="font-size:6px;font-weight:700;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.08em;display:block;margin-bottom:5px;">QUICK</span>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;">
              ${['Summarize my day', 'Find a focus block', 'Show overdue tasks', 'Plan tomorrow'].map(t => `<span style="font-size:6.5px;padding:4px 6px;border-radius:6px;border:1px solid #E7E5E4;color:#57534E;text-align:center;font-family:'Hanken Grotesk';">${t}</span>`).join('')}
            </div>
          </div>
          <div style="padding:7px 10px;border-top:1px solid #E7E5E4;display:flex;align-items:center;gap:5px;">
            <span style="flex:1;height:20px;border-radius:100px;border:1px solid #E7E5E4;background:rgba(28,25,23,0.02);"></span>
            <span style="width:20px;height:20px;border-radius:50%;background:#16A34A;display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;">→</span>
          </div>
        </div>
      </div>`;

    if (screen === 'insights') return wrap(/* html */`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
        <span style="font-size:12px;font-weight:700;color:#1C1917;font-family:'Bricolage Grotesque';">Insights</span>
        <div style="display:flex;gap:3px;">${['Week', 'Month', 'Quarter'].map((t, i) => `<span style="font-size:7px;padding:3px 7px;border-radius:100px;font-family:'Hanken Grotesk';${i === 1 ? 'background:#1C1917;color:#fff;' : 'color:#57534E;border:1px solid #E7E5E4;'}">${t}</span>`).join('')}</div>
      </div>
      <div style="background:#fff;border:1px solid #E7E5E4;border-radius:8px;padding:8px;flex:0 0 auto;">
        <span style="font-size:6.5px;font-weight:700;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.08em;display:block;margin-bottom:4px;">PATTERN · LAST 30 DAYS</span>
        <span style="font-size:9px;font-weight:600;color:#1C1917;display:block;margin-bottom:6px;font-family:'Bricolage Grotesque';">Start logging mood and focus sessions to see your patterns.</span>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;">
          ${[['0%', 'focus completion'], ['—', 'avg energy'], ['0h', 'deep work total'], ['0%', 'habit consistency']].map(([v, l]) => `<div><span style="font-size:11px;font-weight:700;color:#1C1917;display:block;font-family:'Bricolage Grotesque';">${v}</span><span style="font-size:6px;color:#A8A29E;font-family:'JetBrains Mono';">${l}</span></div>`).join('')}
        </div>
      </div>
      <div style="display:grid;grid-template-columns:2fr 1fr;gap:5px;flex:1;min-height:0;">
        <div style="background:#fff;border:1px solid #E7E5E4;border-radius:8px;padding:8px;">
          <span style="font-size:6.5px;font-weight:700;color:#A8A29E;font-family:'JetBrains Mono';display:block;margin-bottom:6px;">ENERGY THROUGH THE DAY</span>
          <div style="position:relative;height:36px;">
            <div style="position:absolute;bottom:0;left:0;right:0;height:16px;background:linear-gradient(to top,rgba(22,163,74,0.1),transparent);border-radius:4px;"></div>
            <svg viewBox="0 0 100 20" style="width:100%;height:100%;overflow:visible;"><path d="M0 10 Q25 9 50 10 Q75 11 100 10" fill="none" stroke="#16A34A" stroke-width="1.2" stroke-linecap="round"/></svg>
          </div>
        </div>
        <div style="background:#fff;border:1px solid #E7E5E4;border-radius:8px;padding:8px;display:flex;flex-direction:column;gap:3px;">
          <span style="font-size:6.5px;font-weight:700;color:#A8A29E;font-family:'JetBrains Mono';display:block;margin-bottom:2px;">MOOD DISTRIBUTION</span>
          ${['Focused', 'Productive', 'Calm', 'Tired', 'Overwhelmed'].map(m => `<div style="display:flex;align-items:center;gap:4px;"><span style="width:5px;height:5px;border-radius:50%;background:rgba(28,25,23,0.15);flex:0 0 auto;"></span><span style="font-size:6px;color:#57534E;flex:1;font-family:'Hanken Grotesk';">${m}</span><span style="font-size:6px;color:#A8A29E;font-family:'JetBrains Mono';">0%</span></div>`).join('')}
        </div>
      </div>`);

    return wrap(/* html */`<div style="display:flex;align-items:center;justify-content:center;height:100%;"><span style="font-size:8px;color:#A8A29E;font-family:'Hanken Grotesk';">Preview</span></div>`);
  },

  losHeroComposition() {
    const S = 0.5, P = `${Math.round(100 / S)}%`;
    const mkSidebar = (active) => /* html */`
      <div style="width:116px;flex:0 0 116px;background:#F7F6F3;border-right:1px solid #E7E5E4;padding:11px 8px;display:flex;flex-direction:column;gap:2px;">
        <div style="display:flex;align-items:center;gap:5px;margin-bottom:11px;">
          <span style="width:19px;height:19px;border-radius:6px;background:#16A34A;flex:0 0 auto;display:flex;align-items:center;justify-content:center;font-size:9px;color:#fff;font-weight:700;font-family:'Bricolage Grotesque';">L</span>
          <span style="font-size:11px;font-weight:600;color:#1C1917;font-family:'Bricolage Grotesque';">Life OS</span>
        </div>
        ${['Today', 'Tasks', 'Calendar', 'Habits', 'Notes', 'Insights'].map(n => {
          const a = n === active;
          return `<div style="padding:5px 7px;border-radius:6px;${a ? 'background:rgba(22,163,74,0.08);' : ''}display:flex;align-items:center;gap:6px;"><span style="width:9px;height:9px;border-radius:2px;background:${a ? 'rgba(22,163,74,0.5)' : 'rgba(28,25,23,0.1)'};flex:0 0 auto;"></span><span style="font-size:11px;font-weight:${a ? 500 : 400};color:${a ? '#16A34A' : '#57534E'};font-family:'Hanken Grotesk';">${n}</span></div>`;
        }).join('')}
      </div>`;
    return /* html */`
      <div style="position:relative;width:100%;max-width:900px;height:clamp(200px,26vw,340px);">
        <div style="position:absolute;left:-1%;top:10%;width:50%;height:76%;border-radius:12px;overflow:hidden;background:#FAFAF9;border:1px solid rgba(255,255,255,0.18);box-shadow:0 24px 64px -24px rgba(0,0,0,0.55);opacity:0.82;transform:rotate(-3deg);">
          ${Mockups.losChrome()}
          <div style="position:relative;height:calc(100% - 27px);overflow:hidden;">
            <div style="position:absolute;top:0;left:0;width:${P};height:${P};transform:scale(${S});transform-origin:top left;display:flex;">
              ${mkSidebar('Insights')}
              <div style="flex:1;padding:14px;display:flex;flex-direction:column;gap:9px;overflow:hidden;min-width:0;background:#FAFAF9;">
                <span style="font-size:18px;font-weight:700;color:#1C1917;font-family:'Bricolage Grotesque';letter-spacing:-0.02em;">Insights</span>
                <div style="background:#fff;border:1px solid #E7E5E4;border-radius:8px;padding:10px;">
                  <span style="font-size:7px;font-weight:700;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.1em;display:block;margin-bottom:5px;">PATTERN · LAST 30 DAYS</span>
                  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;">${[['0%', 'focus'], ['—', 'energy'], ['0h', 'deep work'], ['0%', 'habits']].map(([v, l]) => `<div><span style="font-size:15px;font-weight:700;color:#1C1917;font-family:'Bricolage Grotesque';display:block;">${v}</span><span style="font-size:6px;color:#A8A29E;font-family:'JetBrains Mono';">${l}</span></div>`).join('')}</div>
                </div>
                <div style="background:#fff;border:1px solid #E7E5E4;border-radius:8px;padding:10px;flex:1;">
                  <span style="font-size:7px;font-weight:700;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.1em;display:block;margin-bottom:6px;">ENERGY THROUGH THE DAY</span>
                  <svg viewBox="0 0 100 20" style="width:100%;height:28px;overflow:visible;"><path d="M0 10 Q25 9 50 10 Q75 11 100 10" fill="none" stroke="#16A34A" stroke-width="1.5" stroke-linecap="round"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="position:absolute;right:0;top:0;bottom:0;width:68%;border-radius:14px;overflow:hidden;background:#FAFAF9;border:1px solid rgba(255,255,255,0.22);box-shadow:0 36px 90px -26px rgba(0,0,0,0.72);">
          ${Mockups.losChrome()}
          <div style="position:relative;height:calc(100% - 27px);overflow:hidden;">
            <div style="position:absolute;top:0;left:0;width:${P};height:${P};transform:scale(${S});transform-origin:top left;display:flex;">
              ${mkSidebar('Today')}
              <div style="flex:1;padding:16px 14px;display:flex;flex-direction:column;gap:10px;overflow:hidden;min-width:0;background:#FAFAF9;">
                <div>
                  <span style="font-size:9px;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.1em;display:block;margin-bottom:5px;">FRIDAY, JUNE 26</span>
                  <span style="font-size:20px;font-weight:700;color:#1C1917;letter-spacing:-0.025em;display:block;font-family:'Bricolage Grotesque';line-height:1.1;">Good afternoon, Midhun.<br><span style="color:#57534E;">Stay grounded.</span></span>
                </div>
                <div style="background:rgba(22,163,74,0.07);border:1px solid rgba(22,163,74,0.2);border-radius:10px;padding:10px 12px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;">
                    <span style="font-size:8px;font-weight:700;color:#16A34A;font-family:'JetBrains Mono';letter-spacing:0.12em;">FOCUS TODAY</span>
                    <span style="font-size:8px;color:#A8A29E;font-family:'JetBrains Mono';">● Not started</span>
                  </div>
                  <span style="font-size:11px;color:#57534E;font-family:'Hanken Grotesk';display:block;margin-bottom:6px;">No focus blocks scheduled yet.</span>
                  <div style="display:flex;justify-content:space-between;align-items:center;">
                    <span style="font-size:8px;color:#A8A29E;font-family:'JetBrains Mono';">0 of 3 blocks · 0m deep work</span>
                    <span style="background:#1C1917;color:#fff;font-size:8px;font-weight:600;padding:4px 9px;border-radius:100px;font-family:'Hanken Grotesk';white-space:nowrap;">⚡ Enter focus</span>
                  </div>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;flex:1;min-height:0;">
                  <div style="background:#fff;border:1px solid #E7E5E4;border-radius:8px;padding:9px;">
                    <span style="font-size:7px;font-weight:700;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.1em;display:block;margin-bottom:5px;">PRIORITIES</span>
                    <span style="font-size:10px;color:#A8A29E;font-family:'Hanken Grotesk';">No tasks yet.</span>
                  </div>
                  <div style="background:#fff;border:1px solid #E7E5E4;border-radius:8px;padding:9px;">
                    <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
                      <span style="font-size:7px;font-weight:700;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.1em;">HOW ARE YOU</span>
                      <span style="font-size:7px;color:#A8A29E;font-family:'JetBrains Mono';">1:11 PM</span>
                    </div>
                    <div style="display:flex;gap:4px;margin-bottom:5px;">${[0, 1, 2, 3, 4].map((_, i) => `<span style="width:14px;height:14px;border-radius:50%;background:${i === 0 ? '#1C1917' : 'rgba(28,25,23,0.1)'};border:1px solid rgba(28,25,23,0.12);display:block;"></span>`).join('')}</div>
                    <div style="display:flex;align-items:center;gap:5px;">
                      <span style="font-size:8px;color:#57534E;font-family:'Hanken Grotesk';">Energy</span>
                      <div style="flex:1;height:3px;background:rgba(28,25,23,0.07);border-radius:2px;overflow:hidden;"><span style="display:block;width:70%;height:100%;background:#16A34A;border-radius:2px;"></span></div>
                      <span style="font-size:8px;font-weight:600;color:#1C1917;font-family:'Hanken Grotesk';">7/10</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  },

};
