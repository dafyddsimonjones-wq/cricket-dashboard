import { useState, useRef, useEffect } from "react";
import Head from "next/head";

// ─── Static team intel ────────────────────────────────────────────────────────

const TEAM_INTEL = {
  "Nottinghamshire": {
    squadNote: "Defending champions with a settled, experienced core — Mullaney's leadership and Patterson-White's spin remain central to their title defence. The key question heading into 2026 is how often Paterson and Fletcher are available given international and IPL commitments.",
    likelyXI: [
      { name: "Ben Slater",           role: "Opener",        note: "" },
      { name: "Haseeb Hameed",        role: "Opener",        note: "" },
      { name: "Joe Clarke",           role: "Batter",        note: "" },
      { name: "Steven Mullaney",      role: "Batter",        note: "captain" },
      { name: "Matthew Montgomery",   role: "Batter",        note: "" },
      { name: "Tom Moores",           role: "Keeper-Batter", note: "" },
      { name: "Lyndon James",         role: "All-rounder",   note: "" },
      { name: "Dane Paterson",        role: "Seam",          note: "" },
      { name: "Luke Fletcher",        role: "Seam",          note: "" },
      { name: "Brett Hutton",         role: "Seam",          note: "" },
      { name: "Liam Patterson-White", role: "Spin",          note: "" },
    ],
    selectionNews: [
      { headline: "Paterson availability uncertain", detail: "Dane Paterson's schedule will be managed carefully across the season following a busy international winter — expect rotation." },
      { headline: "Patterson-White key to spin plans", detail: "Liam Patterson-White is expected to be the primary spinner all summer; his batting at 8 adds vital depth on flat decks." },
      { headline: "Montgomery staking claim at 5", detail: "Matthew Montgomery impressed in the second half of 2025 and is expected to cement the number five spot heading into the defence." },
    ],
  },
  "Surrey": {
    squadNote: "Perennial contenders with world-class depth, though England call-ups remain a constant headache — Foakes, Pope and Atkinson can all disappear for Test duty at short notice. When available, this is arguably the strongest batting and bowling unit in the division.",
    likelyXI: [
      { name: "Rory Burns",       role: "Opener",        note: "captain" },
      { name: "Ben Geddes",       role: "Opener",        note: "" },
      { name: "Dominic Sibley",   role: "Batter",        note: "" },
      { name: "Ollie Pope",       role: "Batter",        note: "England — availability TBC" },
      { name: "Cameron Steel",    role: "Batter",        note: "" },
      { name: "Ben Foakes",       role: "Keeper-Batter", note: "England — availability TBC" },
      { name: "Tom Lawes",        role: "All-rounder",   note: "" },
      { name: "Gus Atkinson",     role: "Seam",          note: "England — availability TBC" },
      { name: "Dan Worrall",      role: "Seam",          note: "" },
      { name: "Sean Abbott",      role: "Seam",          note: "" },
      { name: "Kemar Roach",      role: "Seam",          note: "" },
    ],
    selectionNews: [
      { headline: "England trio a constant selection headache", detail: "Pope, Foakes and Atkinson are all in England's Test plans — Surrey will need to plan for extended absences throughout the summer." },
      { headline: "Worrall and Abbott expected to lead attack", detail: "When England players are away, the Australian pair of Dan Worrall and Sean Abbott give Surrey a formidable overseas-quality seam partnership." },
      { headline: "Spin cover light", detail: "Surrey's XI is heavily seam-oriented; if conditions favour spin, there are questions about who fills that role in the absence of a specialist." },
    ],
  },
  "Hampshire": {
    squadNote: "A Hampshire side built around James Vince's elegant top-order batting and the experience of Liam Dawson, they remain dangerous at the Utilita Bowl where the pitch often helps seamers. The loss of Kyle Abbott to retirement leaves a notable gap at the top of their attack.",
    likelyXI: [
      { name: "Felix Organ",     role: "Opener",        note: "" },
      { name: "Nick Gubbins",    role: "Opener",        note: "" },
      { name: "James Vince",     role: "Batter",        note: "captain" },
      { name: "Tom Alsop",       role: "Batter",        note: "" },
      { name: "Ian Holland",     role: "Batter",        note: "" },
      { name: "Lewis McManus",   role: "Keeper-Batter", note: "" },
      { name: "Liam Dawson",     role: "All-rounder",   note: "" },
      { name: "Mohammad Abbas",  role: "Seam",          note: "" },
      { name: "Scott Currie",    role: "Seam",          note: "" },
      { name: "Brad Wheal",      role: "Seam",          note: "" },
      { name: "Keith Barker",    role: "Seam",          note: "" },
    ],
    selectionNews: [
      { headline: "Abbas expected to lead seam attack", detail: "Mohammad Abbas returns as Hampshire's overseas seamer — his ability to swing the ball in helpful conditions makes him lethal at the Utilita Bowl." },
      { headline: "Dawson's all-round role crucial", detail: "Liam Dawson provides spin cover and lower-order runs; his ability to bat at 7 gives Hampshire rare depth for a side reliant on top-order contributions." },
      { headline: "Currie earmarked for breakthrough season", detail: "Young seamer Scott Currie impressed in 2025 and is expected to play a significant role this summer with the senior seamers potentially rested." },
    ],
  },
  "Essex": {
    squadNote: "Essex remain formidable at Chelmsford where the pitch regularly produces results, and their experienced core of Westley, Harmer and Cook gives them reliable performers at every level. The main uncertainty is Dan Lawrence's availability if England come calling.",
    likelyXI: [
      { name: "Nick Browne",    role: "Opener",        note: "" },
      { name: "Tom Westley",    role: "Opener",        note: "captain" },
      { name: "Dan Lawrence",   role: "Batter",        note: "England — availability TBC" },
      { name: "Paul Walter",    role: "Batter",        note: "" },
      { name: "Jordan Cox",     role: "Batter",        note: "" },
      { name: "Michael Pepper", role: "Keeper-Batter", note: "" },
      { name: "Shane Snater",   role: "All-rounder",   note: "" },
      { name: "Sam Cook",       role: "Seam",          note: "" },
      { name: "Peter Siddle",   role: "Seam",          note: "" },
      { name: "Ben Allison",    role: "Seam",          note: "" },
      { name: "Simon Harmer",   role: "Spin",          note: "" },
    ],
    selectionNews: [
      { headline: "Harmer anchors the spin attack", detail: "Simon Harmer remains one of the best overseas spinners in county cricket — his ability to take wickets and contribute with the bat at 8 is invaluable." },
      { headline: "Sam Cook quietly excellent", detail: "Sam Cook continues to be one of the division's most consistent seamers; his control and movement at Chelmsford is a significant home advantage." },
      { headline: "Lawrence's England prospects cloud selection", detail: "If Dan Lawrence forces his way back into England's Test squad, Essex will need to rethink their top four — Jordan Cox and Walter would need to step up." },
    ],
  },
  "Yorkshire": {
    squadNote: "Yorkshire's star power is undeniable — Harry Brook and Shan Masood at the top of the order give them one of the most formidable batting units in the country. However, England availability and a bowling attack still finding its best balance mean the season could be inconsistent.",
    likelyXI: [
      { name: "Adam Lyth",            role: "Opener",        note: "" },
      { name: "Shan Masood",          role: "Opener",        note: "captain" },
      { name: "Harry Brook",          role: "Batter",        note: "England — availability TBC" },
      { name: "Dawid Malan",          role: "Batter",        note: "" },
      { name: "Matthew Revis",        role: "Batter",        note: "" },
      { name: "Jonathan Tattersall",  role: "Keeper-Batter", note: "" },
      { name: "Jordan Thompson",      role: "All-rounder",   note: "" },
      { name: "Ben Coad",             role: "Seam",          note: "" },
      { name: "Duanne Olivier",       role: "Seam",          note: "" },
      { name: "Matthew Fisher",       role: "Seam",          note: "" },
      { name: "Dom Bess",             role: "Spin",          note: "" },
    ],
    selectionNews: [
      { headline: "Brook's England commitments a major factor", detail: "Harry Brook will miss significant chunks of the season on Test duty — Yorkshire's results without him will define whether they can challenge at the top." },
      { headline: "Olivier key overseas option", detail: "South African Duanne Olivier gives Yorkshire a powerful strike weapon in helpful conditions; his ability to generate steep bounce is particularly valuable at Headingley." },
      { headline: "Bess looking to reclaim form", detail: "Dom Bess returns looking to rediscover his best after a difficult couple of seasons — if he clicks, Yorkshire's bowling attack becomes genuinely well-rounded." },
    ],
  },
  "Sussex": {
    squadNote: "Sussex have a blend of youth and experience, with Tom Haines developing into one of the division's most consistent openers. Their seam attack is their strongest suit, though the batting can look fragile against quality bowling on lively pitches.",
    likelyXI: [
      { name: "Tom Haines",      role: "Opener",        note: "captain" },
      { name: "Oli Carter",      role: "Opener",        note: "" },
      { name: "Tom Clark",       role: "Batter",        note: "" },
      { name: "Ravi Bopara",     role: "Batter",        note: "" },
      { name: "Delray Rawlins",  role: "Batter",        note: "" },
      { name: "Oli Robinson",    role: "Keeper-Batter", note: "" },
      { name: "George Garton",   role: "All-rounder",   note: "" },
      { name: "Henry Crocombe",  role: "Seam",          note: "" },
      { name: "Steve Reingold",  role: "Seam",          note: "" },
      { name: "Ollie Robinson",  role: "Seam",          note: "England — availability TBC" },
      { name: "Jack Carson",     role: "Spin",          note: "" },
    ],
    selectionNews: [
      { headline: "Ollie Robinson's fitness crucial", detail: "England seamer Ollie Robinson will be a huge asset when available — his swing and seam at pace is the difference between a good and great Sussex attack." },
      { headline: "Garton adds genuine pace option", detail: "George Garton gives Sussex a left-arm seam option that creates problems for right-handed openers; his batting at 7 also adds a useful lower-order dimension." },
      { headline: "Carson's spin development key", detail: "Jack Carson is expected to take on a greater workload in 2026 — his off-spin is well-suited to Hove's pitch conditions late in games." },
    ],
  },
  "Warwickshire": {
    squadNote: "Warwickshire have a solid, hard-nosed unit built around their bowling attack at Edgbaston, where Chris Woakes when available transforms their prospects significantly. The batting relies heavily on Sam Hain and Rob Yates to provide the platform.",
    likelyXI: [
      { name: "Rob Yates",       role: "Opener",        note: "" },
      { name: "Alex Davies",     role: "Opener",        note: "" },
      { name: "Sam Hain",        role: "Batter",        note: "captain" },
      { name: "Michael Burgess", role: "Batter",        note: "" },
      { name: "Will Rhodes",     role: "Batter",        note: "" },
      { name: "Tim Ambrose",     role: "Keeper-Batter", note: "" },
      { name: "Henry Brookes",   role: "All-rounder",   note: "" },
      { name: "Chris Woakes",    role: "Seam",          note: "England — availability TBC" },
      { name: "Olly Stone",      role: "Seam",          note: "" },
      { name: "Liam Norwell",    role: "Seam",          note: "" },
      { name: "Danny Briggs",    role: "Spin",          note: "" },
    ],
    selectionNews: [
      { headline: "Woakes availability defines their ceiling", detail: "When Chris Woakes is in the XI, Warwickshire are genuine title contenders — without him, they become a solid mid-table side reliant on conditions." },
      { headline: "Stone fitness monitored", detail: "Olly Stone has had a stop-start career due to injury but is expected to be fit for the start of the season; if he stays fit he's one of the fastest in the division." },
      { headline: "Yates expected to anchor the top order", detail: "Rob Yates' patient, technically correct batting is perfectly suited to Championship cricket — he'll be expected to bat long and set up innings at Edgbaston." },
    ],
  },
  "Somerset": {
    squadNote: "Somerset's perennial bridesmaid tag drives real hunger within the squad, and Tom Abell's captaincy has brought a steeliness to a side that has the bowling tools — particularly Craig Overton — to take 20 wickets on most surfaces. Whether the batting is consistent enough remains the central question.",
    likelyXI: [
      { name: "Tom Lammonby",         role: "Opener",        note: "" },
      { name: "Eddie Byrom",          role: "Opener",        note: "" },
      { name: "Tom Abell",            role: "Batter",        note: "captain" },
      { name: "James Hildreth",       role: "Batter",        note: "" },
      { name: "Lewis Goldsworthy",    role: "Batter",        note: "" },
      { name: "James Rew",            role: "Keeper-Batter", note: "" },
      { name: "Roelof van der Merwe", role: "All-rounder",   note: "" },
      { name: "Craig Overton",        role: "Seam",          note: "" },
      { name: "Josh Davey",           role: "Seam",          note: "" },
      { name: "Ben Green",            role: "Seam",          note: "" },
      { name: "Jack Leach",           role: "Spin",          note: "England — availability TBC" },
    ],
    selectionNews: [
      { headline: "Leach's England status key variable", detail: "Jack Leach remains England's first-choice spinner — his absences are significant for Somerset given he provides their main spin option and considerable batting depth." },
      { headline: "Rew tipped for huge season", detail: "James Rew is widely regarded as one of the brightest young batters in English cricket — 2026 could be the year he announces himself at the top level." },
      { headline: "Van der Merwe's all-round value enormous", detail: "The South African left-armer can win games with bat and ball; his ability to bat at 7 and bowl 20 overs of slow left-arm gives Somerset genuine flexibility." },
    ],
  },
  "Glamorgan": {
    squadNote: "Promoted Glamorgan return to Division One buoyed by Sam Northeast's consistent run-scoring and a seam attack led by Michael Neser that punched well above its weight in the Second Division. The step up in quality will test their batting depth, but they are no makeweights.",
    likelyXI: [
      { name: "David Lloyd",         role: "Opener",        note: "" },
      { name: "Eddie Byrom",         role: "Opener",        note: "" },
      { name: "Sam Northeast",       role: "Batter",        note: "captain" },
      { name: "Kiran Carlson",       role: "Batter",        note: "" },
      { name: "Colin Ingram",        role: "Batter",        note: "" },
      { name: "Chris Cooke",         role: "Keeper-Batter", note: "" },
      { name: "Michael Neser",       role: "All-rounder",   note: "" },
      { name: "Timm van der Gugten", role: "Seam",          note: "" },
      { name: "Marchant de Lange",   role: "Seam",          note: "" },
      { name: "James Harris",        role: "Seam",          note: "" },
      { name: "Mason Crane",         role: "Spin",          note: "" },
    ],
    selectionNews: [
      { headline: "Neser the cornerstone of Glamorgan's attack", detail: "Australian all-rounder Michael Neser was the standout performer in their promotion campaign and is the player Division One sides will need to plan for." },
      { headline: "Northeast's form must translate up a level", detail: "Sam Northeast averaged over 55 in Division Two — Division One seamers will probe his technique more consistently, making the first six weeks critical." },
      { headline: "Crane adds genuine spin threat", detail: "The acquisition of leg-spinner Mason Crane gives Glamorgan a genuine match-winner in the right conditions — a key signing for their survival hopes." },
    ],
  },
  "Leicestershire": {
    squadNote: "Leicestershire's promotion was built on team spirit, Colin Ackermann's reliable run-scoring, and Callum Parkinson's wicket-taking spin. Survival will be the realistic goal, but they have enough quality to cause upsets — particularly at Grace Road where the pitch can be unpredictable.",
    likelyXI: [
      { name: "Sam Evans",        role: "Opener",        note: "" },
      { name: "Louis Kimber",     role: "Opener",        note: "" },
      { name: "Colin Ackermann",  role: "Batter",        note: "captain" },
      { name: "Rishi Patel",      role: "Batter",        note: "" },
      { name: "Lewis Hill",       role: "Batter",        note: "" },
      { name: "Harry Swindells",  role: "Keeper-Batter", note: "" },
      { name: "Wiaan Mulder",     role: "All-rounder",   note: "" },
      { name: "Naveen-ul-Haq",    role: "Seam",          note: "" },
      { name: "Ben Mike",         role: "Seam",          note: "" },
      { name: "Roman Walker",     role: "Seam",          note: "" },
      { name: "Callum Parkinson", role: "Spin",          note: "" },
    ],
    selectionNews: [
      { headline: "Parkinson must step up in Division One", detail: "Callum Parkinson was Leicestershire's standout bowler in Division Two — the key question is whether his left-arm spin translates against more experienced batters." },
      { headline: "Mulder a genuine all-round asset", detail: "South African Wiaan Mulder provides proper quality at number 7 and can bowl lively medium-pace — he could be the difference between survival and relegation." },
      { headline: "Naveen-ul-Haq brings pace and unpredictability", detail: "The Afghan quick has the raw materials to thrive in English conditions; his pace and ability to reverse swing older balls make him a real handful." },
    ],
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

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

function RolePill({ role }) {
  const r = (role||"").toLowerCase();
  let bg, color;
  if (r.includes("keeper"))                                          { bg="#e8f5e9"; color="#2e7d32"; }
  else if (r.includes("open"))                                       { bg="#e8eaf6"; color="#283593"; }
  else if (r.includes("all"))                                        { bg="#fff3e0"; color="#bf360c"; }
  else if (r.includes("spin"))                                       { bg="#f3e5f5"; color="#6a1b9a"; }
  else if (r.includes("seam")||r.includes("pace")||r.includes("bowl")) { bg="#fce4ec"; color="#880e4f"; }
  else                                                               { bg=T.accentLight; color=T.accent; }
  return <span style={{ fontSize:"0.58rem", fontWeight:700, padding:"0.18rem 0.55rem", borderRadius:4, background:bg, color, letterSpacing:"0.04em", whiteSpace:"nowrap" }}>{role}</span>;
}

// ─── Selection Chat ───────────────────────────────────────────────────────────

function MyTeamTab({ team }) {
  const intel = TEAM_INTEL[team] || null;
  const [chatHistory, setChatHistory] = useState([]);
  const [chatInput,   setChatInput]   = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatBottomRef = useRef(null);

  useEffect(() => { chatBottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [chatHistory, chatLoading]);

  useEffect(() => {
    setChatHistory([]);
    setChatInput("");
    if (intel && team) {
      setChatHistory([{ role:"assistant", content:`Here's the pre-season briefing for ${team}. Happy to dig into selection — pitch, weather, opposition, whatever's on your mind.` }]);
    }
  }, [team]);

  const send = async () => {
    const msg = chatInput.trim();
    if (!msg || chatLoading) return;
    setChatInput("");
    const updated = [...chatHistory, { role:"user", content:msg }];
    setChatHistory(updated);
    setChatLoading(true);

    try {
      const xi = intel.likelyXI.map((p,i) => `${i+1}. ${p.name} (${p.role}${p.note ? ", "+p.note:""})`).join("\n");
      const news = intel.selectionNews.map(n => `• ${n.headline}: ${n.detail}`).join("\n");
      const teamObj = TEAMS.find(t => t.name===team);

      const system = `You are an expert county cricket analyst with deep knowledge of ${team}. You know their squad inside out, their home ground at ${teamObj?.venue}, and the tactical nuances of four-day cricket — pitch conditions, weather, opposition match-ups, player form, injuries, and strategic balance.

Current likely XI:
${xi}

Pre-season selection notes:
${news}

Squad overview: ${intel.squadNote}

When the user suggests changes, engage seriously. Think through implications — batting depth, bowling options, balance. Push back if you disagree but be open to a good argument. Keep responses to 2–4 sentences unless something genuinely warrants more. You are a knowledgeable mate who knows this team well, not a formal report generator.`;

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system,
          messages: updated.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setChatHistory(prev => [...prev, { role:"assistant", content: data.text }]);
    } catch(e) {
      setChatHistory(prev => [...prev, { role:"assistant", content:`⚠️ ${e.message}` }]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleKey = e => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); send(); } };

  if (!team) return (
    <div style={{ textAlign:"center", padding:"5rem 2rem" }}>
      <div style={{ fontSize:"0.72rem", color:T.textSub, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase" }}>No team selected</div>
      <div style={{ fontSize:"0.78rem", color:T.textFaint, marginTop:"0.5rem" }}>Use the dropdown above to choose your team</div>
    </div>
  );

  if (!intel) return <div style={{ padding:"2rem", fontSize:"0.8rem", color:T.textSub }}>No intel for {team}.</div>;

  const tc = TEAM_COLOURS[team] || T.accent;
  const allF = FIXTURES.flatMap(f => f.matches.map(m => ({...m, dates:f.dates, round:f.round})));
  const next = allF.find(m => m.home===team||m.away===team);
  const opp  = next ? (next.home===team ? next.away : next.home) : null;
  const teamObj = TEAMS.find(t => t.name===team);

  const CHIPS = ["What if it rains on day one?","Drop a batter, go with 4 seamers?","How will the pitch play?","England call-up concerns?"];

  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 390px", gap:"1.5rem", alignItems:"start" }}>

      {/* Intel */}
      <div style={{ display:"flex", flexDirection:"column", gap:"1.1rem" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"1.3rem 1.6rem", background:T.surface, borderRadius:T.radius, border:`1px solid ${T.border}`, borderLeft:`4px solid ${tc}`, boxShadow:T.shadow }}>
          <div>
            <div style={{ fontSize:"0.52rem", fontWeight:700, color:T.textSub, letterSpacing:"0.25em", textTransform:"uppercase", marginBottom:"0.3rem" }}>My Team · Pre-season 2026</div>
            <div style={{ fontSize:"1.5rem", fontWeight:800, color:T.text, letterSpacing:"-0.03em" }}>{team}</div>
            {next && <div style={{ fontSize:"0.68rem", color:T.textMid, marginTop:"0.3rem", fontWeight:500 }}>Next — <strong>vs {opp}</strong> · {next.venue} · {next.dates}</div>}
          </div>
          <div style={{ width:44, height:44, borderRadius:"50%", background:T.accentLight, border:`2px solid ${T.accentMid}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.66rem", fontWeight:800, color:T.accent }}>{teamObj?.short}</div>
        </div>

        <div style={{ background:T.accentLight, border:`1px solid ${T.accentMid}`, borderRadius:T.radius, padding:"1rem 1.3rem" }}>
          <div style={{ fontSize:"0.52rem", fontWeight:800, color:T.accent, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"0.4rem" }}>Overview</div>
          <p style={{ margin:0, fontSize:"0.77rem", color:T.textMid, fontWeight:500, lineHeight:1.75 }}>{intel.squadNote}</p>
        </div>

        <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:T.radius, overflow:"hidden", boxShadow:T.shadow }}>
          <div style={{ padding:"0.85rem 1.3rem", borderBottom:`1px solid ${T.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:"0.56rem", fontWeight:800, color:T.text, letterSpacing:"0.2em", textTransform:"uppercase" }}>Likely XI</span>
            {opp && <span style={{ fontSize:"0.62rem", color:T.textSub, fontWeight:600 }}>vs {opp} · {next?.dates}</span>}
          </div>
          {intel.likelyXI.map((p,i) => (
            <div key={i} style={{ display:"grid", gridTemplateColumns:"32px 1fr auto", alignItems:"center", gap:"0.65rem", padding:"0.65rem 1.3rem", borderBottom:i<10?`1px solid ${T.border}`:"none", background:i%2===0?"#fff":T.bg }}>
              <div style={{ width:22, height:22, borderRadius:"50%", background:T.accentLight, color:T.accent, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.58rem", fontWeight:700 }}>{i+1}</div>
              <div>
                <span style={{ fontSize:"0.82rem", fontWeight:700, color:T.text }}>{p.name}</span>
                {p.note && <span style={{ fontSize:"0.58rem", color:T.textSub, fontWeight:500, marginLeft:"0.45rem" }}>{p.note}</span>}
              </div>
              <RolePill role={p.role} />
            </div>
          ))}
        </div>

        <div>
          <div style={{ fontSize:"0.52rem", fontWeight:800, color:T.textSub, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"0.75rem" }}>Selection News</div>
          <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
            {intel.selectionNews.map((item,i) => (
              <div key={i} style={{ background:T.surface, border:`1px solid ${T.border}`, borderLeft:`3px solid ${tc}`, borderRadius:T.radius, padding:"0.85rem 1.1rem", boxShadow:T.shadow }}>
                <div style={{ fontSize:"0.8rem", fontWeight:700, color:T.text, marginBottom:"0.3rem" }}>{item.headline}</div>
                <div style={{ fontSize:"0.7rem", color:T.textMid, fontWeight:500, lineHeight:1.6 }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ fontSize:"0.58rem", color:T.textFaint, fontWeight:500, fontStyle:"italic" }}>⚠ Pre-season data — will be updated with live squad news once the season begins.</div>
      </div>

      {/* Chat */}
      <div style={{ position:"sticky", top:"1.5rem", display:"flex", flexDirection:"column", background:T.surface, border:`1px solid ${T.border}`, borderRadius:T.radius, boxShadow:T.shadow, overflow:"hidden", height:"calc(100vh - 180px)", maxHeight:700 }}>
        <div style={{ padding:"0.9rem 1.1rem", borderBottom:`1px solid ${T.border}`, background:T.bg, flexShrink:0 }}>
          <div style={{ fontSize:"0.56rem", fontWeight:800, color:T.text, letterSpacing:"0.18em", textTransform:"uppercase" }}>Selection Chat</div>
          <div style={{ fontSize:"0.62rem", color:T.textSub, fontWeight:500, marginTop:"0.15rem" }}>Pitch · weather · tactics · opposition</div>
        </div>

        <div style={{ flex:1, overflowY:"auto", padding:"1rem", display:"flex", flexDirection:"column", gap:"0.85rem" }}>
          {chatHistory.map((msg,i) => (
            <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:msg.role==="user"?"flex-end":"flex-start" }}>
              <div style={{ fontSize:"0.52rem", fontWeight:700, color:T.textFaint, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.2rem", paddingLeft:msg.role==="assistant"?"0.2rem":0, paddingRight:msg.role==="user"?"0.2rem":0 }}>
                {msg.role==="user" ? "You" : "Analyst"}
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
                <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}`}</style>
              </div>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {chatHistory.length <= 1 && (
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
          <textarea value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={handleKey}
            placeholder="e.g. Drop a batter and go with 4 seamers on a green pitch…"
            rows={2}
            style={{ flex:1, resize:"none", border:`1px solid ${T.borderMid}`, borderRadius:8, padding:"0.5rem 0.7rem", fontSize:"0.7rem", fontFamily:T.font, color:T.text, outline:"none", lineHeight:1.5, background:T.bg }}
          />
          <button onClick={send} disabled={!chatInput.trim()||chatLoading}
            style={{ background:chatInput.trim()&&!chatLoading?T.accent:T.accentLight, color:chatInput.trim()&&!chatLoading?"#fff":T.textFaint, border:"none", borderRadius:8, padding:"0 0.9rem", cursor:chatInput.trim()&&!chatLoading?"pointer":"default", fontFamily:T.font, fontSize:"0.68rem", fontWeight:700, transition:"all 0.15s", flexShrink:0 }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [tab,    setTab]    = useState("fixtures");
  const [round,  setRound]  = useState(1);
  const [myTeam, setMyTeam] = useState("");
  const [ddOpen, setDdOpen] = useState(false);

  const curFixtures = FIXTURES.find(f => f.round===round);
  const standings   = TEAMS.map(t => ({...t, p:0, w:0, d:0, l:0, bat:"-", bowl:"-", pts:0}));
  const selectTeam  = name => { setMyTeam(name); setDdOpen(false); setTab("myteam"); };

  return (
    <>
      <Head>
        <title>County Championship Division I — 2026</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style global jsx>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${T.bg}; font-family: ${T.font}; }
        .hov-card:hover { box-shadow: ${T.shadowHover} !important; transform: translateY(-1px); }
        .hov-row:hover td { background: ${T.accentLight} !important; }
        .hov-dd:hover { background: ${T.accentLight} !important; }
        .tab-btn:hover { color: ${T.accent} !important; }
        textarea:focus { border-color: ${T.accent} !important; box-shadow: 0 0 0 2px ${T.accentLight} !important; }
      `}</style>

      <div style={{ fontFamily:T.font, color:T.text, minHeight:"100vh", background:T.bg }}
           onClick={() => ddOpen && setDdOpen(false)}>

        <div style={{ height:3, background:`linear-gradient(90deg, ${T.accent}, #6ab87e)` }} />

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
                    {myTeam || "Select team"}
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
              {["fixtures","standings","teams","myteam"].map(t => (
                <button key={t} className="tab-btn" onClick={() => setTab(t)}
                  style={{ background:"none", border:"none", cursor:"pointer", padding:"0.72rem 1.2rem", color:tab===t?T.accent:T.textSub, borderBottom:tab===t?`2px solid ${T.accent}`:"2px solid transparent", fontSize:"0.63rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", fontFamily:T.font, marginBottom:"-1px", transition:"color 0.15s" }}>
                  {t==="myteam"?"My Team":t}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main style={{ maxWidth:1200, margin:"0 auto", padding:"2.5rem 2rem" }}>

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
                <span style={{ fontSize:"0.63rem", color:T.textFaint }}>+ 8 more</span>
              </div>
              {curFixtures && <>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:"1.1rem" }}>
                  <h2 style={{ fontSize:"0.72rem", fontWeight:700, color:T.textSub, letterSpacing:"0.18em", textTransform:"uppercase" }}>Round {curFixtures.round}</h2>
                  <span style={{ fontSize:"0.72rem", fontWeight:700, color:T.accent }}>{curFixtures.dates}</span>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                  {curFixtures.matches.map((m,i) => {
                    const mine = myTeam && (m.home===myTeam||m.away===myTeam);
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
          {["ECB","ESPNCricinfo","Sky Sports"].map(s => <span key={s} style={{ fontSize:"0.56rem", color:T.textFaint, fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase" }}>{s}</span>)}
          <span style={{ color:T.textFaint }}>·</span>
          <span style={{ fontSize:"0.56rem", color:T.textFaint }}>3 Apr – 27 Sep 2026</span>
        </footer>
      </div>
    </>
  );
}
