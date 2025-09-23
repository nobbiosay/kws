import React, { useEffect, useState } from "react";

// ==========================
// Enhanced CSS + Animations
// ==========================
const baseCss = `
  :root{--bg:#0b1220;--card:#0f172a;--muted:#9db0c9;--accent:#36bffa;--accent2:#6ee7b7;--danger:#ef4444;--ok:#22c55e}
  *{box-sizing:border-box} html,body,#root{height:100%}
  body{margin:0;background:radial-gradient(1200px 800px at 20% -10%,rgba(54,191,250,.15),transparent 60%),radial-gradient(800px 600px at 120% 10%,rgba(110,231,183,.12),transparent 50%),linear-gradient(180deg,#0b1220,#0b1220 60%,#0d1424);color:#eaf2ff;font-family:Inter,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif}
  a{color:var(--accent)}
  .container{max-width:1200px;margin:0 auto;padding:24px}
  .brand{display:flex;align-items:center;gap:12px;font-weight:800;letter-spacing:.3px}
  .brand .logo{width:38px;height:38px;border-radius:12px;background:conic-gradient(from 0deg,var(--accent),#3f8cff 120deg,var(--accent2));display:grid;place-items:center;color:#00111a;font-weight:900;box-shadow:0 10px 30px rgba(54,191,250,.25)}
  .card{background:rgba(255,255,255,.04);backdrop-filter: blur(10px);border:1px solid rgba(255,255,255,.08);border-radius:18px;box-shadow:0 10px 30px rgba(0,0,0,.25)}
  .panel{padding:20px;border-radius:16px}
  .grid{display:grid;gap:16px}
  .grid.cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
  .grid.cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}
  .grid.cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}
  .header{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:18px}
  .muted{color:var(--muted)}
  .pill{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(255,255,255,.1);padding:8px 12px;border-radius:999px}
  .btn{cursor:pointer;border:none;border-radius:12px;padding:10px 14px;font-weight:700;transition:transform .15s ease, box-shadow .15s ease, background .2s;display:inline-flex;align-items:center;gap:8px}
  .btn.primary{background:linear-gradient(135deg,var(--accent),#3f8cff);color:#00111a;box-shadow:0 6px 16px rgba(63,140,255,.35)}
  .btn.primary:hover{transform:translateY(-1px)}
  .btn.ghost{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.12);color:#e6eefc}
  .btn.ghost:hover{background:rgba(255,255,255,.06)}
  .btn.warn{background:var(--danger);color:white}
  .btn:disabled{opacity:.5;cursor:not-allowed}
  input,select,textarea{width:100%;padding:10px 12px;border-radius:10px;background:#0f1626;border:1px solid rgba(255,255,255,.12);color:#e6eefc;transition:border .2s, box-shadow .2s}
  input:focus,select:focus,textarea:focus{outline:none;border-color:rgba(54,191,250,.5);box-shadow:0 0 0 3px rgba(54,191,250,.18)}
  label{font-size:12px;color:var(--muted);display:block;margin-bottom:6px}
  .fieldset{display:grid;gap:10px}
  table{width:100%;border-collapse:separate;border-spacing:0}
  th,td{padding:12px 10px;border-bottom:1px solid rgba(255,255,255,.08);text-align:left}
  th{font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.08em}
  tr:hover td{background:rgba(255,255,255,.03)}
  .tabs{display:flex;gap:10px;margin:10px 0 18px}
  .tab{padding:8px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.12);cursor:pointer;transition:background .2s}
  .tab.active{background:rgba(57,162,219,.2);border-color:rgba(57,162,219,.5)}
  .section{border:1px dashed rgba(255,255,255,.12);padding:14px;border-radius:12px}
  .section h4{margin:0 0 8px 0}
  .topbar{position:sticky;top:0;z-index:5;background:linear-gradient(180deg,#0b1220 85%,rgba(11,18,32,.7));backdrop-filter: blur(6px);border-bottom:1px solid rgba(255,255,255,.06)}
  .anim-in{animation:fadeUp .4s ease both}
  .anim-delay-1{animation-delay:.05s}
  .anim-delay-2{animation-delay:.1s}
  .anim-delay-3{animation-delay:.15s}
  @keyframes fadeUp{from{opacity:0;transform:translateY(6px) scale(.995)}to{opacity:1;transform:translateY(0) scale(1)}}
  .modal{position:fixed;inset:0;display:grid;place-items:center;background:rgba(2,6,17,.6);backdrop-filter:blur(6px)}
  .modal-card{max-width:1000px;width:95%;max-height:85vh;overflow:auto}
`;

// Inject CSS
const Style = () => {
  useEffect(() => {
    const id = "kws-css";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = baseCss;
      document.head.appendChild(s);
    }
  }, []);
  return null;
};

// ==========================
// Utilities & Local Storage
// ==========================
const STORAGE_KEY = "kws-data-v1";
const defaultUser = { id: "operator01", role: "operator", name: "Operator" };

const loadDb = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
  catch { return {}; }
};
const saveDb = (db) => localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
const todayISO = () => new Date().toISOString().slice(0, 10);

// Catalogues
const FLOWMETER_FIELDS = [
  ["counter_air_baku_krenceng","Counter Air Baku Krenceng","m3"],
  ["counter_air_baku_cipada","Counter Air Baku Cipada","m3"],
  ["counter_ps1_wtp","Counter PS I - WTP","m3"],
  ["totalizer_reservoir","Totalizer Reservoir","m3"],
  ["ps3","PS III","m3"],["ps4","PS IV","m3"],["ps5","PS V","m3"],["ps6","PS VI","m3"],
  ["pt_kti","PT KTI","m3"],["kp_baru","Kp. Baru","m3"],["warnasari","Warnasari","m3"],
  ["bbs","BBS","m3"],["mandiri_ls","Mandiri LS","m3"],["kota_panggung_rawi","Kota & Panggung Rawi","m3"],
  ["apbn","APBN","m3"],["apbd","APBD","m3"],["ps8_cipada","PS VIII Cipada","m3"],
  ["internal_wtp_cidanau","Internal WTP Cidanau","m3"],
];
const CHEMICAL_FIELDS = [
  ["alum_bak1","Aluminium Sulfat Bak I","kg"],
  ["alum_bak2","Aluminium Sulfat Bak II","kg"],
  ["flow_kapur","Flowmeter Kapur","m3"],
  ["pemakaian_klorin","Pemakaian Klorin","kg"],
  ["kianchem","Kianchem","m3"],
  ["flow_coagulant_aid","Flowmeter Coagulant Aid","m3"],
  ["kons_alum_bak1","Konsentrasi Alum S. Bak I","%"],
  ["kons_alum_bak2","Konsentrasi Alum S. Bak II","%"],
];
const ELECTRIC_LWBP = [
  ["trafo1_lwbp","Trafo I AK 04 – LWBP","kWh"],
  ["trafo2_lwbp","Trafo II AK 09 – LWBP","kWh"],
  ["trafo3_lwbp","Trafo III AK 03 – LWBP","kWh"],
  ["trafo4_lwbp","Trafo IV AK 02 – LWBP","kWh"],
  ["ps1_trafo1_lwbp","PS I - Trafo I AK 10 – LWBP","kWh"],
  ["ps1_trafo2_lwbp","PS I - Trafo II AK 03 – LWBP","kWh"],
  ["ps5_incoming_ba01_lwbp","PS V - Incoming (BA 01) – LWBP","kWh"],
  ["ps5_incoming_ba04_lwbp","PS V - Incoming (BA 04) – LWBP","kWh"],
];
const ELECTRIC_WBP = [
  ["trafo1_wbp","Trafo I AK 04 – WBP","kWh"],
  ["trafo2_wbp","Trafo II AK 09 – WBP","kWh"],
  ["trafo3_wbp","Trafo III AK 03 – WBP","kWh"],
  ["trafo4_wbp","Trafo IV AK 02 – WBP","kWh"],
  ["ps1_trafo1_wbp","PS I - Trafo I AK 10 – WBP","kWh"],
  ["ps1_trafo2_wbp","PS I - Trafo II AK 03 – WBP","kWh"],
  ["ps5_incoming_ba01_wbp","PS V - Incoming (BA 01) – WBP","kWh"],
  ["ps5_incoming_ba04_wbp","PS V - Incoming (BA 04) – WBP","kWh"],
];
const HOURS = ["07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","00:00","01:00","02:00","03:00","04:00","05:00","06:00"];
const FILTER_UNITS = ["I 1","I 2","I 3","I 4","II 1","II 2","II 3","II 4","III 1","III 2","III 3","III 4","IV 1","IV 2","IV 3","IV 4","V 1","V 2","V 3","V 4"];
const PUMP_GROUPS = {
  "Pompa Air Bersih (menit)": [43,44,45,46,47,60,61,62,63,64,70,71,72,73,74,75].map(n=>["pab_"+n,`pompa ${n}`]),
  "Pompa Alum": [29,30,31,32,33].map(n=>["alum_"+n,`pompa ${n}`]),
  "Pompa Kapur": [37,38].map(n=>["kapur_"+n,`pompa ${n}`]),
  "Pompa Vakum": [["41m1","Pompa 41m1"],["41m2","pompa 41m2"]],
  "Pompa booster (menit)": [["shock_503_m1","Shock 503 m1"],["shock_503_m2","Shock 503 m2"],["shock_503_m3","Shock 503 m3"],["cont_503_m3","Cont. 503 m3"],["cont_503_m4","Cont. 503 m4"]],
  "Accelerator": [["acc_i","Acc I"],["acc_ii","Acc II"],["acc_iii","Acc III"]],
  "Pompa Waduk (menit)": [["waduk_1","1"],["waduk_2","2"],["waduk_3","3"],["waduk_4","4"],["waduk_5","5"]],
};

// ==========================
// Nav & Login
// ==========================
const Nav = ({ current, setCurrent, onLogout }) => (
  <div className="header">
    <div className="brand anim-in"><span className="logo">K</span> Krakatau Water Solution</div>
    <div style={{display:'flex', gap:12, alignItems:'center'}}>
      {[
        ["dashboard","Dashboard"],
        ["kerenceng-input","Input WTP Kerenceng"],
        ["cidanau-input","Input WTP Cidanau"],
        ["kerenceng-data","WTP Kerenceng"],
        ["cidanau-data","WTP Cidanau"],
      ].map(([key,label],i)=> (
        <button key={key} className={`btn ghost ${current===key? 'active':''} anim-in anim-delay-${i%3+1}`} onClick={()=>setCurrent(key)}>
          {label}
        </button>
      ))}
      <button className="btn warn anim-in anim-delay-2" onClick={onLogout}>Logout</button>
    </div>
  </div>
);

const Login = ({ onLogin }) => {
  const [role, setRole] = useState("operator");
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (role !== "operator") return alert("Saat ini hanya role Operator yang diaktifkan.");
    if (!id || !pass) return alert("Masukkan ID dan Password.");
    onLogin({ id, role });
  };

  return (
    <div className="container" style={{display:'grid',placeItems:'center',minHeight:'100vh'}}>
      <div className="card panel anim-in" style={{maxWidth:560,width:'100%'}}>
        <div className="brand" style={{marginBottom:8}}><span className="logo">K</span> Krakatau Water Solution</div>
        <p className="muted" style={{marginTop:0}}>Silakan login untuk melanjutkan.</p>
        <form onSubmit={submit} className="grid" style={{gap:14}}>
          <div>
            <label>Pilih Sebagai apa</label>
            <select value={role} onChange={(e)=>setRole(e.target.value)}>
              <option value="operator">Operator</option>
            </select>
          </div>
          <div>
            <label>Masukan ID</label>
            <input value={id} onChange={(e)=>setId(e.target.value)} placeholder="contoh: op-123" />
          </div>
          <div>
            <label>Masukan Pass</label>
            <input type="password" value={pass} onChange={(e)=>setPass(e.target.value)} placeholder="••••••" />
          </div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <span className="pill">Role aktif: <b>Operator</b></span>
            <button className="btn primary" type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ==========================
// Helpers
// ==========================
const SectionGrid = ({ title, fields, state, setState }) => (
  <div className="section anim-in">
    <h4>{title}</h4>
    <div className="grid cols-3">
      {fields.map(([key,label,unit]) => (
        <div key={key} className="fieldset">
          <label>{label}{unit? ` (${unit})`:''}</label>
          <input type="number" step="any" value={state[key] ?? ''} onChange={(e)=>setState(s=>({...s,[key]: e.target.value}))} />
        </div>
      ))}
    </div>
  </div>
);

const PressureHeader = ({ state, setState }) => (
  <div className="section anim-in">
    <h4>Data Pressure Header</h4>
    <table>
      <thead><tr><th>Jam</th><th>PS IV</th><th>VI</th></tr></thead>
      <tbody>
        {HOURS.map(h => (
          <tr key={h}>
            <td className="muted">{h}</td>
            <td><input type="number" step="any" value={state[`ps4_${h}`] ?? ''} onChange={(e)=>setState(s=>({...s,[`ps4_${h}`]: e.target.value}))} /></td>
            <td><input type="number" step="any" value={state[`vi_${h}`] ?? ''} onChange={(e)=>setState(s=>({...s,[`vi_${h}`]: e.target.value}))} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const FilterOps = ({ state, setState }) => (
  <div className="section anim-in">
    <h4>Data Operasi Unit Filter</h4>
    <table>
      <thead><tr><th>Unit</th><th>Durasi Runtime (menit)</th><th>Jeda Start/Stop (menit)</th></tr></thead>
      <tbody>
        {FILTER_UNITS.map(u => (
          <tr key={u}>
            <td className="muted">{u}</td>
            <td><input type="number" step="any" value={state[`rt_${u}`] ?? ''} onChange={(e)=>setState(s=>({...s,[`rt_${u}`]: e.target.value}))} /></td>
            <td><input type="number" step="any" value={state[`jeda_${u}`] ?? ''} onChange={(e)=>setState(s=>({...s,[`jeda_${u}`]: e.target.value}))} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const PumpDurations = ({ state, setState }) => (
  <div className="section anim-in">
    <h4>Data Durasi Penggunaan Alat</h4>
    <div className="grid cols-2">
      {Object.entries(PUMP_GROUPS).map(([group, items]) => (
        <div key={group} className="section">
          <h4 style={{marginTop:0}}>{group}</h4>
          <div className="grid cols-2">
            {items.map(([key,label]) => (
              <div key={key} className="fieldset">
                <label>{label} (menit)</label>
                <input type="number" step="any" value={state[`pump_${key}`] ?? ''} onChange={(e)=>setState(s=>({...s,[`pump_${key}`]: e.target.value}))} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Quality = ({ state, setState }) => (
  <div className="section anim-in">
    <h4>Data Analisa Kualitas</h4>
    <div className="grid cols-2">
      {["Shift I","Shift II","Shift III"].map((shift, idx)=> (
        <div key={shift} className="section">
          <h4 style={{marginTop:0}}>JarTest — {shift}</h4>
          <div className="grid cols-3">
            <div className="fieldset"><label>pH</label><input type="number" step="any" value={state[`jar_ph_${idx}`] ?? ''} onChange={(e)=>setState(s=>({...s,[`jar_ph_${idx}`]: e.target.value}))} /></div>
            <div className="fieldset"><label>Dosis (ppm)</label><input type="number" step="any" value={state[`jar_dosis_${idx}`] ?? ''} onChange={(e)=>setState(s=>({...s,[`jar_dosis_${idx}`]: e.target.value}))} /></div>
            <div className="fieldset"><label>ppm aktual</label><input type="number" step="any" value={state[`jar_ppm_${idx}`] ?? ''} onChange={(e)=>setState(s=>({...s,[`jar_ppm_${idx}`]: e.target.value}))} /></div>
          </div>
        </div>
      ))}
    </div>
    <div className="section">
      <h4 style={{marginTop:0}}>% Lumpur</h4>
      <table>
        <thead><tr><th>Shift</th><th>Acc I</th><th>Acc II</th><th>Acc III</th></tr></thead>
        <tbody>
          {["I","II","III"].map((s,idx)=> (
            <tr key={s}>
              <td className="muted">Shift {s}</td>
              <td><input type="number" step="any" value={state[`sludge_${idx}_1`] ?? ''} onChange={(e)=>setState(s=>({...s,[`sludge_${idx}_1`]: e.target.value}))} /></td>
              <td><input type="number" step="any" value={state[`sludge_${idx}_2`] ?? ''} onChange={(e)=>setState(s=>({...s,[`sludge_${idx}_2`]: e.target.value}))} /></td>
              <td><input type="number" step="any" value={state[`sludge_${idx}_3`] ?? ''} onChange={(e)=>setState(s=>({...s,[`sludge_${idx}_3`]: e.target.value}))} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ==========================
// Modal + Detail View
// ==========================
const Modal = ({ open, onClose, children, title }) => {
  if (!open) return null;
  return (
    <div className="modal" onClick={onClose}>
      <div className="card panel modal-card anim-in" onClick={(e)=>e.stopPropagation()}>
        <div className="header">
          <div style={{fontWeight:800}}>{title}</div>
          <button className="btn ghost" onClick={onClose}>Tutup</button>
        </div>
        {children}
      </div>
    </div>
  );
};

const SectionKeyValues = ({ title, pairs }) => (
  <div className="section anim-in">
    <h4>{title}</h4>
    <table>
      <thead><tr><th>Parameter</th><th>Nilai</th></tr></thead>
      <tbody>
        {pairs.map(([label,val])=> (
          <tr key={label}><td className="muted">{label}</td><td>{val ?? '-'}</td></tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ==========================
// Forms, Tables & Pages
// ==========================
const WtpForm = ({ plant, onSaved, initial }) => {
  const [date, setDate] = useState(initial?.date || todayISO());
  const [data, setData] = useState(initial?.data || {});
  const [tab, setTab] = useState("flow");

  const save = () => {
    const db = loadDb();
    const arrKey = plant === "kerenceng" ? "kerenceng" : "cidanau";
    const entries = db[arrKey] || [];
    let newEntries;
    if (initial && initial.__id != null) {
      newEntries = entries.map((e, i) => i === initial.__id ? { date, data } : e);
    } else {
      newEntries = [...entries, { date, data }];
    }
    const next = { ...db, [arrKey]: newEntries };
    saveDb(next);
    onSaved();
  };

  return (
    <div className="grid" style={{gap:16}}>
      <div className="grid cols-3">
        <div className="fieldset"><label>Tanggal</label><input type="date" value={date} onChange={(e)=>setDate(e.target.value)} /></div>
        <div className="fieldset"><label>Plant</label><input value={plant.toUpperCase()} disabled/></div>
        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'flex-end'}}>
          <button className="btn primary" onClick={save}>Simpan</button>
        </div>
      </div>

      <div className="tabs">
        {[['flow','Flowmeter'],['chem','Bahan Kimia'],['elec','Listrik'],['quality','Analisa Kualitas'],['pump','Durasi Alat'],['press','Pressure Header'],['filter','Operasi Unit Filter']].map(([k,l])=> (
          <div key={k} className={`tab ${tab===k?'active':''}`} onClick={()=>setTab(k)}>{l}</div>
        ))}
      </div>

      {tab==="flow" && (<SectionGrid title="Flowmeter" fields={FLOWMETER_FIELDS} state={data} setState={setData} />)}
      {tab==="chem" && (<SectionGrid title="Input Data Bahan Kimia" fields={CHEMICAL_FIELDS} state={data} setState={setData} />)}
      {tab==="elec" && (
        <div className="grid" style={{gap:16}}>
          <SectionGrid title="Listrik — LWBP" fields={ELECTRIC_LWBP} state={data} setState={setData} />
          <SectionGrid title="Listrik — WBP" fields={ELECTRIC_WBP} state={data} setState={setData} />
        </div>
      )}
      {tab==="quality" && (<Quality state={data} setState={setData} />)}
      {tab==="pump" && (<PumpDurations state={data} setState={setData} />)}
      {tab==="press" && (<PressureHeader state={data} setState={setData} />)}
      {tab==="filter" && (<FilterOps state={data} setState={setData} />)}
    </div>
  );
};

const DataTable = ({ plant, onEdit }) => {
  const db = loadDb();
  const rows = (db[plant] || []).map((e, i) => ({ idx:i, ...e }));
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(null);

  const remove = (idx) => {
    if (!confirm("Hapus data ini?")) return;
    const db0 = loadDb();
    const next = { ...db0, [plant]: (db0[plant]||[]).filter((_,i)=>i!==idx) };
    saveDb(next);
    window.dispatchEvent(new Event("storage"));
  };

  const cols = ["Tanggal","Ringkasan Flow (m3)","Bahan Kimia (kg)","Listrik (kWh)","Aksi"];

  const compute = (data) => {
    const flow = FLOWMETER_FIELDS.reduce((sum,[key]) => sum + (Number(data[key]||0)||0), 0);
    const chem = (Number(data.alum_bak1||0) + Number(data.alum_bak2||0) + Number(data.pemakaian_klorin||0)) || 0;
    const elec = [...ELECTRIC_LWBP, ...ELECTRIC_WBP].reduce((s,[k]) => s + (Number(data[k]||0)||0), 0);
    return { flow, chem, elec };
  };

  const openDetail = (entry) => { setDetail(entry); setOpen(true); };
  const toPairs = (data, fields) => fields.map(([k,l,unit]) => [l, data[k] ? `${data[k]}${unit? ' '+unit:''}` : '-']);

  return (
    <div className="section anim-in">
      <table>
        <thead><tr>{cols.map(c=> <th key={c}>{c}</th>)}</tr></thead>
        <tbody>
          {rows.length===0 && (<tr><td colSpan={cols.length} className="muted">Belum ada data.</td></tr>)}
          {rows.map(({ idx, date, data }) => {
            const t = compute(data);
            return (
              <tr key={idx} className="anim-in">
                <td>{date}</td>
                <td>{t.flow}</td>
                <td>{(Number(data.alum_bak1||0) + Number(data.alum_bak2||0)).toString()}</td>
                <td>{t.elec}</td>
                <td style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  <button className="btn ghost" onClick={()=>openDetail({ idx, date, data })}>Detail</button>
                  <button className="btn ghost" onClick={()=>onEdit(idx)}>Edit</button>
                  <button className="btn warn" onClick={()=>remove(idx)}>Hapus</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal open={open} onClose={()=>setOpen(false)} title={`Detail Input — ${plant.toUpperCase()} (${detail?.date||''})`}>
        {detail && (
          <div className="grid" style={{gap:16}}>
            <SectionKeyValues title="Flowmeter" pairs={toPairs(detail.data, FLOWMETER_FIELDS)} />
            <SectionKeyValues title="Bahan Kimia" pairs={toPairs(detail.data, CHEMICAL_FIELDS)} />
            <SectionKeyValues title="Listrik — LWBP" pairs={toPairs(detail.data, ELECTRIC_LWBP)} />
            <SectionKeyValues title="Listrik — WBP" pairs={toPairs(detail.data, ELECTRIC_WBP)} />
            <div className="section anim-in">
              <h4>Data Analisa Kualitas — JarTest</h4>
              <table><thead><tr><th>Shift</th><th>pH</th><th>Dosis (ppm)</th><th>ppm aktual</th></tr></thead>
              <tbody>
                {["I","II","III"].map((s,idx)=> (
                  <tr key={s}><td className="muted">Shift {s}</td><td>{detail.data[`jar_ph_${idx}`]||'-'}</td><td>{detail.data[`jar_dosis_${idx}`]||'-'}</td><td>{detail.data[`jar_ppm_${idx}`]||'-'}</td></tr>
                ))}
              </tbody></table>
              <h4 style={{marginTop:14}}>% Lumpur</h4>
              <table><thead><tr><th>Shift</th><th>Acc I</th><th>Acc II</th><th>Acc III</th></tr></thead>
              <tbody>
                {["I","II","III"].map((s,idx)=> (
                  <tr key={s}><td className="muted">Shift {s}</td><td>{detail.data[`sludge_${idx}_1`]||'-'}</td><td>{detail.data[`sludge_${idx}_2`]||'-'}</td><td>{detail.data[`sludge_${idx}_3`]||'-'}</td></tr>
                ))}
              </tbody></table>
            </div>

            <div className="section anim-in">
              <h4>Data Pressure Header</h4>
              <table><thead><tr><th>Jam</th><th>PS IV</th><th>VI</th></tr></thead>
                <tbody>
                  {HOURS.map(h => (
                    <tr key={h}><td className="muted">{h}</td><td>{detail.data[`ps4_${h}`]||'-'}</td><td>{detail.data[`vi_${h}`]||'-'}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="section anim-in">
              <h4>Data Operasi Unit Filter</h4>
              <table><thead><tr><th>Unit</th><th>Runtime (menit)</th><th>Jeda (menit)</th></tr></thead>
                <tbody>
                  {FILTER_UNITS.map(u => (
                    <tr key={u}><td className="muted">{u}</td><td>{detail.data[`rt_${u}`]||'-'}</td><td>{detail.data[`jeda_${u}`]||'-'}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="section anim-in">
              <h4>Durasi Penggunaan Alat</h4>
              <div className="grid cols-2">
                {Object.entries(PUMP_GROUPS).map(([group, items]) => (
                  <div key={group} className="section">
                    <h4 style={{marginTop:0}}>{group}</h4>
                    <table><tbody>
                      {items.map(([key,label]) => (
                        <tr key={key}><td className="muted">{label}</td><td>{detail.data[`pump_${key}`]||'-'}</td></tr>
                      ))}
                    </tbody></table>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

const Dashboard = () => {
  const [tick, setTick] = useState(0);
  useEffect(()=>{
    const on = ()=>setTick(t=>t+1);
    window.addEventListener("storage", on);
    return ()=>window.removeEventListener("storage", on);
  },[]);
  const db = loadDb();
  const lastK = (db.kerenceng||[]).slice(-1)[0];
  const lastC = (db.cidanau||[]).slice(-1)[0];

  const sumFlow = (e)=> e? FLOWMETER_FIELDS.reduce((s,[k])=> s + (Number(e.data[k]||0)||0),0):0;
  const sumChem = (e)=> e? (Number(e.data.alum_bak1||0)+Number(e.data.alum_bak2||0)+Number(e.data.pemakaian_klorin||0)):0;
  const sumElec = (e)=> e? [...ELECTRIC_LWBP.map(([k])=> Number(e.data[k]||0)||0), ...ELECTRIC_WBP.map(([k])=> Number(e.data[k]||0)||0)].reduce((a,b)=>a+b,0):0;

  const cards = [{
    title:"Total Flowmeter (gabungan)",
    val:(sumFlow(lastK)+sumFlow(lastC)).toLocaleString(),
    sub:`${lastK?lastK.date:'-'} + ${lastC?lastC.date:'-'}`
  },{
    title:"Total Bahan Kimia (Alum+Klorin)",
    val:(sumChem(lastK)+sumChem(lastC)).toLocaleString()+" (kg)",
    sub:"Terakhir per input terbaru"
  },{
    title:"Total Listrik (LWBP+WBP)",
    val:(sumElec(lastK)+sumElec(lastC)).toLocaleString()+" kWh",
    sub:"Estimasi agregat"
  }];

  return (
    <div className="grid cols-3">
      {cards.map((c,i)=> (
        <div className="card panel anim-in" key={i} style={{animationDelay: (i*0.05)+'s'}}>
          <div className="muted" style={{marginBottom:8}}>{c.sub}</div>
          <div style={{fontSize:20,fontWeight:800,marginBottom:6}}>{c.title}</div>
          <div style={{fontSize:36,fontWeight:900,background:"linear-gradient(135deg,var(--accent2),var(--accent))",WebkitBackgroundClip:'text',color:'transparent'}}>{c.val}</div>
        </div>
      ))}
      <div className="card panel anim-in" style={{gridColumn:"1/-1"}}>
        <div className="header">
          <div style={{fontWeight:800}}>Catatan</div>
          <span className="muted">Dashboard ini menampilkan ringkasan dari input terbaru WTP Kerenceng & WTP Cidanau.</span>
        </div>
        <ul>
          <li>Gunakan menu di atas untuk menambah / mengubah data.</li>
          <li>Data disimpan di <i>localStorage</i> (demo). Backend bisa dihubungkan kemudian.</li>
        </ul>
      </div>
    </div>
  );
};

const PlantPage = ({ plant }) => {
  const [mode, setMode] = useState("list");
  const [editIdx, setEditIdx] = useState(null);
  const [version, setVersion] = useState(0);

  useEffect(()=>{
    const on = ()=>setVersion(v=>v+1);
    window.addEventListener("storage", on); return ()=>window.removeEventListener("storage", on);
  },[]);

  const db = loadDb();
  const entries = db[plant] || [];

  const onSaved = () => {
    setMode("list");
    setEditIdx(null);
    setVersion(v=>v+1);
    window.dispatchEvent(new Event("storage"));
  };

  const startEdit = (idx) => { setMode("edit"); setEditIdx(idx); };

  return (
    <div className="grid" style={{gap:16}}>
      {mode!=="list" ? (
        <div className="card panel anim-in">
          <div className="header">
            <div style={{fontWeight:800}}>{mode==="edit"?"Edit":"Input"} WTP {plant.toUpperCase()}</div>
            <button className="btn ghost" onClick={()=>{setMode("list"); setEditIdx(null);}}>Kembali</button>
          </div>
          <WtpForm plant={plant} onSaved={onSaved} initial={mode==="edit"? { __id: editIdx, ...entries[editIdx]}: undefined} />
        </div>
      ) : (
        <div className="card panel anim-in">
          <div className="header">
            <div style={{fontWeight:800}}>Data WTP {plant.toUpperCase()}</div>
            <button className="btn primary" onClick={()=>setMode("create")}>+ Input Baru</button>
          </div>
          <DataTable plant={plant} onEdit={startEdit} />
        </div>
      )}
    </div>
  );
};

// ==========================
// App
// ==========================
export default function App(){
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("dashboard");

  const onLogin = (u) => setUser({...defaultUser, ...u});
  const onLogout = () => setUser(null);

  return (
    <>
      <Style/>
      {!user ? (
        <Login onLogin={onLogin} />
      ) : (
        <div className="topbar anim-in">
          <div className="container">
            <Nav current={tab} setCurrent={setTab} onLogout={onLogout} />
          </div>
        </div>
      )}
      {user && (
        <div className="container" style={{paddingTop:18}}>
          {tab==="dashboard" && (<Dashboard />)}
          {tab==="kerenceng-input" && (<div className="card panel anim-in"><WtpForm plant="kerenceng" onSaved={()=>setTab("kerenceng-data")} /></div>)}
          {tab==="cidanau-input" && (<div className="card panel anim-in"><WtpForm plant="cidanau" onSaved={()=>setTab("cidanau-data")} /></div>)}
          {tab==="kerenceng-data" && (<PlantPage plant="kerenceng" />)}
          {tab==="cidanau-data" && (<PlantPage plant="cidanau" />)}
        </div>
      )}
    </>
  );
}

// Notes for Backend Integration (Optional)
// - Replace localStorage with REST API (Laravel/Node). Endpoints suggested:
//   POST /auth/login
//   GET  /wtp/:plant
//   POST /wtp/:plant
//   PUT  /wtp/:plant/:id
//   DELETE /wtp/:plant/:id
// - Use JWT for auth.
