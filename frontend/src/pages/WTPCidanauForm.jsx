import { useState } from 'react';
import Layout from '../components/Layout';
import Field from '../components/Field';
import { api } from '../services/api';
import { FLOWMETER_KEYS, CHEM_KEYS } from './config';

export default function WTPCidanauForm(){
  const [date,setDate] = useState(()=>new Date().toISOString().slice(0,10));
  const [flowmeter,setFlow] = useState({});
  const [chem,setChem] = useState({});
  const [electricity,setElec] = useState({});
  const [saving,setSaving] = useState(false);

  const onF = (k,v)=> setFlow(s=>({...s,[k]:v}));
  const onC = (k,v)=> setChem(s=>({...s,[k]:v}));

  const save = async()=>{
    setSaving(true);
    await api.post('/entries',{
      date, wtp:'cidanau', flowmeter, chemicals:chem, electricity
    });
    setSaving(false);
    alert('Tersimpan');
  };

  return (
    <Layout>
      <h2 className="title">Input Data WTP Cidanau</h2>
      <div className="card">
        <div className="grid grid-3">
          <div>
            <label className="label">Tanggal</label>
            <input className="input" type="date" value={date} onChange={e=>setDate(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="card" style={{marginTop:16}}>
        <h3 className="title">1) Flowmeter</h3>
        <div className="grid grid-3">
          {FLOWMETER_KEYS.map(([k,l])=> (
            <Field key={k} label={l} name={k} value={flowmeter[k]} onChange={onF} />
          ))}
        </div>
      </div>

      <div className="card" style={{marginTop:16}}>
        <h3 className="title">2) Bahan Kimia</h3>
        <div className="grid grid-3">
          {CHEM_KEYS.map(([k,l])=> (
            <Field key={k} label={l} name={k} value={chem[k]} onChange={onC} />
          ))}
        </div>
      </div>

      <div className="card" style={{marginTop:16}}>
        <h3 className="title">3) Listrik (kWh)</h3>
        <p className="subtitle">Masukkan label sesuai (Trafo, PS, WBP/LWBP). Anda bisa menambah key bebas via JSON di bawah.</p>
        <textarea className="input" rows={8} placeholder="{
  \"trafo1_ak04_lwbp\": 0,
  \"trafo1_ak04_wbp\": 0
}"
          value={JSON.stringify(electricity,null,2)}
          onChange={e=>{try{setElec(JSON.parse(e.target.value))}catch{}}}
        />
      </div>

      <div style={{marginTop:16}}>
        <button className="btn" onClick={save} disabled={saving}>{saving?'Menyimpan...':'Simpan'}</button>
      </div>
    </Layout>
  );
}
