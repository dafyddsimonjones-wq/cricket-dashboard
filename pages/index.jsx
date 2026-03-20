import { useState, useRef, useEffect } from "react";
import Head from "next/head";

// ─── Core data ────────────────────────────────────────────────────────────────

const TEAMS = [
  { name: "Nottinghamshire", short: "NOT", venue: "Trent Bridge",   status: "champions" },
  { name: "Surrey",          short: "SUR", venue: "The Kia Oval",   status: "" },
  { name: "Hampshire",       short: "HAM", venue: "Utilita Bowl",   status: "" },
  { name: "Essex",           short: "ESS", venue: "Chelmsford",     status: "" },
  { name: "Yorkshire",       short: "YOR", venue: "Headingley",     status: "" },
  { name: "Sussex",          short: "SUS", venue: "Hove",           status: "" },
  { name: "Warwickshire",    short: "WAR", venue: "Edgbaston",      status: "" },
  { name: "Somerset",        short: "SOM", venue: "Taunton",        status: "" },
  { name: "Glamorgan",       short: "GLA", venue: "Sophia Gardens", status: "promoted" },
  { name: "Leicestershire",  short: "LEI", venue: "Grace Road",     status: "promoted" },
];

const TEAM_COLOURS = {
  Nottinghamshire:"#1a5c28", Surrey:"#00308f", Hampshire:"#1a1f6e",
  Essex:"#b01020", Yorkshire:"#004080", Sussex:"#002570",
  Warwickshire:"#002050", Somerset:"#212a5e", Glamorgan:"#004fa3",
  Leicestershire:"#005a30",
};

const FIXTURES = [
  { round:1, dates:"3–6 Apr", matches:[
    { home:"Warwickshire",   away:"Surrey",          venue:"Edgbaston" },
    { home:"Hampshire",      away:"Essex",           venue:"Utilita Bowl" },
    { home:"Glamorgan",      away:"Yorkshire",       venue:"Sophia Gardens" },
    { home:"Leicestershire", away:"Sussex",          venue:"Grace Road" },
    { home:"Somerset",       away:"Nottinghamshire", venue:"Taunton" },
  ]},
  { round:2, dates:"10–13 Apr", matches:[
    { home:"Essex",           away:"Somerset",       venue:"Chelmsford" },
    { home:"Sussex",          away:"Warwickshire",   venue:"Hove" },
    { home:"Yorkshire",       away:"Hampshire",      venue:"Headingley" },
    { home:"Surrey",          away:"Leicestershire", venue:"The Kia Oval" },
    { home:"Nottinghamshire", away:"Glamorgan",      venue:"Trent Bridge" },
  ]},
  { round:3, dates:"17–20 Apr", matches:[
    { home:"Hampshire",    away:"Somerset",       venue:"Utilita Bowl" },
    { home:"Warwickshire", away:"Essex",          venue:"Edgbaston" },
    { home:"Yorkshire",    away:"Sussex",         venue:"Headingley" },
    { home:"Surrey",       away:"Essex",          venue:"The Kia Oval" },
    { home:"Glamorgan",    away:"Leicestershire", venue:"Sophia Gardens" },
  ]},
  { round:4, dates:"24–27 Apr", matches:[
    { home:"Surrey",          away:"Sussex",          venue:"The Kia Oval" },
    { home:"Hampshire",       away:"Glamorgan",       venue:"Utilita Bowl" },
    { home:"Somerset",        away:"Yorkshire",       venue:"Taunton" },
    { home:"Leicestershire",  away:"Nottinghamshire", venue:"Grace Road" },
    { home:"Essex",           away:"Hampshire",       venue:"Chelmsford" },
  ]},
  { round:5, dates:"1–4 May", matches:[
    { home:"Warwickshire",    away:"Yorkshire",      venue:"Edgbaston" },
    { home:"Nottinghamshire", away:"Surrey",         venue:"Trent Bridge" },
    { home:"Glamorgan",       away:"Somerset",       venue:"Sophia Gardens" },
    { home:"Sussex",          away:"Leicestershire", venue:"Hove" },
  ]},
  { round:6, dates:"8–11 May", matches:[
    { home:"Essex",        away:"Leicestershire",  venue:"Chelmsford" },
    { home:"Hampshire",    away:"Nottinghamshire", venue:"Utilita Bowl" },
    { home:"Warwickshire", away:"Glamorgan",       venue:"Edgbaston" },
    { home:"Yorkshire",    away:"Surrey",          venue:"Headingley" },
    { home:"Somerset",     away:"Sussex",          venue:"Taunton" },
  ]},
  { round:7, dates:"22–25 May", matches:[
    { home:"Surrey",          away:"Glamorgan",      venue:"The Kia Oval" },
    { home:"Sussex",          away:"Somerset",       venue:"Hove" },
    { home:"Essex",           away:"Yorkshire",      venue:"Chelmsford" },
    { home:"Nottinghamshire", away:"Warwickshire",   venue:"Trent Bridge" },
    { home:"Hampshire",       away:"Leicestershire", venue:"Utilita Bowl" },
  ]},
  { round:8, dates:"29 May–1 Jun", matches:[
    { home:"Yorkshire",       away:"Glamorgan",      venue:"Headingley" },
    { home:"Leicestershire",  away:"Essex",          venue:"Grace Road" },
    { home:"Warwickshire",    away:"Hampshire",      venue:"Edgbaston" },
    { home:"Somerset",        away:"Surrey",         venue:"Taunton" },
    { home:"Sussex",          away:"Nottinghamshire",venue:"Hove" },
  ]},
];

const PLACEHOLDER_COMMENTARY = [
  { id:"m1", home:"Warwickshire", away:"Surrey", venue:"Edgbaston", round:1, dates:"3–6 Apr",
    status:"preview", scores:{home:null,away:null}, result:null,
    summary:"Season opener at Edgbaston. Surrey arrive as one of the pre-season favourites but Warwickshire's seam attack on a lively April pitch could make this a close contest. Kyle Abbott is expected to lead Hampshire's seam attack next door at the Utilita Bowl." },
  { id:"m2", home:"Hampshire", away:"Essex", venue:"Utilita Bowl", round:1, dates:"3–6 Apr",
    status:"preview", scores:{home:null,away:null}, result:null,
    summary:"Hampshire host Essex in what should be a competitive four-day contest. Abbott versus Porter — two of the division's best seamers going head to head." },
  { id:"m3", home:"Glamorgan", away:"Yorkshire", venue:"Sophia Gardens", round:1, dates:"3–6 Apr",
    status:"preview", scores:{home:null,away:null}, result:null,
    summary:"Glamorgan's first home match back in Division One. GCH Hill and CJ White will give Yorkshire's attack real teeth, testing whether the promoted side's batting can cope at the higher level." },
  { id:"m4", home:"Leicestershire", away:"Sussex", venue:"Grace Road", round:1, dates:"3–6 Apr",
    status:"preview", scores:{home:null,away:null}, result:null,
    summary:"Two sides with plenty to prove — Leicestershire defending Division One status on home turf, Sussex with Coles and Robinson giving them genuine match-winning potential." },
  { id:"m5", home:"Somerset", away:"Nottinghamshire", venue:"Taunton", round:1, dates:"3–6 Apr",
    status:"preview", scores:{home:null,away:null}, result:null,
    summary:"The title defence begins at Taunton. Jack Leach will be crucial on a pitch that tends to spin by day three — Nottinghamshire will look to bat first and bat long." },
];

// ─── Design tokens ────────────────────────────────────────────────────────────

const T = {
  bg:"#f7f9f7", surface:"#ffffff", border:"#e4ede4", borderMid:"#ccdccc",
  accent:"#3a8a52", accentLight:"#eaf4ec", accentMid:"#b8d9be",
  text:"#111c11", textMid:"#456045", textSub:"#7a947a", textFaint:"#b0c8b0",
  gold:"#a07820", goldBg:"#fdf6e3",
  shadow:"0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)",
  shadowHover:"0 2px 4px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08)",
  radius:"10px", font:"'Montserrat', sans-serif",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function RolePill({ role }) {
  const r = (role||"").toLowerCase();
  let bg, color;
  if (r.includes("keeper"))                                             { bg="#e8f5e9"; color="#2e7d32"; }
  else if (r.includes("all"))                                           { bg="#fff3e0"; color="#bf360c"; }
  else if (r.includes("bowler") || r.includes("seam")||r.includes("spin")) { bg="#fce4ec"; color="#880e4f"; }
  else                                                                  { bg="#e8eaf6"; color="#283593"; }
  return <span style={{ fontSize:"0.58rem", fontWeight:700, padding:"0.18rem 0.55rem", borderRadius:4, background:bg, color, letterSpacing:"0.04em", whiteSpace:"nowrap" }}>{role}</span>;
}

function StatusBadge({ status }) {
  if (status==="live")   return <span style={{ fontSize:"0.52rem", fontWeight:800, padding:"0.15rem 0.5rem", borderRadius:4, background:"#fef2f2", color:"#dc2626", border:"1px solid #fecaca", letterSpacing:"0.1em" }}>● LIVE</span>;
  if (status==="stumps") return <span style={{ fontSize:"0.52rem", fontWeight:700, padding:"0.15rem 0.5rem", borderRadius:4, background:"#fff8e1", color:"#b45309", border:"1px solid #fcd34d", letterSpacing:"0.1em" }}>STUMPS</span>;
  if (status==="result") return <span style={{ fontSize:"0.52rem", fontWeight:700, padding:"0.15rem 0.5rem", borderRadius:4, background:T.accentLight, color:T.accent, border:`1px solid ${T.accentMid}`, letterSpacing:"0.1em" }}>RESULT</span>;
  return <span style={{ fontSize:"0.52rem", fontWeight:700, padding:"0.15rem 0.5rem", borderRadius:4, background:T.bg, color:T.textSub, border:`1px solid ${T.border}`, letterSpacing:"0.1em" }}>PREVIEW</span>;
}

// ─── Commentary Tab ───────────────────────────────────────────────────────────

function CommentaryTab({ myTeam }) {
  const [selectedRound, setSelectedRound] = useState(1);
  const [expandedMatch, setExpandedMatch] = useState(null);
  const roundMatches = PLACEHOLDER_COMMENTARY.filter(m => m.round===selectedRound);

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:"0.35rem", marginBottom:"2rem", flexWrap:"wrap" }}>
        <span style={{ fontSize:"0.56rem", fontWeight:700, color:T.textFaint, letterSpacing:"0.22em", textTransform:"uppercase", marginRight:"0.5rem" }}>Round</span>
        {FIXTURES.map(f => (
          <button key={f.round} onClick={() => { setSelectedRound(f.round); setExpandedMatch(null); }}
            style={{ width:34, height:34, borderRadius:"50%", border:selectedRound===f.round?`2px solid ${T.accent}`:`1px solid ${T.borderMid}`, background:selectedRound===f.round?T.accentLight:T.surface, color:selectedRound===f.round?T.accent:T.textSub, fontSize:"0.72rem", fontWeight:700, cursor:"pointer", fontFamily:T.font, transition:"all 0.15s" }}>
            {f.round}
          </button>
        ))}
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", padding:"0.85rem 1.1rem", background:"#fffbeb", border:"1px solid #fcd34d", borderRadius:T.radius, marginBottom:"1.5rem" }}>
        <span style={{ fontSize:"1rem" }}>⚡</span>
        <div>
          <div style={{ fontSize:"0.62rem", fontWeight:700, color:"#92400e" }}>Live data feed not yet connected</div>
          <div style={{ fontSize:"0.65rem", color:"#b45309", fontWeight:500, marginTop:"0.1rem" }}>
            Match previews shown below. Live scores and ball-by-ball will appear here once wired to a data source.
          </div>
        </div>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
        {roundMatches.length===0 ? (
          <div style={{ textAlign:"center", padding:"3rem", color:T.textSub, fontSize:"0.78rem" }}>No commentary data for round {selectedRound} yet.</div>
        ) : roundMatches.map(match => {
          const isMyMatch = myTeam && (match.home===myTeam||match.away===myTeam);
          const isExpanded = expandedMatch===match.id;
          return (
            <div key={match.id} style={{ background:T.surface, border:`1px solid ${isMyMatch?T.accentMid:T.border}`, borderLeft:`3px solid ${isMyMatch?T.accent:T.border}`, borderRadius:T.radius, overflow:"hidden", boxShadow:isMyMatch?`0 2px 12px rgba(58,138,82,0.08)`:T.shadow }}>
              <div onClick={() => setExpandedMatch(isExpanded?null:match.id)}
                style={{ padding:"1rem 1.25rem", cursor:"pointer", display:"grid", gridTemplateColumns:"1fr auto 1fr auto", alignItems:"center", gap:"0.75rem" }}>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:"0.9rem", fontWeight:match.home===myTeam?800:700, color:match.home===myTeam?T.accent:T.text }}>{match.home}</div>
                  <div style={{ fontSize:"0.56rem", color:T.textFaint, letterSpacing:"0.12em", fontWeight:600 }}>{TEAMS.find(t=>t.name===match.home)?.short}</div>
                </div>
                <div style={{ textAlign:"center", minWidth:80 }}>
                  <div style={{ fontSize:"0.55rem", fontWeight:700, color:T.textFaint, letterSpacing:"0.1em", marginBottom:"0.25rem" }}>VS</div>
                  <div style={{ fontSize:"0.52rem", color:T.textFaint, marginBottom:"0.3rem" }}>{match.venue}</div>
                  <StatusBadge status={match.status} />
                </div>
                <div>
                  <div style={{ fontSize:"0.9rem", fontWeight:match.away===myTeam?800:700, color:match.away===myTeam?T.accent:T.text }}>{match.away}</div>
                  <div style={{ fontSize:"0.56rem", color:T.textFaint, letterSpacing:"0.12em", fontWeight:600 }}>{TEAMS.find(t=>t.name===match.away)?.short}</div>
                </div>
                <div style={{ fontSize:"0.65rem", color:T.textFaint }}>{isExpanded?"▲":"▼"}</div>
              </div>
              {isExpanded && (
                <div style={{ borderTop:`1px solid ${T.border}`, padding:"1rem 1.25rem", background:T.bg }}>
                  <div style={{ fontSize:"0.52rem", fontWeight:800, color:T.textSub, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:"0.4rem" }}>Match Preview</div>
                  <p style={{ fontSize:"0.75rem", color:T.textMid, fontWeight:500, lineHeight:1.7, margin:0 }}>{match.summary}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Calendar Tab ─────────────────────────────────────────────────────────────

function CalendarTab({ myTeam }) {
  const [view, setView] = useState("calendar"); // calendar | list
  const [selectedMonth, setSelectedMonth] = useState(3); // 0=Apr

  const allMatches = FIXTURES.flatMap(f =>
    f.matches.map(m => ({ ...m, round:f.round, dates:f.dates }))
  );

  const myMatches = myTeam
    ? allMatches.filter(m => m.home===myTeam||m.away===myTeam)
    : allMatches;

  // Parse start date from dates string
  const parseDate = (dates) => {
    const months = { Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8 };
    const parts = dates.split(" ");
    const day = parseInt(parts[0].split("–")[0]);
    const month = months[parts[1]] ?? 3;
    return { day, month };
  };

  const months = [
    { idx:3, name:"April" },
    { idx:4, name:"May" },
    { idx:5, name:"June" },
    { idx:6, name:"July" },
    { idx:7, name:"August" },
    { idx:8, name:"September" },
  ];

  const monthMatches = myMatches.filter(m => {
    const { month } = parseDate(m.dates);
    return month === selectedMonth;
  });

  return (
    <div>
      {/* Header controls */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.5rem", flexWrap:"wrap", gap:"0.75rem" }}>
        <div>
          <h2 style={{ fontSize:"1rem", fontWeight:800, color:T.text, marginBottom:"0.2rem" }}>
            {myTeam ? `${myTeam} — Fixtures 2026` : "All Fixtures 2026"}
          </h2>
          <p style={{ fontSize:"0.68rem", color:T.textSub, fontWeight:500 }}>
            {myTeam ? `${myMatches.length} matches this season` : "Select a team to filter"}
          </p>
        </div>

        {/* View toggle */}
        <div style={{ display:"flex", gap:"0", border:`1px solid ${T.borderMid}`, borderRadius:8, overflow:"hidden" }}>
          {["calendar","list"].map(v => (
            <button key={v} onClick={() => setView(v)}
              style={{ padding:"0.45rem 0.85rem", background:view===v?T.accent:T.surface, color:view===v?"#fff":T.textSub, border:"none", cursor:"pointer", fontFamily:T.font, fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", transition:"all 0.15s" }}>
              {v==="calendar" ? "📅 Calendar" : "☰ List"}
            </button>
          ))}
        </div>
      </div>

      {view==="calendar" && (
        <div>
          {/* Month tabs */}
          <div style={{ display:"flex", gap:"0.35rem", marginBottom:"1.5rem", flexWrap:"wrap" }}>
            {months.map(m => {
              const count = myMatches.filter(match => parseDate(match.dates).month===m.idx).length;
              return (
                <button key={m.idx} onClick={() => setSelectedMonth(m.idx)}
                  style={{ padding:"0.45rem 0.85rem", borderRadius:20, border:selectedMonth===m.idx?`2px solid ${T.accent}`:`1px solid ${T.borderMid}`, background:selectedMonth===m.idx?T.accentLight:T.surface, color:selectedMonth===m.idx?T.accent:T.textSub, fontSize:"0.68rem", fontWeight:700, cursor:"pointer", fontFamily:T.font, transition:"all 0.15s" }}>
                  {m.name} {count>0 && <span style={{ fontSize:"0.55rem", background:selectedMonth===m.idx?T.accent:T.borderMid, color:selectedMonth===m.idx?"#fff":T.textSub, borderRadius:10, padding:"0.05rem 0.35rem", marginLeft:"0.3rem" }}>{count}</span>}
                </button>
              );
            })}
          </div>

          {/* Month view */}
          {monthMatches.length === 0 ? (
            <div style={{ textAlign:"center", padding:"3rem", color:T.textSub, fontSize:"0.78rem", background:T.surface, borderRadius:T.radius, border:`1px solid ${T.border}` }}>
              {myTeam ? `No ${myTeam} matches in ${months.find(m=>m.idx===selectedMonth)?.name}` : "No matches this month"}
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
              {monthMatches.map((m, i) => {
                const isHome = m.home === myTeam;
                const opp    = isHome ? m.away : m.home;
                const tc     = TEAM_COLOURS[myTeam] || T.accent;
                return (
                  <div key={i} style={{ background:T.surface, border:`1px solid ${T.border}`, borderLeft:`4px solid ${myTeam ? tc : T.borderMid}`, borderRadius:T.radius, padding:"1rem 1.25rem", display:"flex", justifyContent:"space-between", alignItems:"center", boxShadow:T.shadow }}>
                    <div>
                      <div style={{ fontSize:"0.6rem", fontWeight:700, color:T.textFaint, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:"0.25rem" }}>
                        Round {m.round} · {m.dates}
                      </div>
                      <div style={{ fontSize:"0.95rem", fontWeight:800, color:T.text }}>
                        {myTeam ? (
                          <>{isHome ? "vs" : "@"} <span style={{ color: TEAM_COLOURS[opp]||T.accent }}>{opp}</span></>
                        ) : (
                          <>{m.home} <span style={{ color:T.textSub, fontWeight:500 }}>vs</span> {m.away}</>
                        )}
                      </div>
                      <div style={{ fontSize:"0.68rem", color:T.textSub, marginTop:"0.2rem", fontWeight:500 }}>
                        {m.venue} {myTeam && <span style={{ fontSize:"0.6rem", background:isHome?T.accentLight:"#f0f0f0", color:isHome?T.accent:T.textSub, padding:"0.1rem 0.4rem", borderRadius:4, marginLeft:"0.4rem", fontWeight:700 }}>{isHome?"HOME":"AWAY"}</span>}
                      </div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:"0.62rem", color:T.textFaint, fontWeight:600 }}>4-day match</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {view==="list" && (
        <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:T.radius, overflow:"hidden", boxShadow:T.shadow }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ background:T.bg, borderBottom:`2px solid ${T.border}` }}>
                {["Rnd","Dates","Home","Away","Venue"].map(h => (
                  <th key={h} style={{ padding:"0.75rem 1rem", textAlign:"left", fontSize:"0.56rem", fontWeight:800, color:T.textSub, letterSpacing:"0.18em", textTransform:"uppercase", fontFamily:T.font }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {myMatches.map((m, i) => {
                const isMyGame = myTeam && (m.home===myTeam||m.away===myTeam);
                return (
                  <tr key={i} style={{ borderBottom:`1px solid ${T.border}`, background:isMyGame?T.accentLight:i%2===0?T.surface:T.bg }}>
                    <td style={{ padding:"0.8rem 1rem", fontSize:"0.72rem", fontWeight:700, color:T.textSub }}>{m.round}</td>
                    <td style={{ padding:"0.8rem 1rem", fontSize:"0.72rem", color:T.textMid, fontWeight:600 }}>{m.dates}</td>
                    <td style={{ padding:"0.8rem 1rem", fontSize:"0.8rem", fontWeight:m.home===myTeam?800:600, color:m.home===myTeam?T.accent:T.text }}>{m.home}</td>
                    <td style={{ padding:"0.8rem 1rem", fontSize:"0.8rem", fontWeight:m.away===myTeam?800:600, color:m.away===myTeam?T.accent:T.text }}>{m.away}</td>
                    <td style={{ padding:"0.8rem 1rem", fontSize:"0.68rem", color:T.textSub }}>{m.venue}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── My Team Tab ──────────────────────────────────────────────────────────────

function MyTeamTab({ team }) {
  const [squad,       setSquad]       = useState([]);
  const [squadStatus, setSquadStatus] = useState("idle"); // idle | loading | done | error
  const [squadError,  setSquadError]  = useState("");
  const [liveXI,      setLiveXI]      = useState([]);
  const [changedRows, setChangedRows] = useState(new Set());
  const [chatHistory, setChatHistory] = useState([]);
  const [chatInput,   setChatInput]   = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [corrections, setCorrections] = useState([]);
  const chatBottomRef = useRef(null);

  // Load squad from Supabase when team changes
  useEffect(() => {
    if (!team) return;
    setSquadStatus("loading");
    setSquadError("");
    setSquad([]);
    setLiveXI([]);
    setChangedRows(new Set());
    setChatHistory([]);
    setChatInput("");
    setCorrections([]);

    fetch(`/api/squad?team=${encodeURIComponent(team)}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        const players = data.players || [];
        setSquad(players);
        setSquadStatus("done");

        // Build a sensible default XI from the squad
        const xi = buildDefaultXI(players);
        setLiveXI(xi);

        setChatHistory([{
          role:"assistant",
          content:`Squad loaded for ${team} — ${players.length} players from the 2025 season. I've put together a likely XI based on last year's appearances. Tell me about any changes for 2026 and we can refine it together.`
        }]);
      })
      .catch(e => {
        setSquadError(e.message);
        setSquadStatus("error");
      });
  }, [team]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [chatHistory, chatLoading]);

  const buildDefaultXI = (players) => {
    // Sort by matches played then runs, pick 11
    const sorted = [...players].sort((a,b) => b.matches_2025 - a.matches_2025 || b.batting_runs - a.batting_runs);
    const keepers    = sorted.filter(p => p.role==="Keeper-Batter").slice(0,1);
    const batters    = sorted.filter(p => p.role==="Batter").slice(0,4);
    const allRounders= sorted.filter(p => p.role==="All-rounder").slice(0,3);
    const bowlers    = sorted.filter(p => p.role==="Bowler").slice(0,3);
    const xi = [...keepers, ...batters, ...allRounders, ...bowlers].slice(0,11);
    // Pad if needed
    if (xi.length < 11) {
      const inXI = new Set(xi.map(p=>p.name));
      const extra = sorted.filter(p=>!inXI.has(p.name));
      xi.push(...extra.slice(0, 11-xi.length));
    }
    return xi.map(p => ({ name:p.name, role:p.role, note:"" }));
  };

  const applyXIUpdate = (xiUpdate) => {
    if (!Array.isArray(xiUpdate)) return;
    const newXI = [...liveXI];
    const changed = new Set();
    xiUpdate.forEach(({ position, name, role, note }) => {
      const idx = position-1;
      if (idx>=0 && idx<11) { newXI[idx]={name, role, note:note||""}; changed.add(idx); }
    });
    setLiveXI(newXI);
    setChangedRows(changed);
    setTimeout(() => setChangedRows(new Set()), 3000);
  };

  const applyCorrections = (newCorr) => {
    if (!Array.isArray(newCorr)||newCorr.length===0) return;
    setCorrections(prev => {
      const existing = new Set(prev.map(c=>c.toLowerCase()));
      const toAdd = newCorr.filter(c=>!existing.has(c.toLowerCase()));
      return toAdd.length>0 ? [...prev,...toAdd] : prev;
    });
  };

  const send = async () => {
    const msg = chatInput.trim();
    if (!msg||chatLoading) return;
    setChatInput("");
    const updated = [...chatHistory, { role:"user", content:msg }];
    setChatHistory(updated);
    setChatLoading(true);

    try {
      const teamObj = TEAMS.find(t=>t.name===team);
      const xi = liveXI.map((p,i)=>`${i+1}. ${p.name} (${p.role}${p.note?", "+p.note:""})`).join("\n");

      // Build squad context from real 2025 data
      const squadCtx = squad.slice(0,20).map(p => {
        const bat = `${p.batting_runs} runs @ ${p.batting_average}`;
        const bowl = p.bowling_wickets>0 ? `, ${p.bowling_wickets} wkts @ ${p.bowling_average}` : "";
        return `  ${p.name} (${p.role}): ${p.matches_2025} matches, ${bat}${bowl}`;
      }).join("\n");

      const corrBlock = corrections.length>0
        ? `\nCRITICAL — CONFIRMED FACTS (override training data, never contradict):\n${corrections.map(c=>`• ${c}`).join("\n")}\n`
        : "";

      const system = `You are an expert county cricket analyst with deep knowledge of ${team}. You are working from real 2025 County Championship data.
${corrBlock}
CURRENT LIVE XI:
${xi}

FULL 2025 SQUAD (real stats from Cricsheet data):
${squadCtx}

VENUE: ${teamObj?.venue}

When suggesting or agreeing with XI changes, append:
%%XI_UPDATE%%
[{"position":1,"name":"Name","role":"Role","note":""}]
%%END%%

When the user tells you a new fact overriding training data, append:
%%CORRECTIONS%%
["Fact one"]
%%END_CORRECTIONS%%

Keep responses to 2–4 sentences. You know these players' actual 2025 numbers — use them. Be specific, be direct.`;

      const res = await fetch("/api/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ system, messages: updated.map(m=>({role:m.role,content:m.content})) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error||"Request failed");
      if (data.xiUpdate) applyXIUpdate(data.xiUpdate);
      if (data.corrections) applyCorrections(data.corrections);
      setChatHistory(prev => [...prev, { role:"assistant", content:data.text }]);
    } catch(e) {
      setChatHistory(prev => [...prev, { role:"assistant", content:`⚠️ ${e.message}` }]);
    } finally { setChatLoading(false); }
  };

  const handleKey = e => { if (e.key==="Enter"&&!e.shiftKey) { e.preventDefault(); send(); } };
  const resetXI = () => {
    setLiveXI(buildDefaultXI(squad));
    setChangedRows(new Set());
    setChatHistory(prev => [...prev, { role:"assistant", content:"XI reset to default selection based on 2025 appearances." }]);
  };
  const isModified = JSON.stringify(liveXI) !== JSON.stringify(buildDefaultXI(squad));

  if (!team) return (
    <div style={{ textAlign:"center", padding:"5rem 2rem" }}>
      <div style={{ fontSize:"0.72rem", color:T.textSub, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase" }}>No team selected</div>
      <div style={{ fontSize:"0.78rem", color:T.textFaint, marginTop:"0.5rem" }}>Use the dropdown above to choose your team</div>
    </div>
  );

  const tc = TEAM_COLOURS[team]||T.accent;
  const allF = FIXTURES.flatMap(f=>f.matches.map(m=>({...m,dates:f.dates,round:f.round})));
  const next = allF.find(m=>m.home===team||m.away===team);
  const opp  = next?(next.home===team?next.away:next.home):null;
  const teamObj = TEAMS.find(t=>t.name===team);
  const CHIPS = ["What if it rains on day one?","Case for 4 seamers?","How will the pitch play?","England call-up concerns?"];

  return (
    <>
      <style>{`
        @keyframes highlight-row{0%{background:#d4edda;}100%{background:transparent;}}
        .xi-changed{animation:highlight-row 3s ease-out forwards;}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
      `}</style>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 390px", gap:"1.5rem", alignItems:"start" }}>

        {/* ── Left panel ── */}
        <div style={{ display:"flex", flexDirection:"column", gap:"1.1rem" }}>

          {/* Team strip */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"1.3rem 1.6rem", background:T.surface, borderRadius:T.radius, border:`1px solid ${T.border}`, borderLeft:`4px solid ${tc}`, boxShadow:T.shadow }}>
            <div>
              <div style={{ fontSize:"0.52rem", fontWeight:700, color:T.textSub, letterSpacing:"0.25em", textTransform:"uppercase", marginBottom:"0.3rem" }}>My Team · 2026</div>
              <div style={{ fontSize:"1.5rem", fontWeight:800, color:T.text, letterSpacing:"-0.03em" }}>{team}</div>
              {next && <div style={{ fontSize:"0.68rem", color:T.textMid, marginTop:"0.3rem", fontWeight:500 }}>Next — <strong>vs {opp}</strong> · {next.venue} · {next.dates}</div>}
            </div>
            <div style={{ width:44, height:44, borderRadius:"50%", background:T.accentLight, border:`2px solid ${T.accentMid}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.66rem", fontWeight:800, color:T.accent }}>{teamObj?.short}</div>
          </div>

          {/* Squad loading states */}
          {squadStatus==="loading" && (
            <div style={{ textAlign:"center", padding:"2.5rem", background:T.surface, borderRadius:T.radius, border:`1px solid ${T.border}` }}>
              <div style={{ width:28, height:28, border:`2.5px solid ${T.accentLight}`, borderTop:`2.5px solid ${T.accent}`, borderRadius:"50%", margin:"0 auto 1rem", animation:"spin 0.7s linear infinite" }} />
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
              <div style={{ fontSize:"0.72rem", color:T.textSub }}>Loading {team} squad…</div>
            </div>
          )}

          {squadStatus==="error" && (
            <div style={{ background:"#fff8f8", border:"1px solid #f0cccc", borderRadius:T.radius, padding:"1.25rem 1.5rem" }}>
              <div style={{ fontSize:"0.78rem", fontWeight:700, color:"#b02020", marginBottom:"0.3rem" }}>Failed to load squad</div>
              <div style={{ fontSize:"0.65rem", color:"#c04040", fontFamily:"monospace" }}>{squadError}</div>
            </div>
          )}

          {squadStatus==="done" && (
            <>
              {/* Likely XI */}
              <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:T.radius, overflow:"hidden", boxShadow:T.shadow }}>
                <div style={{ padding:"0.85rem 1.3rem", borderBottom:`1px solid ${T.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"0.6rem" }}>
                    <span style={{ fontSize:"0.56rem", fontWeight:800, color:T.text, letterSpacing:"0.2em", textTransform:"uppercase" }}>Likely XI</span>
                    {isModified && <span style={{ fontSize:"0.5rem", fontWeight:700, background:"#fff3cd", color:"#856404", border:"1px solid #ffc107", padding:"0.1rem 0.45rem", borderRadius:4 }}>MODIFIED</span>}
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
                    {opp && <span style={{ fontSize:"0.62rem", color:T.textSub, fontWeight:600 }}>vs {opp} · {next?.dates}</span>}
                    {isModified && <button onClick={resetXI} style={{ fontSize:"0.55rem", fontWeight:700, color:T.textSub, background:"none", border:`1px solid ${T.borderMid}`, borderRadius:4, padding:"0.15rem 0.5rem", cursor:"pointer", fontFamily:T.font }}>Reset</button>}
                  </div>
                </div>
                {liveXI.map((p,i) => (
                  <div key={i} className={changedRows.has(i)?"xi-changed":""}
                    style={{ display:"grid", gridTemplateColumns:"32px 1fr auto", alignItems:"center", gap:"0.65rem", padding:"0.65rem 1.3rem", borderBottom:i<10?`1px solid ${T.border}`:"none", background:changedRows.has(i)?undefined:i%2===0?"#fff":T.bg }}>
                    <div style={{ width:22, height:22, borderRadius:"50%", background:changedRows.has(i)?"#28a745":T.accentLight, color:changedRows.has(i)?"#fff":T.accent, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.58rem", fontWeight:700, transition:"all 0.3s" }}>{i+1}</div>
                    <div>
                      <span style={{ fontSize:"0.82rem", fontWeight:700, color:T.text }}>{p.name}</span>
                      {p.note && <span style={{ fontSize:"0.58rem", color:T.textSub, fontWeight:500, marginLeft:"0.45rem" }}>{p.note}</span>}
                    </div>
                    <RolePill role={p.role} />
                  </div>
                ))}
              </div>

              {/* Full squad stats */}
              <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:T.radius, overflow:"hidden", boxShadow:T.shadow }}>
                <div style={{ padding:"0.85rem 1.3rem", borderBottom:`1px solid ${T.border}` }}>
                  <span style={{ fontSize:"0.56rem", fontWeight:800, color:T.text, letterSpacing:"0.2em", textTransform:"uppercase" }}>2025 Season Stats</span>
                  <span style={{ fontSize:"0.6rem", color:T.textSub, marginLeft:"0.75rem" }}>from Cricsheet ball-by-ball data</span>
                </div>
                <div style={{ overflowX:"auto" }}>
                  <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"0.75rem" }}>
                    <thead>
                      <tr style={{ background:T.bg, borderBottom:`1px solid ${T.border}` }}>
                        {["Player","Role","M","Runs","Avg","SR","Wkts","BAve"].map(h => (
                          <th key={h} style={{ padding:"0.55rem 0.85rem", textAlign:h==="Player"||h==="Role"?"left":"center", fontSize:"0.55rem", fontWeight:800, color:T.textSub, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:T.font, whiteSpace:"nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {squad.map((p,i) => (
                        <tr key={i} style={{ borderBottom:`1px solid ${T.border}`, background:i%2===0?T.surface:T.bg }}>
                          <td style={{ padding:"0.6rem 0.85rem", fontWeight:700, color:T.text, whiteSpace:"nowrap" }}>{p.name}</td>
                          <td style={{ padding:"0.6rem 0.85rem" }}><RolePill role={p.role} /></td>
                          <td style={{ padding:"0.6rem 0.85rem", textAlign:"center", color:T.textSub }}>{p.matches_2025}</td>
                          <td style={{ padding:"0.6rem 0.85rem", textAlign:"center", fontWeight:600, color:T.text }}>{p.batting_runs}</td>
                          <td style={{ padding:"0.6rem 0.85rem", textAlign:"center", color:T.textMid }}>{p.batting_average}</td>
                          <td style={{ padding:"0.6rem 0.85rem", textAlign:"center", color:T.textSub }}>{p.batting_strike_rate}</td>
                          <td style={{ padding:"0.6rem 0.85rem", textAlign:"center", color:p.bowling_wickets>0?T.text:T.textFaint, fontWeight:p.bowling_wickets>0?700:400 }}>{p.bowling_wickets||"—"}</td>
                          <td style={{ padding:"0.6rem 0.85rem", textAlign:"center", color:T.textMid }}>{p.bowling_average||"—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── Right: chat ── */}
        <div style={{ position:"sticky", top:"1.5rem", display:"flex", flexDirection:"column", background:T.surface, border:`1px solid ${T.border}`, borderRadius:T.radius, boxShadow:T.shadow, overflow:"hidden", height:"calc(100vh - 180px)", maxHeight:720 }}>
          <div style={{ padding:"0.9rem 1.1rem", borderBottom:`1px solid ${T.border}`, background:T.bg, flexShrink:0 }}>
            <div style={{ fontSize:"0.56rem", fontWeight:800, color:T.text, letterSpacing:"0.18em", textTransform:"uppercase" }}>Selection Chat</div>
            <div style={{ fontSize:"0.62rem", color:T.textSub, fontWeight:500, marginTop:"0.15rem" }}>Powered by 2025 Cricsheet data · XI updates live</div>
            {corrections.length>0 && (
              <div style={{ marginTop:"0.6rem", padding:"0.5rem 0.65rem", background:"#fffbeb", border:"1px solid #fcd34d", borderRadius:6 }}>
                <div style={{ fontSize:"0.5rem", fontWeight:800, color:"#92400e", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:"0.3rem" }}>Remembered</div>
                {corrections.map((c,i) => <div key={i} style={{ fontSize:"0.6rem", color:"#b45309", fontWeight:500 }}>• {c}</div>)}
              </div>
            )}
          </div>

          <div style={{ flex:1, overflowY:"auto", padding:"1rem", display:"flex", flexDirection:"column", gap:"0.85rem" }}>
            {chatHistory.map((msg,i) => (
              <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:msg.role==="user"?"flex-end":"flex-start" }}>
                <div style={{ fontSize:"0.52rem", fontWeight:700, color:T.textFaint, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.2rem", paddingLeft:msg.role==="assistant"?"0.2rem":0, paddingRight:msg.role==="user"?"0.2rem":0 }}>
                  {msg.role==="user"?"You":"Analyst"}
                </div>
                <div style={{ maxWidth:"90%", padding:"0.65rem 0.85rem", borderRadius:msg.role==="user"?"10px 10px 2px 10px":"10px 10px 10px 2px", background:msg.role==="user"?T.accent:T.bg, color:msg.role==="user"?"#fff":T.text, fontSize:"0.74rem", fontWeight:500, lineHeight:1.65, border:msg.role==="assistant"?`1px solid ${T.border}`:"none" }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div style={{ display:"flex", alignItems:"flex-start" }}>
                <div style={{ background:T.bg, border:`1px solid ${T.border}`, borderRadius:"10px 10px 10px 2px", padding:"0.65rem 0.85rem", display:"flex", gap:"4px", alignItems:"center" }}>
                  {[0,1,2].map(i => <div key={i} style={{ width:5, height:5, borderRadius:"50%", background:T.textFaint, animation:`bounce 1s ease-in-out ${i*0.15}s infinite` }} />)}
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {chatHistory.length<=1 && squadStatus==="done" && (
            <div style={{ padding:"0 0.85rem 0.6rem", display:"flex", gap:"0.4rem", flexWrap:"wrap" }}>
              {CHIPS.map(chip => (
                <button key={chip} onClick={() => setChatInput(chip)}
                  style={{ fontSize:"0.58rem", fontWeight:600, color:T.accent, background:T.accentLight, border:`1px solid ${T.accentMid}`, borderRadius:20, padding:"0.28rem 0.65rem", cursor:"pointer", fontFamily:T.font }}>
                  {chip}
                </button>
              ))}
            </div>
          )}

          <div style={{ padding:"0.7rem", borderTop:`1px solid ${T.border}`, display:"flex", gap:"0.5rem", flexShrink:0 }}>
            <textarea value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={handleKey}
              placeholder={squadStatus==="done" ? "e.g. Drop a batter, go with 4 seamers on a green pitch…" : "Loading squad…"}
              disabled={squadStatus!=="done"}
              rows={2}
              style={{ flex:1, resize:"none", border:`1px solid ${T.borderMid}`, borderRadius:8, padding:"0.5rem 0.7rem", fontSize:"0.7rem", fontFamily:T.font, color:T.text, outline:"none", lineHeight:1.5, background:T.bg, opacity:squadStatus==="done"?1:0.6 }}
            />
            <button onClick={send} disabled={!chatInput.trim()||chatLoading||squadStatus!=="done"}
              style={{ background:chatInput.trim()&&!chatLoading&&squadStatus==="done"?T.accent:T.accentLight, color:chatInput.trim()&&!chatLoading&&squadStatus==="done"?"#fff":T.textFaint, border:"none", borderRadius:8, padding:"0 0.9rem", cursor:chatInput.trim()&&!chatLoading&&squadStatus==="done"?"pointer":"default", fontFamily:T.font, fontSize:"0.68rem", fontWeight:700, transition:"all 0.15s", flexShrink:0 }}>
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [tab,    setTab]    = useState("fixtures");
  const [round,  setRound]  = useState(1);
  const [myTeam, setMyTeam] = useState("");
  const [ddOpen, setDdOpen] = useState(false);

  const curFixtures = FIXTURES.find(f=>f.round===round);
  const standings   = TEAMS.map(t=>({...t,p:0,w:0,d:0,l:0,bat:"-",bowl:"-",pts:0}));
  const selectTeam  = name => { setMyTeam(name); setDdOpen(false); setTab("myteam"); };
  const TABS = ["fixtures","standings","commentary","calendar","teams","myteam"];

  return (
    <>
      <Head>
        <title>County Championship Division I — 2026</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <style global jsx>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{background:${T.bg};font-family:${T.font};}
        .hov-card:hover{box-shadow:${T.shadowHover}!important;transform:translateY(-1px);}
        .hov-row:hover td{background:${T.accentLight}!important;}
        .hov-dd:hover{background:${T.accentLight}!important;}
        .tab-btn:hover{color:${T.accent}!important;}
        textarea:focus{border-color:${T.accent}!important;box-shadow:0 0 0 2px ${T.accentLight}!important;}
      `}</style>

      <div style={{ fontFamily:T.font, color:T.text, minHeight:"100vh", background:T.bg }}
           onClick={() => ddOpen&&setDdOpen(false)}>

        <div style={{ height:3, background:`linear-gradient(90deg,${T.accent},#6ab87e)` }} />

        <div style={{ background:T.surface, borderBottom:`1px solid ${T.border}` }}>
          <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 2rem", display:"flex", justifyContent:"space-between", alignItems:"center", height:34 }}>
            <span style={{ fontSize:"0.55rem", fontWeight:700, letterSpacing:"0.28em", textTransform:"uppercase", color:T.textSub }}>Rothesay County Championship 2026</span>
            <span style={{ fontSize:"0.55rem", color:T.textFaint }}>3 Apr – 27 Sep · Division I</span>
          </div>
        </div>

        <header style={{ background:T.surface, borderBottom:`1px solid ${T.border}` }}>
          <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 2rem" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"1.4rem 0 1.2rem", gap:"1rem", flexWrap:"wrap" }}>
              <div>
                <h1 style={{ fontSize:"clamp(1.2rem,3vw,1.85rem)", fontWeight:800, letterSpacing:"-0.035em", lineHeight:1.1, color:T.text }}>
                  County Championship<span style={{ color:T.accent }}> Division I</span>
                </h1>
                <p style={{ fontSize:"0.68rem", color:T.textSub, fontWeight:500, marginTop:"0.3rem" }}>10 teams · 70 matches · First-class cricket</p>
              </div>

              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }} onClick={e=>e.stopPropagation()}>
                <div style={{ position:"relative" }}>
                  <button onClick={() => setDdOpen(o=>!o)} style={{ display:"flex", alignItems:"center", gap:"0.5rem", padding:"0.58rem 1rem", background:myTeam?T.accent:T.surface, color:myTeam?"#fff":T.textMid, border:`1.5px solid ${myTeam?T.accent:T.borderMid}`, borderRadius:8, cursor:"pointer", fontFamily:T.font, fontSize:"0.72rem", fontWeight:700, whiteSpace:"nowrap", transition:"all 0.15s", boxShadow:myTeam?"0 2px 8px rgba(58,138,82,0.3)":"none" }}>
                    <span style={{ fontSize:"0.55rem" }}>▾</span>
                    {myTeam||"Select team"}
                  </button>
                  {ddOpen && (
                    <div style={{ position:"absolute", top:"calc(100% + 6px)", right:0, background:T.surface, border:`1px solid ${T.borderMid}`, borderRadius:10, boxShadow:"0 8px 32px rgba(0,0,0,0.13)", zIndex:300, width:240, overflow:"hidden" }}>
                      <div style={{ padding:"0.55rem 1rem 0.35rem", fontSize:"0.52rem", fontWeight:700, color:T.textFaint, letterSpacing:"0.22em", textTransform:"uppercase", borderBottom:`1px solid ${T.border}` }}>Division I</div>
                      {TEAMS.map(t => (
                        <div key={t.name} className="hov-dd" onClick={() => selectTeam(t.name)}
                          style={{ padding:"0.6rem 1rem", cursor:"pointer", display:"flex", alignItems:"center", gap:"0.65rem", background:myTeam===t.name?T.accentLight:"transparent", borderLeft:myTeam===t.name?`3px solid ${T.accent}`:"3px solid transparent", transition:"background 0.1s" }}>
                          <div style={{ width:8, height:8, borderRadius:"50%", background:TEAM_COLOURS[t.name], flexShrink:0 }} />
                          <div style={{ flex:1 }}>
                            <div style={{ fontSize:"0.76rem", fontWeight:700, color:T.text }}>{t.name}</div>
                            <div style={{ fontSize:"0.56rem", color:T.textSub, fontWeight:500 }}>{t.venue}</div>
                          </div>
                          {t.status==="champions" && <span style={{ fontSize:"0.48rem", background:T.goldBg, color:T.gold, padding:"0.1rem 0.35rem", borderRadius:3, fontWeight:700 }}>CHAMPS</span>}
                          {t.status==="promoted"  && <span style={{ fontSize:"0.48rem", background:T.accentLight, color:T.accent, padding:"0.1rem 0.35rem", borderRadius:3, fontWeight:700 }}>↑</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div style={{ padding:"0.5rem 1rem", background:T.accentLight, borderRadius:8, border:`1px solid ${T.accentMid}`, textAlign:"center" }}>
                  <div style={{ fontSize:"0.5rem", fontWeight:700, color:T.accent, letterSpacing:"0.2em", textTransform:"uppercase" }}>Opens in</div>
                  <div style={{ fontSize:"1rem", fontWeight:800, color:T.text, lineHeight:1.15 }}>14 days</div>
                </div>
              </div>
            </div>

            <div style={{ display:"flex", borderTop:`1px solid ${T.border}` }}>
              {TABS.map(t => (
                <button key={t} className="tab-btn" onClick={() => setTab(t)}
                  style={{ background:"none", border:"none", cursor:"pointer", padding:"0.72rem 1.1rem", color:tab===t?T.accent:T.textSub, borderBottom:tab===t?`2px solid ${T.accent}`:"2px solid transparent", fontSize:"0.63rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:T.font, marginBottom:"-1px", transition:"color 0.15s", whiteSpace:"nowrap" }}>
                  {t==="myteam"?"My Team":t}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main style={{ maxWidth:1200, margin:"0 auto", padding:"2.5rem 2rem" }}>

          {/* FIXTURES */}
          {tab==="fixtures" && (
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:"0.35rem", marginBottom:"2rem", flexWrap:"wrap" }}>
                <span style={{ fontSize:"0.56rem", fontWeight:700, color:T.textFaint, letterSpacing:"0.22em", textTransform:"uppercase", marginRight:"0.5rem" }}>Round</span>
                {FIXTURES.map(f => (
                  <button key={f.round} onClick={() => setRound(f.round)}
                    style={{ width:34, height:34, borderRadius:"50%", border:round===f.round?`2px solid ${T.accent}`:`1px solid ${T.borderMid}`, background:round===f.round?T.accentLight:T.surface, color:round===f.round?T.accent:T.textSub, fontSize:"0.72rem", fontWeight:700, cursor:"pointer", fontFamily:T.font, transition:"all 0.15s" }}>
                    {f.round}
                  </button>
                ))}
                <span style={{ fontSize:"0.63rem", color:T.textFaint }}>+ 6 more</span>
              </div>
              {curFixtures && <>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:"1.1rem" }}>
                  <h2 style={{ fontSize:"0.72rem", fontWeight:700, color:T.textSub, letterSpacing:"0.18em", textTransform:"uppercase" }}>Round {curFixtures.round}</h2>
                  <span style={{ fontSize:"0.72rem", fontWeight:700, color:T.accent }}>{curFixtures.dates}</span>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                  {curFixtures.matches.map((m,i) => {
                    const mine = myTeam&&(m.home===myTeam||m.away===myTeam);
                    return (
                      <div key={i} className="hov-card" style={{ background:T.surface, border:`1px solid ${mine?T.accentMid:T.border}`, borderLeft:`3px solid ${mine?T.accent:T.border}`, borderRadius:T.radius, padding:"1rem 1.5rem", display:"grid", gridTemplateColumns:"1fr 72px 1fr", alignItems:"center", gap:"1rem", boxShadow:mine?`0 2px 12px rgba(58,138,82,0.1)`:T.shadow, transition:"all 0.15s" }}>
                        <div style={{ textAlign:"right" }}>
                          <div style={{ fontSize:"0.88rem", fontWeight:m.home===myTeam?800:700, color:m.home===myTeam?T.accent:T.text }}>{m.home}</div>
                          <div style={{ fontSize:"0.56rem", color:T.textFaint, letterSpacing:"0.12em", fontWeight:600 }}>{TEAMS.find(t=>t.name===m.home)?.short}</div>
                        </div>
                        <div style={{ textAlign:"center" }}>
                          <div style={{ fontSize:"0.55rem", fontWeight:700, color:T.textFaint, letterSpacing:"0.1em", marginBottom:"0.2rem" }}>VS</div>
                          <div style={{ fontSize:"0.52rem", color:T.textFaint }}>{m.venue}</div>
                        </div>
                        <div>
                          <div style={{ fontSize:"0.88rem", fontWeight:m.away===myTeam?800:700, color:m.away===myTeam?T.accent:T.text }}>{m.away}</div>
                          <div style={{ fontSize:"0.56rem", color:T.textFaint, letterSpacing:"0.12em", fontWeight:600 }}>{TEAMS.find(t=>t.name===m.away)?.short}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ marginTop:"2rem", padding:"1rem 1.4rem", background:T.accentLight, border:`1px solid ${T.accentMid}`, borderRadius:T.radius, display:"flex", alignItems:"center", gap:"0.75rem" }}>
                  <div style={{ width:7, height:7, borderRadius:"50%", background:T.accent, flexShrink:0 }} />
                  <span style={{ fontSize:"0.7rem", color:T.textMid, fontWeight:500 }}><strong style={{ fontWeight:700, color:T.text }}>Season opens 3 April 2026</strong> · Edgbaston · Utilita Bowl · Sophia Gardens · Grace Road · Taunton</span>
                </div>
              </>}
            </div>
          )}

          {/* STANDINGS */}
          {tab==="standings" && (
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"1.5rem" }}>
                <div>
                  <h2 style={{ fontSize:"1rem", fontWeight:800, color:T.text, marginBottom:"0.2rem" }}>Points Table</h2>
                  <p style={{ fontSize:"0.68rem", color:T.textSub, fontWeight:500 }}>Season begins 3 April 2026 — updates as results come in</p>
                </div>
                <span style={{ fontSize:"0.56rem", fontWeight:700, padding:"0.28rem 0.75rem", background:T.accentLight, color:T.accent, border:`1px solid ${T.accentMid}`, borderRadius:20, letterSpacing:"0.14em", textTransform:"uppercase" }}>Pre-season</span>
              </div>
              <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:T.radius, overflow:"hidden", boxShadow:T.shadow }}>
                <table style={{ width:"100%", borderCollapse:"collapse" }}>
                  <thead>
                    <tr style={{ borderBottom:`2px solid ${T.border}` }}>
                      {["#","Team","P","W","D","L","Bat","Bowl","Pts"].map(h => (
                        <th key={h} style={{ padding:h==="Team"?"0.85rem 1rem 0.85rem 1.25rem":"0.85rem 1rem", textAlign:h==="Team"?"left":"center", fontSize:"0.56rem", fontWeight:800, color:T.textSub, letterSpacing:"0.2em", textTransform:"uppercase", fontFamily:T.font, background:T.bg }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((t,i) => (
                      <tr key={t.name} className="hov-row" style={{ borderBottom:`1px solid ${T.border}`, background:t.name===myTeam?T.accentLight:i%2===0?T.surface:T.bg }}>
                        <td style={{ padding:"0.9rem 1rem", textAlign:"center", fontSize:"0.68rem", color:T.textFaint, fontWeight:600 }}>{i+1}</td>
                        <td style={{ padding:"0.9rem 1rem 0.9rem 1.25rem" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:"0.65rem" }}>
                            <div style={{ width:3, height:18, borderRadius:2, background:TEAM_COLOURS[t.name], flexShrink:0 }} />
                            <span style={{ fontSize:"0.82rem", fontWeight:t.name===myTeam?800:700, color:t.name===myTeam?T.accent:T.text }}>{t.name}</span>
                            {t.name===myTeam        && <span style={{ fontSize:"0.48rem", fontWeight:700, padding:"0.1rem 0.4rem", borderRadius:3, background:T.accent, color:"#fff" }}>YOU</span>}
                            {t.status==="champions" && <span style={{ fontSize:"0.48rem", fontWeight:700, padding:"0.1rem 0.4rem", borderRadius:3, background:T.goldBg, color:T.gold }}>CHAMPS</span>}
                            {t.status==="promoted"  && <span style={{ fontSize:"0.48rem", fontWeight:700, padding:"0.1rem 0.4rem", borderRadius:3, background:T.accentLight, color:T.accent }}>↑ PROM</span>}
                          </div>
                        </td>
                        {[t.p,t.w,t.d,t.l,t.bat,t.bowl,t.pts].map((v,j) => (
                          <td key={j} style={{ padding:"0.9rem 1rem", textAlign:"center", fontSize:"0.78rem", color:T.textFaint, fontWeight:600 }}>{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop:"1rem", fontSize:"0.63rem", color:T.textSub, fontWeight:500, lineHeight:2 }}>
                Win = 16pts · Draw = 8pts · Loss = 0pts + up to 5 batting bonus + up to 3 bowling bonus
              </div>
            </div>
          )}

          {tab==="commentary" && <CommentaryTab myTeam={myTeam} />}
          {tab==="calendar"   && <CalendarTab myTeam={myTeam} />}

          {/* TEAMS */}
          {tab==="teams" && (
            <div>
              <h2 style={{ fontSize:"1rem", fontWeight:800, color:T.text, marginBottom:"1.5rem" }}>2026 Division I — 10 Counties</h2>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))", gap:"0.75rem" }}>
                {TEAMS.map(t => (
                  <div key={t.name} className="hov-card" onClick={() => selectTeam(t.name)}
                    style={{ background:t.name===myTeam?T.accentLight:T.surface, border:`1px solid ${t.name===myTeam?T.accentMid:T.border}`, borderTop:`3px solid ${TEAM_COLOURS[t.name]}`, borderRadius:T.radius, padding:"1.1rem 1.15rem", cursor:"pointer", transition:"all 0.15s", boxShadow:T.shadow }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"0.7rem" }}>
                      <div>
                        <div style={{ fontSize:"0.85rem", fontWeight:800, color:T.text, marginBottom:"0.2rem" }}>{t.name}</div>
                        <div style={{ fontSize:"0.6rem", color:T.textSub, fontWeight:500 }}>{t.venue}</div>
                      </div>
                      <div style={{ fontSize:"0.62rem", fontWeight:800, color:"#fff", background:TEAM_COLOURS[t.name], borderRadius:5, padding:"0.18rem 0.42rem", letterSpacing:"0.06em" }}>{t.short}</div>
                    </div>
                    <div style={{ display:"flex", gap:"0.4rem", flexWrap:"wrap" }}>
                      {t.name===myTeam        && <span style={{ fontSize:"0.5rem", fontWeight:700, padding:"0.15rem 0.45rem", borderRadius:3, background:T.accent, color:"#fff" }}>MY TEAM</span>}
                      {t.status==="champions" && <span style={{ fontSize:"0.5rem", fontWeight:700, padding:"0.15rem 0.45rem", borderRadius:3, background:T.goldBg, color:T.gold, border:`1px solid #e8c84a` }}>DEFENDING CHAMPIONS</span>}
                      {t.status==="promoted"  && <span style={{ fontSize:"0.5rem", fontWeight:700, padding:"0.15rem 0.45rem", borderRadius:3, background:T.accentLight, color:T.accent }}>PROMOTED</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab==="myteam" && <MyTeamTab team={myTeam} />}

        </main>

        <footer style={{ borderTop:`1px solid ${T.border}`, background:T.surface, padding:"1rem 2rem", marginTop:"2rem", display:"flex", justifyContent:"center", gap:"1.5rem" }}>
          {["ECB","ESPNCricinfo","Cricsheet"].map(s => <span key={s} style={{ fontSize:"0.56rem", color:T.textFaint, fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase" }}>{s}</span>)}
          <span style={{ color:T.textFaint }}>·</span>
          <span style={{ fontSize:"0.56rem", color:T.textFaint }}>3 Apr – 27 Sep 2026</span>
        </footer>
      </div>
    </>
  );
}
