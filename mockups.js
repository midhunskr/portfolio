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
    const h = 'clamp(96px,12vw,138px)';
    const S = 0.42, P = `${Math.round(100 / S)}%`;
    const mkNav = (active) => ['Today', 'Tasks', 'Calendar', 'Habits', 'Notes', 'Insights'].map(n => {
      const a = n === active;
      return /* html */`
        <div style="padding:5px 7px;border-radius:6px;${a ? 'background:rgba(22,163,74,0.08);' : ''}display:flex;align-items:center;gap:6px;">
          <span style="width:9px;height:9px;border-radius:2px;background:${a ? 'rgba(22,163,74,0.5)' : 'rgba(28,25,23,0.1)'};flex:0 0 auto;"></span>
          <span style="font-size:11px;font-weight:${a ? 500 : 400};color:${a ? '#16A34A' : '#57534E'};font-family:'Hanken Grotesk';">${n}</span>
        </div>`;
    }).join('');
    const sidebar = (active) => /* html */`
      <div style="width:116px;flex:0 0 116px;background:#F7F6F3;border-right:1px solid #E7E5E4;padding:11px 8px;display:flex;flex-direction:column;gap:2px;">
        <div style="display:flex;align-items:center;gap:5px;margin-bottom:11px;">
          <span style="width:19px;height:19px;border-radius:6px;background:#16A34A;flex:0 0 auto;display:flex;align-items:center;justify-content:center;font-size:9px;color:#fff;font-weight:700;font-family:'Bricolage Grotesque';">L</span>
          <span style="font-size:11px;font-weight:600;color:#1C1917;font-family:'Bricolage Grotesque';">Life OS</span>
        </div>
        ${mkNav(active)}
      </div>`;
    return /* html */`
      <div style="position:relative;height:${h};border-radius:10px;overflow:hidden;">
        <div style="position:absolute;left:0;top:8%;width:58%;height:80%;border-radius:10px;overflow:hidden;background:#FAFAF9;border:1px solid #E7E5E4;box-shadow:0 10px 28px -12px rgba(28,25,23,0.22);opacity:0.78;transform:rotate(-2.5deg);transform-origin:top left;">
          ${Mockups.losChrome()}
          <div style="position:relative;height:calc(100% - 22px);overflow:hidden;">
            <div style="position:absolute;top:0;left:0;width:${P};height:${P};transform:scale(${S});transform-origin:top left;display:flex;">
              ${sidebar('Tasks')}
              <div style="flex:1;padding:14px;display:flex;flex-direction:column;gap:8px;overflow:hidden;min-width:0;background:#FAFAF9;">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <span style="font-size:18px;font-weight:700;color:#1C1917;font-family:'Bricolage Grotesque';letter-spacing:-0.02em;">Tasks</span>
                </div>
                <div style="background:#fff;border:1px solid #E7E5E4;border-radius:8px;padding:9px 10px;display:flex;flex-direction:column;gap:7px;">
                  <div style="display:flex;align-items:center;gap:7px;">
                    <span style="width:10px;height:10px;border-radius:50%;border:1.5px solid rgba(28,25,23,0.25);flex:0 0 auto;"></span>
                    <div style="flex:1;"><span style="font-size:10px;font-weight:500;color:#1C1917;font-family:'Hanken Grotesk';">Meeting with George</span><div style="display:flex;gap:4px;margin-top:2px;"><span style="font-size:7px;background:rgba(22,163,74,0.1);color:#16A34A;padding:2px 5px;border-radius:4px;font-family:'Hanken Grotesk';">high</span></div></div>
                    <span style="font-size:7px;color:#A8A29E;font-family:'JetBrains Mono';">2h</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:7px;">
                    <span style="width:10px;height:10px;border-radius:50%;border:1.5px solid rgba(28,25,23,0.25);flex:0 0 auto;"></span>
                    <div style="flex:1;"><span style="font-size:10px;font-weight:500;color:#1C1917;font-family:'Hanken Grotesk';">Complete UX Case Study</span><div style="display:flex;gap:4px;margin-top:2px;"><span style="font-size:7px;background:rgba(204,134,54,0.1);color:#CC8636;padding:2px 5px;border-radius:4px;font-family:'Hanken Grotesk';">med</span></div></div>
                    <span style="font-size:7px;color:#A8A29E;font-family:'JetBrains Mono';">45m</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:7px;">
                    <span style="width:8px;height:8px;border-radius:2px;background:rgba(28,25,23,0.06);flex:0 0 auto;"></span>
                    <span style="font-size:9px;color:#A8A29E;font-family:'Hanken Grotesk';">+ Add task</span>
                  </div>
                </div>
                <div style="background:#fff;border:1px solid #E7E5E4;border-radius:8px;padding:9px 10px;">
                  <span style="font-size:7px;font-weight:700;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.1em;display:block;margin-bottom:6px;">HABITS</span>
                  <div style="display:flex;align-items:center;gap:8px;margin-bottom:5px;">
                    <span style="font-size:9px;font-weight:500;color:#1C1917;font-family:'Hanken Grotesk';flex:1;">Cycling</span>
                    <div style="display:flex;gap:2px;">${[1,1,1,1,1,0,0].map(f=>`<span style="width:8px;height:8px;border-radius:2px;background:${f?'#16A34A':'rgba(28,25,23,0.07)'};display:block;"></span>`).join('')}</div>
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;">
                    <span style="font-size:9px;font-weight:500;color:#1C1917;font-family:'Hanken Grotesk';flex:1;">Coding</span>
                    <div style="display:flex;gap:2px;"><span style="font-size:7px;color:#A8A29E;font-family:'JetBrains Mono';">0%</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="position:absolute;right:0;top:0;bottom:0;width:74%;border-radius:10px;overflow:hidden;background:#FAFAF9;border:1px solid #E7E5E4;box-shadow:0 14px 40px -14px rgba(28,25,23,0.28);">
          ${Mockups.losChrome()}
          <div style="position:relative;height:calc(100% - 22px);overflow:hidden;">
            <div style="position:absolute;top:0;left:0;width:${P};height:${P};transform:scale(${S});transform-origin:top left;display:flex;">
              ${sidebar('Today')}
              <div style="flex:1;padding:16px 14px;display:flex;flex-direction:column;gap:10px;overflow:hidden;min-width:0;background:#FAFAF9;">
                <div>
                  <span style="font-size:9px;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.1em;display:block;margin-bottom:5px;">SATURDAY, JUNE 27</span>
                  <span style="font-size:20px;font-weight:700;color:#1C1917;letter-spacing:-0.025em;display:block;font-family:'Bricolage Grotesque';line-height:1.1;">Good evening, Midhun.<br><span style="color:#57534E;">Stay grounded.</span></span>
                </div>
                <div style="background:rgba(22,163,74,0.07);border:1px solid rgba(22,163,74,0.2);border-radius:10px;padding:10px 12px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                    <span style="font-size:8px;font-weight:700;color:#16A34A;font-family:'JetBrains Mono';letter-spacing:0.12em;">FOCUS TODAY</span>
                    <span style="font-size:8px;color:#16A34A;font-family:'JetBrains Mono';">● In progress</span>
                  </div>
                  <span style="font-size:12px;font-weight:700;color:#1C1917;font-family:'Bricolage Grotesque';display:block;margin-bottom:5px;">2 of 3 sessions complete.</span>
                  <div style="display:flex;gap:14px;margin-bottom:6px;">
                    <div><span style="font-size:10px;font-weight:600;color:#1C1917;font-family:'Bricolage Grotesque';display:block;">2 of 3 blocks</span><span style="font-size:7px;color:#A8A29E;font-family:'JetBrains Mono';">completed today</span></div>
                    <div><span style="font-size:10px;font-weight:600;color:#1C1917;font-family:'Bricolage Grotesque';display:block;">1h 20m</span><span style="font-size:7px;color:#A8A29E;font-family:'JetBrains Mono';">deep work logged</span></div>
                  </div>
                  <div style="display:flex;justify-content:flex-end;">
                    <span style="background:#1C1917;color:#fff;font-size:8px;font-weight:600;padding:4px 9px;border-radius:100px;font-family:'Hanken Grotesk';white-space:nowrap;">⚡ Enter focus</span>
                  </div>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;flex:1;min-height:0;">
                  <div style="background:#fff;border:1px solid #E7E5E4;border-radius:8px;padding:9px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;">
                      <span style="font-size:7px;font-weight:700;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.1em;">PRIORITIES</span>
                      <span style="font-size:7px;color:#A8A29E;font-family:'JetBrains Mono';">2</span>
                    </div>
                    <div style="display:flex;flex-direction:column;gap:5px;">
                      <div style="display:flex;align-items:flex-start;gap:5px;"><span style="width:8px;height:8px;border-radius:50%;border:1.5px solid rgba(28,25,23,0.2);flex:0 0 auto;margin-top:1px;"></span><span style="font-size:8px;color:#1C1917;font-family:'Hanken Grotesk';">Complete LifeOS Landing Page</span></div>
                      <div style="display:flex;align-items:flex-start;gap:5px;"><span style="width:8px;height:8px;border-radius:50%;border:1.5px solid rgba(28,25,23,0.2);flex:0 0 auto;margin-top:1px;"></span><span style="font-size:8px;color:#1C1917;font-family:'Hanken Grotesk';">Review Investor Deck</span></div>
                    </div>
                  </div>
                  <div style="background:#fff;border:1px solid #E7E5E4;border-radius:8px;padding:9px;">
                    <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
                      <span style="font-size:7px;font-weight:700;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.1em;">HOW ARE YOU</span>
                      <span style="font-size:7px;color:#A8A29E;font-family:'JetBrains Mono';">8:27 PM</span>
                    </div>
                    <div style="display:flex;gap:4px;margin-bottom:5px;">${['rgba(28,25,23,0.15)','rgba(28,25,23,0.1)','#16A34A','rgba(28,25,23,0.1)','rgba(28,25,23,0.08)'].map(c=>`<span style="width:14px;height:14px;border-radius:50%;background:${c};border:1px solid rgba(28,25,23,0.12);display:block;"></span>`).join('')}</div>
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

  lifeosBig() {
    const h = 'clamp(168px,24vw,238px)';
    const S = 0.44, P = `${Math.round(100 / S)}%`;
    const mkNav = (active) => ['Today', 'Tasks', 'Calendar', 'Habits', 'Notes', 'Insights'].map(n => {
      const a = n === active;
      return /* html */`
        <div style="padding:5px 7px;border-radius:6px;${a ? 'background:rgba(22,163,74,0.08);' : ''}display:flex;align-items:center;gap:6px;">
          <span style="width:9px;height:9px;border-radius:2px;background:${a ? 'rgba(22,163,74,0.5)' : 'rgba(28,25,23,0.1)'};flex:0 0 auto;"></span>
          <span style="font-size:11px;font-weight:${a ? 500 : 400};color:${a ? '#16A34A' : '#57534E'};font-family:'Hanken Grotesk';">${n}</span>
        </div>`;
    }).join('');
    return /* html */`
      <div style="border:1px solid #E7E5E4;border-radius:12px;overflow:hidden;background:#FAFAF9;height:${h};display:flex;flex-direction:column;box-shadow:0 20px 56px -18px rgba(28,25,23,0.28);">
        ${Mockups.losChrome(`<span style="flex:1;display:flex;align-items:center;justify-content:center;gap:5px;margin:0 8px;"><span style="font-size:8px;color:#1C1917;font-family:'Bricolage Grotesque';font-weight:600;">✦ LifeOS Dashboard</span></span>`)}
        <div style="flex:1;overflow:hidden;position:relative;">
          <div style="position:absolute;top:0;left:0;width:${P};height:${P};transform:scale(${S});transform-origin:top left;display:flex;">
            <div style="width:140px;flex:0 0 140px;background:#F7F6F3;border-right:1px solid #E7E5E4;padding:13px 10px;display:flex;flex-direction:column;gap:2px;">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:9px;">
                <span style="width:22px;height:22px;border-radius:7px;background:#16A34A;flex:0 0 auto;display:flex;align-items:center;justify-content:center;font-size:11px;color:#fff;font-weight:700;font-family:'Bricolage Grotesque';">L</span>
                <div><span style="font-size:12px;font-weight:700;color:#1C1917;display:block;font-family:'Bricolage Grotesque';">Life OS</span><span style="font-size:8px;color:#A8A29E;font-family:'Hanken Grotesk';">Midhun Shankar's workspace</span></div>
              </div>
              <div style="background:rgba(28,25,23,0.04);border-radius:6px;padding:5px 7px;margin-bottom:6px;display:flex;align-items:center;gap:5px;">
                <span style="font-size:9px;color:#A8A29E;font-family:'Hanken Grotesk';">⌕ Quick find</span>
              </div>
              <span style="font-size:8px;font-weight:700;color:#A8A29E;letter-spacing:0.08em;font-family:'JetBrains Mono';padding:3px 7px;margin-bottom:2px;">WORKSPACE</span>
              ${mkNav('Today')}
            </div>
            <div style="flex:1;padding:18px 16px;display:flex;flex-direction:column;gap:12px;overflow:hidden;min-width:0;background:#FAFAF9;">
              <div>
                <span style="font-size:9px;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.1em;display:block;margin-bottom:4px;">SATURDAY, JUNE 27</span>
                <span style="font-size:24px;font-weight:700;color:#1C1917;letter-spacing:-0.03em;display:block;font-family:'Bricolage Grotesque';line-height:1.05;">Good evening, Midhun. <span style="color:#57534E;">Stay grounded.</span></span>
              </div>
              <div style="background:rgba(22,163,74,0.07);border:1px solid rgba(22,163,74,0.18);border-radius:12px;padding:12px 14px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                  <span style="font-size:8px;font-weight:700;color:#16A34A;font-family:'JetBrains Mono';letter-spacing:0.12em;">FOCUS TODAY</span>
                  <span style="font-size:8px;color:#16A34A;font-family:'JetBrains Mono';">● In progress</span>
                </div>
                <span style="font-size:14px;font-weight:700;color:#1C1917;font-family:'Bricolage Grotesque';display:block;margin-bottom:6px;">2 of 3 sessions complete.</span>
                <div style="display:flex;align-items:center;gap:16px;">
                  <div style="display:flex;gap:16px;">
                    <div><span style="font-size:10px;font-weight:600;color:#1C1917;font-family:'Bricolage Grotesque';display:block;">2 of 3 blocks</span><span style="font-size:7px;color:#A8A29E;font-family:'JetBrains Mono';">completed today</span></div>
                    <div><span style="font-size:10px;font-weight:600;color:#1C1917;font-family:'Bricolage Grotesque';display:block;">1h 20m</span><span style="font-size:7px;color:#A8A29E;font-family:'JetBrains Mono';">deep work logged</span></div>
                  </div>
                  <span style="margin-left:auto;background:#1C1917;color:#fff;font-size:9px;font-weight:600;padding:6px 12px;border-radius:100px;font-family:'Hanken Grotesk';white-space:nowrap;">⚡ Enter focus</span>
                </div>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;flex:1;min-height:0;">
                <div style="display:flex;flex-direction:column;gap:10px;">
                  <div style="background:#fff;border:1px solid #E7E5E4;border-radius:10px;padding:11px 12px;flex:1;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                      <span style="font-size:8px;font-weight:700;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.1em;">PRIORITIES</span>
                      <span style="font-size:8px;color:#A8A29E;font-family:'JetBrains Mono';">2</span>
                    </div>
                    <div style="display:flex;flex-direction:column;gap:7px;">
                      <div style="display:flex;align-items:flex-start;gap:6px;"><span style="width:10px;height:10px;border-radius:50%;border:1.5px solid rgba(28,25,23,0.22);flex:0 0 auto;margin-top:1px;"></span><div><span style="font-size:9px;font-weight:500;color:#1C1917;font-family:'Hanken Grotesk';display:block;">Complete LifeOS Landing Page</span><div style="display:flex;gap:4px;margin-top:2px;align-items:center;"><span style="font-size:7px;background:rgba(220,38,38,0.1);color:#DC2626;padding:2px 5px;border-radius:4px;font-family:'Hanken Grotesk';">high</span><span style="font-size:7px;color:#A8A29E;font-family:'JetBrains Mono';">2h</span></div></div></div>
                      <div style="display:flex;align-items:flex-start;gap:6px;"><span style="width:10px;height:10px;border-radius:50%;border:1.5px solid rgba(28,25,23,0.22);flex:0 0 auto;margin-top:1px;"></span><div><span style="font-size:9px;font-weight:500;color:#1C1917;font-family:'Hanken Grotesk';display:block;">Review Investor Deck</span><div style="display:flex;gap:4px;margin-top:2px;align-items:center;"><span style="font-size:7px;background:rgba(204,134,54,0.12);color:#CC8636;padding:2px 5px;border-radius:4px;font-family:'Hanken Grotesk';">med</span><span style="font-size:7px;color:#A8A29E;font-family:'JetBrains Mono';">45m</span></div></div></div>
                      <div style="display:flex;align-items:center;gap:5px;"><span style="font-size:9px;color:#A8A29E;font-family:'Hanken Grotesk';">+ Add task</span><span style="margin-left:auto;font-size:7px;color:#A8A29E;font-family:'JetBrains Mono';">2h 45m planned</span></div>
                    </div>
                  </div>
                  <div style="background:#fff;border:1px solid #E7E5E4;border-radius:10px;padding:11px 12px;">
                    <span style="font-size:8px;font-weight:700;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.1em;display:block;margin-bottom:7px;">TODAY'S SCHEDULE</span>
                    <div style="display:flex;flex-direction:column;gap:5px;">
                      ${[['9:00 AM','Focus Block','2h','#16A34A'],['11:30 AM','Team Standup','30m','#A8A29E'],['1:00 PM','Lunch Break','1h','#A8A29E'],['2:00 PM','Design Review','1h','#CC8636']].map(([t,n,d,c])=>`<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:7.5px;color:#A8A29E;font-family:'JetBrains Mono';flex:0 0 42px;">${t}</span><div style="flex:1;background:rgba(28,25,23,0.04);border-left:2px solid ${c};border-radius:0 4px 4px 0;padding:3px 6px;"><span style="font-size:8px;font-weight:500;color:#1C1917;font-family:'Hanken Grotesk';">${n}</span></div><span style="font-size:7px;color:#A8A29E;font-family:'JetBrains Mono';">${d}</span></div>`).join('')}
                    </div>
                  </div>
                </div>
                <div style="display:flex;flex-direction:column;gap:10px;">
                  <div style="background:#fff;border:1px solid #E7E5E4;border-radius:10px;padding:11px 12px;">
                    <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                      <span style="font-size:8px;font-weight:700;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.1em;">HOW ARE YOU, RIGHT NOW?</span>
                      <span style="font-size:7px;color:#A8A29E;font-family:'JetBrains Mono';">8:27 PM</span>
                    </div>
                    <div style="display:flex;gap:6px;margin-bottom:6px;align-items:flex-end;">${[['focused','rgba(28,25,23,0.15)','','rgba(28,25,23,0.6)'],['calm','rgba(28,25,23,0.1)','','rgba(28,25,23,0.4)'],['productive','#16A34A','productive','#16A34A'],['tired','rgba(28,25,23,0.1)','','rgba(28,25,23,0.4)'],['overwhelmed','rgba(28,25,23,0.08)','','rgba(28,25,23,0.3)']].map(([l,c,sel,tc])=>`<div style="display:flex;flex-direction:column;align-items:center;gap:3px;flex:1;"><span style="width:18px;height:18px;border-radius:50%;background:${c};border:1px solid rgba(28,25,23,0.12);display:block;${sel?'box-shadow:0 0 0 2px #16A34A,0 0 0 4px rgba(22,163,74,0.15);':''}"></span><span style="font-size:6.5px;color:${tc};font-family:'Hanken Grotesk';text-align:center;font-weight:${sel?'600':'400'};">${l}</span></div>`).join('')}</div>
                    <div style="display:flex;align-items:center;gap:6px;margin-top:4px;">
                      <span style="font-size:8px;color:#57534E;font-family:'Hanken Grotesk';">Energy</span>
                      <div style="flex:1;height:4px;background:rgba(28,25,23,0.07);border-radius:2px;overflow:hidden;"><span style="display:block;width:70%;height:100%;background:linear-gradient(90deg,#16A34A,#22C55E);border-radius:2px;"></span></div>
                      <span style="font-size:8px;font-weight:700;color:#1C1917;font-family:'Hanken Grotesk';">7/10</span>
                    </div>
                  </div>
                  <div style="background:#fff;border:1px solid #E7E5E4;border-radius:10px;padding:11px 12px;flex:1;">
                    <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                      <span style="font-size:8px;font-weight:700;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.1em;">HABITS</span>
                      <span style="font-size:7px;color:#A8A29E;font-family:'JetBrains Mono';">This week</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;">
                      <div style="flex:1;"><span style="font-size:9px;font-weight:600;color:#1C1917;display:block;font-family:'Hanken Grotesk';">Cycling</span><span style="font-size:7px;color:#16A34A;font-family:'Hanken Grotesk';">3 day streak</span></div>
                      <div style="display:flex;gap:2px;">${[1,1,1,1,1,0,0].map(f=>`<span style="width:9px;height:9px;border-radius:2px;background:${f?'#16A34A':'rgba(28,25,23,0.07)'};display:block;"></span>`).join('')}</div>
                    </div>
                  </div>
                  <div style="background:#fff;border:1px solid #E7E5E4;border-radius:10px;padding:11px 12px;">
                    <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                      <span style="font-size:8px;font-weight:700;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.1em;">REFLECTION · LAST 7 DAYS</span>
                    </div>
                    <p style="font-size:8px;color:#57534E;font-family:'Hanken Grotesk';line-height:1.4;margin-bottom:8px;">You're building momentum. Keep protecting your focus time.</p>
                    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;">
                      ${[['6.5h','avg energy'],['4h 20m','deep work'],['71%','habit consistency']].map(([v,l])=>`<div><span style="font-size:10px;font-weight:700;color:#1C1917;display:block;font-family:'Bricolage Grotesque';">${v}</span><span style="font-size:6.5px;color:#A8A29E;font-family:'JetBrains Mono';">${l}</span></div>`).join('')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
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

    const sidebar = /* html */`
      <div style="width:120px;flex:0 0 120px;background:#F7F6F3;border-right:1px solid #E7E5E4;padding:11px 8px;display:flex;flex-direction:column;gap:2px;">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:12px;padding:2px 4px;">
          <span style="width:20px;height:20px;border-radius:5px;background:#16A34A;flex:0 0 auto;display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;font-weight:700;font-family:'Bricolage Grotesque';">L</span>
          <span style="font-size:12px;font-weight:600;color:#1C1917;font-family:'Bricolage Grotesque';">Life OS</span>
        </div>
        <div style="padding:4px 7px;border-radius:6px;background:rgba(22,163,74,0.08);display:flex;align-items:center;gap:6px;">
          <span style="width:9px;height:9px;border-radius:2px;background:rgba(22,163,74,0.5);flex:0 0 auto;"></span>
          <span style="font-size:11px;font-weight:500;color:#16A34A;font-family:'Hanken Grotesk';">Today</span>
        </div>
        ${['Tasks','Calendar','Habits','Notes','Insights'].map(n => `
          <div style="padding:4px 7px;display:flex;align-items:center;gap:6px;">
            <span style="width:9px;height:9px;border-radius:2px;background:rgba(28,25,23,0.1);flex:0 0 auto;"></span>
            <span style="font-size:11px;color:#57534E;font-family:'Hanken Grotesk';">${n}</span>
          </div>`).join('')}
        <div style="margin-top:auto;padding-top:10px;border-top:1px solid #E7E5E4;">
          <div style="display:flex;align-items:center;gap:6px;padding:3px 4px;">
            <span style="width:18px;height:18px;border-radius:50%;background:#16A34A;flex:0 0 auto;display:flex;align-items:center;justify-content:center;font-size:9px;color:#fff;font-weight:700;font-family:'Bricolage Grotesque';">M</span>
            <span style="font-size:10px;color:#57534E;font-family:'Hanken Grotesk';">Midhun Shankar</span>
          </div>
        </div>
      </div>`;

    const todayMain = /* html */`
      <div style="flex:1;padding:14px;overflow:hidden;display:flex;flex-direction:column;gap:8px;background:#FAFAF9;">
        <div style="display:flex;justify-content:space-between;align-items:start;">
          <div>
            <span style="font-size:8px;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.08em;display:block;margin-bottom:3px;">SATURDAY, JUNE 27</span>
            <span style="font-size:17px;font-weight:700;color:#1C1917;font-family:'Bricolage Grotesque';letter-spacing:-0.02em;line-height:1.1;display:block;">Good evening, Midhun. Stay grounded.</span>
          </div>
          <span style="font-size:8px;color:#A8A29E;font-family:'JetBrains Mono';white-space:nowrap;padding-top:2px;">✦ Ask Ada</span>
        </div>
        <div style="background:rgba(22,163,74,0.07);border:1px solid rgba(22,163,74,0.2);border-radius:9px;padding:9px 11px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
            <span style="font-size:7px;font-weight:700;color:#16A34A;font-family:'JetBrains Mono';letter-spacing:0.1em;">FOCUS TODAY</span>
            <span style="font-size:7px;color:#57534E;font-family:'JetBrains Mono';">● In progress</span>
          </div>
          <span style="font-size:12px;font-weight:600;color:#1C1917;font-family:'Bricolage Grotesque';display:block;margin-bottom:4px;">2 of 3 sessions complete.</span>
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span style="font-size:7.5px;color:#57534E;font-family:'Hanken Grotesk';">2 of 3 blocks · 1h 26m deep work logged</span>
            <span style="background:#1C1917;color:#fff;font-size:8px;font-weight:600;padding:4px 10px;border-radius:100px;font-family:'Hanken Grotesk';white-space:nowrap;">⚡ Enter focus</span>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;">
          <div style="background:#fff;border:1px solid #E7E5E4;border-radius:8px;padding:8px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
              <span style="font-size:6.5px;font-weight:700;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.08em;">PRIORITIES  2</span>
              <span style="font-size:7px;color:#16A34A;font-family:'Hanken Grotesk';">Ada's picks</span>
            </div>
            ${[['Complete LifeOS Landing Page','high'],['Review Investor Deck','med']].map(([t,p]) => `
              <div style="display:flex;align-items:center;gap:5px;padding:4px 0;border-bottom:1px solid rgba(28,25,23,0.04);">
                <span style="width:9px;height:9px;border-radius:2px;border:1.5px solid #D6D3D1;flex:0 0 auto;"></span>
                <span style="flex:1;font-size:7.5px;color:#1C1917;font-family:'Hanken Grotesk';overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${t}</span>
                <span style="font-size:6.5px;color:${p==='high'?'#DC2626':'#A8A29E'};background:${p==='high'?'rgba(220,38,38,0.07)':'rgba(28,25,23,0.05)'};padding:1px 4px;border-radius:3px;font-family:'JetBrains Mono';">● ${p}</span>
              </div>`).join('')}
          </div>
          <div style="background:#fff;border:1px solid #E7E5E4;border-radius:8px;padding:8px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
              <span style="font-size:6.5px;font-weight:700;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.08em;">HOW ARE YOU</span>
              <span style="font-size:6.5px;color:#A8A29E;font-family:'JetBrains Mono';">8:27 PM</span>
            </div>
            <div style="display:flex;gap:5px;margin-bottom:6px;">${[['#1C1917','focused'],['rgba(28,25,23,0.12)','calm'],['#16A34A','productive'],['rgba(28,25,23,0.09)','tired'],['rgba(28,25,23,0.06)','overwhelm']].map(([c,l],i) => `<div style="display:flex;flex-direction:column;align-items:center;gap:2px;"><span style="width:13px;height:13px;border-radius:50%;background:${c};border:1px solid rgba(28,25,23,0.1);display:block;${i===2?'box-shadow:0 0 0 2px rgba(22,163,74,0.35);':''}"></span><span style="font-size:5.5px;color:#78716C;font-family:'Hanken Grotesk';">${l}</span></div>`).join('')}</div>
            <div style="display:flex;align-items:center;gap:5px;">
              <span style="font-size:7.5px;color:#57534E;font-family:'Hanken Grotesk';">Energy</span>
              <div style="flex:1;height:3px;background:rgba(28,25,23,0.07);border-radius:2px;overflow:hidden;"><span style="display:block;width:70%;height:100%;background:#16A34A;border-radius:2px;"></span></div>
              <span style="font-size:8px;font-weight:600;color:#1C1917;font-family:'Hanken Grotesk';">7/10</span>
            </div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;flex:1;min-height:0;">
          <div style="background:#fff;border:1px solid #E7E5E4;border-radius:8px;padding:8px;overflow:hidden;">
            <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
              <span style="font-size:6.5px;font-weight:700;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.08em;">TODAY'S SCHEDULE</span>
              <span style="font-size:6.5px;color:#A8A29E;font-family:'JetBrains Mono';">Sat, Jun 27</span>
            </div>
            ${[['9:00 AM','Focus Block','Deep work','2h'],['11:30 AM','Team Standup','Sync','30m'],['1:00 PM','Lunch Break','Rest','1h'],['2:00 PM','Design Review','Project','1h']].map(([t,n,s,d]) => `
              <div style="display:flex;align-items:center;gap:5px;padding:3px 0;border-bottom:1px solid rgba(28,25,23,0.04);">
                <span style="font-size:6.5px;color:#A8A29E;font-family:'JetBrains Mono';flex:0 0 44px;">${t}</span>
                <div style="flex:1;min-width:0;"><span style="font-size:7.5px;font-weight:500;color:#1C1917;font-family:'Hanken Grotesk';display:block;white-space:nowrap;overflow:hidden;">${n}</span><span style="font-size:6.5px;color:#A8A29E;font-family:'Hanken Grotesk';">${s}</span></div>
                <span style="font-size:6.5px;color:#A8A29E;font-family:'JetBrains Mono';">${d}</span>
              </div>`).join('')}
          </div>
          <div style="display:flex;flex-direction:column;gap:7px;">
            <div style="background:#fff;border:1px solid #E7E5E4;border-radius:8px;padding:8px;flex:0 0 auto;">
              <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                <span style="font-size:6.5px;font-weight:700;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.08em;">HABITS</span>
                <span style="font-size:6.5px;color:#A8A29E;font-family:'JetBrains Mono';">This week</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;">
                <div><span style="font-size:8px;font-weight:500;color:#1C1917;font-family:'Hanken Grotesk';display:block;">Cycling · 3 day streak</span></div>
                <div style="display:flex;gap:2px;margin-left:auto;">${[1,1,1,0,0].map(a=>`<span style="width:10px;height:10px;border-radius:2px;background:${a?'#16A34A':'rgba(28,25,23,0.08)'};display:block;"></span>`).join('')}</div>
              </div>
            </div>
            <div style="background:#fff;border:1px solid #E7E5E4;border-radius:8px;padding:8px;flex:1;">
              <span style="font-size:6.5px;font-weight:700;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.08em;display:block;margin-bottom:4px;">REFLECTION · LAST 7 DAYS</span>
              <span style="font-size:7.5px;color:#57534E;font-family:'Hanken Grotesk';display:block;margin-bottom:7px;line-height:1.4;">You're building momentum. Keep protecting your focus time.</span>
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:3px;">
                ${[['6.5h','avg energy'],['4h 20m','deep work'],['71%','habit consistency']].map(([v,l]) => `<div><span style="font-size:12px;font-weight:700;color:#1C1917;display:block;font-family:'Bricolage Grotesque';">${v}</span><span style="font-size:5.5px;color:#A8A29E;font-family:'JetBrains Mono';">${l}</span></div>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>`;

    return /* html */`
      <style>
        @media (max-width:640px) {
          .los-hero { height: clamp(160px,48vw,220px) !important; }
          .los-hero-brand, .los-hero-tasks, .los-hero-habits, .los-hero-right { display: none !important; }
          .los-hero-center { left: 0 !important; right: 0 !important; border-radius: 0 !important; }
        }
      </style>
      <div class="los-hero" style="position:relative;width:100%;max-width:960px;height:clamp(220px,30vw,380px);">

        <!-- Left: branding + AI card -->
        <div class="los-hero-brand" style="position:absolute;left:0;top:0;bottom:0;width:21%;display:flex;flex-direction:column;justify-content:center;gap:10px;padding-right:8px;">
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
              <span style="width:clamp(20px,2.2vw,28px);height:clamp(20px,2.2vw,28px);border-radius:6px;background:#16A34A;flex:0 0 auto;display:flex;align-items:center;justify-content:center;font-size:clamp(10px,1.1vw,14px);color:#fff;font-weight:700;font-family:'Bricolage Grotesque';">L</span>
              <span style="font-size:clamp(13px,1.5vw,18px);font-weight:700;color:#fff;font-family:'Bricolage Grotesque';">Life OS</span>
            </div>
            <p style="font-size:clamp(10px,1.2vw,14px);font-weight:700;color:#fff;font-family:'Bricolage Grotesque';line-height:1.3;margin:0 0 5px;">Your productivity.<br><span style="color:#4ADE80;">Unified.</span></p>
            <p style="font-size:clamp(8px,0.9vw,11px);color:rgba(255,255,255,0.45);font-family:'Hanken Grotesk';line-height:1.5;margin:0 0 10px;">Plan better. Focus deeper.<br>Achieve more.</p>
            <div style="display:flex;flex-wrap:wrap;gap:4px;">
              ${['Tasks','Calendar','Habits','Notes','Insights','Ada'].map(n=>`<span style="font-size:clamp(7px,0.75vw,9px);padding:2px 7px;border-radius:100px;border:1px solid rgba(255,255,255,0.14);color:rgba(255,255,255,0.5);font-family:'Hanken Grotesk';">${n}</span>`).join('')}
            </div>
          </div>
          <div style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.11);border-radius:10px;padding:8px 10px;">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
              <span style="font-size:clamp(8px,1vw,11px);color:#4ADE80;">✦</span>
              <span style="font-size:clamp(8px,1vw,11px);font-weight:600;color:#fff;font-family:'Bricolage Grotesque';">AI Assistant</span>
            </div>
            <p style="font-size:clamp(7px,0.8vw,9px);color:rgba(255,255,255,0.5);font-family:'Hanken Grotesk';margin:0;line-height:1.5;">Your afternoon is open.<br>Want to schedule deep work?</p>
          </div>
        </div>

        <!-- Tasks floating card -->
        <div class="los-hero-tasks" style="position:absolute;left:22%;top:4%;width:15%;background:#fff;border:1px solid #E7E5E4;border-radius:10px;overflow:hidden;box-shadow:0 14px 40px rgba(0,0,0,0.35);">
          <div style="padding:7px 9px;border-bottom:1px solid #E7E5E4;">
            <span style="font-size:6.5px;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.08em;display:block;">WORKSPACE</span>
            <span style="font-size:clamp(9px,1.1vw,13px);font-weight:700;color:#1C1917;font-family:'Bricolage Grotesque';">Tasks</span>
          </div>
          <div style="padding:7px 9px;">
            <div style="display:flex;gap:4px;margin-bottom:6px;">
              <span style="font-size:7px;background:#1C1917;color:#fff;padding:2px 7px;border-radius:100px;font-family:'Hanken Grotesk';">Ada's picks</span>
              <span style="font-size:7px;color:#57534E;border:1px solid #E7E5E4;padding:2px 7px;border-radius:100px;font-family:'Hanken Grotesk';">Personal</span>
            </div>
            <span style="font-size:6.5px;color:#A8A29E;font-family:'JetBrains Mono';display:block;margin-bottom:5px;">This week · 2</span>
            ${[['Complete LifeOS Landing Page'],['Review Investor Deck']].map(([t])=>`
              <div style="display:flex;align-items:center;gap:5px;padding:4px 0;border-bottom:1px solid rgba(28,25,23,0.04);">
                <span style="width:9px;height:9px;border-radius:2px;border:1.5px solid #D6D3D1;flex:0 0 auto;"></span>
                <span style="font-size:7.5px;color:#1C1917;font-family:'Hanken Grotesk';overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${t}</span>
              </div>`).join('')}
          </div>
        </div>

        <!-- Habits floating card -->
        <div class="los-hero-habits" style="position:absolute;left:22%;bottom:4%;width:15%;background:#fff;border:1px solid #E7E5E4;border-radius:10px;overflow:hidden;box-shadow:0 14px 40px rgba(0,0,0,0.35);">
          <div style="padding:7px 9px;border-bottom:1px solid #E7E5E4;">
            <span style="font-size:6.5px;color:#A8A29E;font-family:'JetBrains Mono';letter-spacing:0.08em;display:block;">PRACTICE</span>
            <span style="font-size:clamp(9px,1.1vw,13px);font-weight:700;color:#1C1917;font-family:'Bricolage Grotesque';">Habits</span>
          </div>
          <div style="padding:7px 9px;">
            <span style="font-size:6.5px;font-weight:700;color:#A8A29E;font-family:'JetBrains Mono';display:block;margin-bottom:2px;">ACTIVE HABITS</span>
            <span style="font-size:clamp(16px,2vw,22px);font-weight:700;color:#1C1917;font-family:'Bricolage Grotesque';display:block;line-height:1;">3</span>
            <span style="font-size:7px;color:#A8A29E;font-family:'Hanken Grotesk';display:block;margin-bottom:6px;">tracked</span>
            <div style="border-top:1px solid #E7E5E4;padding-top:6px;">
              <span style="font-size:8px;font-weight:500;color:#1C1917;font-family:'Hanken Grotesk';display:block;">Cycling</span>
              <span style="font-size:6.5px;color:#A8A29E;font-family:'Hanken Grotesk';display:block;margin-bottom:4px;">every day · 3 day streak</span>
              <div style="display:flex;gap:2px;margin-bottom:4px;">${[1,1,1,0,0,0,0].map(a=>`<span style="width:clamp(9px,1vw,12px);height:clamp(9px,1vw,12px);border-radius:2px;background:${a?'#16A34A':'rgba(28,25,23,0.08)'};display:block;"></span>`).join('')}</div>
              <div style="display:flex;align-items:baseline;gap:3px;">
                <span style="font-size:clamp(11px,1.3vw,15px);font-weight:700;color:#1C1917;font-family:'Bricolage Grotesque';">60%</span>
                <span style="font-size:6.5px;color:#A8A29E;font-family:'Hanken Grotesk';">consistency</span>
              </div>
              <div style="height:3px;background:rgba(28,25,23,0.07);border-radius:2px;margin-top:4px;overflow:hidden;"><span style="display:block;width:60%;height:100%;background:#16A34A;border-radius:2px;"></span></div>
            </div>
          </div>
        </div>

        <!-- Center: main browser window -->
        <div class="los-hero-center" style="position:absolute;left:38%;top:0;bottom:0;right:22%;border-radius:12px;overflow:hidden;background:#FAFAF9;border:1px solid rgba(255,255,255,0.1);box-shadow:0 32px 80px -20px rgba(0,0,0,0.75);">
          ${Mockups.losChrome()}
          <div style="position:relative;height:calc(100% - 23px);overflow:hidden;">
            <div style="position:absolute;top:0;left:0;width:${P};height:${P};transform:scale(${S});transform-origin:top left;display:flex;">
              ${sidebar}
              ${todayMain}
            </div>
          </div>
        </div>

        <!-- Right: calendar + notes -->
        <div class="los-hero-right" style="position:absolute;right:0;top:0;bottom:0;width:21%;display:flex;flex-direction:column;gap:clamp(5px,0.8vw,10px);">
          <div style="flex:0 0 58%;background:#fff;border:1px solid rgba(255,255,255,0.1);border-radius:10px;overflow:hidden;box-shadow:0 14px 40px rgba(0,0,0,0.35);">
            <div style="padding:6px 9px;border-bottom:1px solid #E7E5E4;display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:clamp(7px,0.8vw,9px);color:#57534E;font-family:'JetBrains Mono';">‹ Today ›</span>
              <div style="display:flex;gap:3px;">
                <span style="font-size:6.5px;padding:2px 6px;border-radius:100px;background:#1C1917;color:#fff;font-family:'Hanken Grotesk';">Day</span>
                <span style="font-size:6.5px;padding:2px 6px;border-radius:100px;border:1px solid #E7E5E4;color:#57534E;font-family:'Hanken Grotesk';">Week</span>
              </div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);border-bottom:1px solid #E7E5E4;">
              ${[['Wed','24'],['Thu','25'],['Fri','26']].map(([d,n],i)=>`
                <div style="padding:4px;text-align:center;${i===2?'background:rgba(22,163,74,0.05);':''}">
                  <span style="font-size:6px;color:#A8A29E;display:block;font-family:'JetBrains Mono';">${d}</span>
                  <span style="font-size:clamp(10px,1.4vw,15px);font-weight:${i===2?700:500};color:${i===2?'#16A34A':'#1C1917'};font-family:'Bricolage Grotesque';">${n}</span>
                </div>`).join('')}
            </div>
            <div style="padding:6px 8px;display:flex;flex-direction:column;gap:5px;overflow:hidden;">
              ${[['Focus Block','9:00–11:00','#16A34A','rgba(22,163,74,0.08)'],['Team Standup','11:30–12:00','#1C1917','rgba(28,25,23,0.04)'],['Lunch Break','1:00–2:00','#1C1917','rgba(28,25,23,0.04)'],['Design Review','2:00–3:00','#1C1917','rgba(28,25,23,0.04)']].map(([n,t,tc,bg])=>`
                <div style="background:${bg};border-radius:6px;padding:4px 7px;border-left:2px solid ${tc};">
                  <span style="font-size:clamp(7px,0.85vw,9px);font-weight:500;color:#1C1917;font-family:'Hanken Grotesk';display:block;">${n}</span>
                  <span style="font-size:6px;color:#A8A29E;font-family:'JetBrains Mono';">${t}</span>
                </div>`).join('')}
            </div>
          </div>
          <div style="flex:1;background:#fff;border:1px solid rgba(255,255,255,0.1);border-radius:10px;overflow:hidden;box-shadow:0 12px 32px rgba(0,0,0,0.28);">
            <div style="padding:6px 9px;border-bottom:1px solid #E7E5E4;">
              <span style="font-size:clamp(7px,0.8vw,9px);color:#A8A29E;font-family:'Hanken Grotesk';">Search notes...</span>
            </div>
            <div style="padding:7px 9px;">
              <span style="font-size:clamp(7.5px,0.9vw,9.5px);font-weight:600;color:#1C1917;font-family:'Hanken Grotesk';display:block;margin-bottom:2px;">LifeOS ideas</span>
              <span style="font-size:6px;color:#A8A29E;font-family:'JetBrains Mono';display:block;margin-bottom:5px;">about 2 hours ago</span>
              ${['• New AI habit coach','• Weekly insights','• Smart focus timer'].map(l=>`<span style="font-size:clamp(7px,0.85vw,8.5px);color:#57534E;font-family:'Hanken Grotesk';display:block;line-height:1.6;">${l}</span>`).join('')}
            </div>
          </div>
        </div>

      </div>`;
  },

};
