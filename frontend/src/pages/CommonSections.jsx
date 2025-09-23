import Field from '../components/Field';
import { PRESSURE_TIMES, FILTER_UNITS } from './config';
import { useState } from 'react';

export function QualitySection({value, onChange}){
  const [jar, setJar] = useState(value?.jar_test || [
    {shift:'I', ph:'', dosis_ppm:'', ppm_aktual:''},
    {shift:'II', ph:'', dosis_ppm:'', ppm_aktual:''},
    {shift:'III', ph:'', dosis_ppm:'', ppm_aktual:''},
  ]);
  const [lumpur, setLumpur] = useState(value?.lumpur || [
    {shift:'I', acc1:'', acc2:'', acc3:''},
    {shift:'II', acc1:'', acc2:'', acc3:''},
    {shift:'III', acc1:'', acc2:'', acc3:''},
  ]);

  const update = () => onChange({jar_test:jar, lumpur});

  const updJar = (i,k,v)=>{
    const n=[...jar]; n[i]={...n[i],[k]:v}; setJar(n); update();
  }
  const updLumpur = (i,k,v)=>{
    const n=[...lumpur]; n[i]={...n[i],[k]:v}; setLumpur(n); update();
  }

  return (
    <>
      <h4 className="title">4) Data Analisa Kualitas</h4>
      <div style={{overflowX:'auto'}}>
        <table className="table">
          <thead><tr><th>Shift</th><th>pH</th><th>Dosis (ppm)</th><th>ppm aktual</th></tr></thead>
          <tbody>
            {jar.map((row,i)=>(
              <tr key={i}>
                <td>{row.shift}</td>
                <td><input className="input" value={row.ph} onChange={e=>updJar(i,'ph',e.target.value)} /></td>
                <td><input className="input" value={row.dosis_ppm} onChange={e=>updJar(i,'dosis_ppm',e.target.value)} /></td>
                <td><input className="input" value={row.ppm_aktual} onChange={e=>updJar(i,'ppm_aktual',e.target.value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="subtitle">Persentase Lumpur (Acc I/II/III)</p>
      <div style={{overflowX:'auto'}}>
        <table className="table">
          <thead><tr><th>Shift</th><th>Acc I (%)</th><th>Acc II (%)</th><th>Acc III (%)</th></tr></thead>
          <tbody>
            {lumpur.map((row,i)=>(
              <tr key={i}>
                <td>{row.shift}</td>
                <td><input className="input" value={row.acc1} onChange={e=>updLumpur(i,'acc1',e.target.value)} /></td>
                <td><input className="input" value={row.acc2} onChange={e=>updLumpur(i,'acc2',e.target.value)} /></td>
                <td><input className="input" value={row.acc3} onChange={e=>updLumpur(i,'acc3',e.target.value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function DurationsSection({value, onChange}){
  const [state, setState] = useState(value || {
    pompa_air_bersih_menit: {},
    pompa_alum: {},
    pompa_kapur: {},
    pompa_vakum: {},
    pompa_booster_menit: {},
    accelerator: {},
    pompa_waduk_menit: {}
  });
  const upd = (group,key,val)=>{
    const n = {...state, [group]: {...state[group], [key]: val}};
    setState(n); onChange(n);
  };
  const range = (a,b)=>Array.from({length:b-a+1}, (_,i)=>a+i);

  return (
    <>
      <h4 className="title">5) Data Durasi Penggunaan Alat (menit)</h4>

      <p className="subtitle">Pompa Air Bersih</p>
      <div className="grid grid-4">
        {range(43,47).concat(range(60,64)).concat(range(70,75)).map(n=>
          <div key={n}><label className="label">Pompa {n}</label><input className="input" onChange={e=>upd('pompa_air_bersih_menit', `pompa_${n}`, e.target.value)} /></div>
        )}
      </div>

      <p className="subtitle">Pompa Alum</p>
      <div className="grid grid-4">
        {range(29,33).map(n=>
          <div key={n}><label className="label">Pompa {n}</label><input className="input" onChange={e=>upd('pompa_alum', `pompa_${n}`, e.target.value)} /></div>
        )}
      </div>

      <p className="subtitle">Pompa Kapur</p>
      <div className="grid grid-4">
        {[37,38].map(n=>
          <div key={n}><label className="label">Pompa {n}</label><input className="input" onChange={e=>upd('pompa_kapur', `pompa_${n}`, e.target.value)} /></div>
        )}
      </div>

      <p className="subtitle">Pompa Vakum</p>
      <div className="grid grid-4">
        {['41m1','41m2'].map(n=>
          <div key={n}><label className="label">Pompa {n}</label><input className="input" onChange={e=>upd('pompa_vakum', `pompa_${n}`, e.target.value)} /></div>
        )}
      </div>

      <p className="subtitle">Pompa Booster</p>
      <div className="grid grid-4">
        {['shock503_m1','shock503_m2','shock503_m3','cont503_m3','cont503_m4'].map(k=>
          <div key={k}><label className="label">{k.replace('_',' ').toUpperCase()}</label><input className="input" onChange={e=>upd('pompa_booster_menit', k, e.target.value)} /></div>
        )}
      </div>

      <p className="subtitle">Accelerator</p>
      <div className="grid grid-4">
        {['acc1','acc2','acc3'].map(k=>
          <div key={k}><label className="label">{k.upper()}</label><input className="input" onChange={e=>upd('accelerator', k, e.target.value)} /></div>
        )}
      </div>

      <p className="subtitle">Pompa Waduk</p>
      <div className="grid grid-4">
        {[1,2,3,4,5].map(n=>
          <div key={n}><label className="label">Pompa {n}</label><input className="input" onChange={e=>upd('pompa_waduk_menit', `${n}`, e.target.value)} /></div>
        )}
      </div>
    </>
  );
}

export function PressureSection({value, onChange}){
  const init = (value?.rows) || PRESSURE_TIMES.map(t=>({jam:t, ps4:'', ps6:''}));
  const [rows,setRows] = useState(init);
  const upd = (i,k,v)=>{
    const n=[...rows]; n[i]={...n[i],[k]:v}; setRows(n); onChange({rows:n});
  }
  return (
    <>
      <h4 className="title">6) Data Pressure Header</h4>
      <small className="helper">Kolom: PS IV, PS VI</small>
      <div style={{overflowX:'auto'}}>
        <table className="table">
          <thead><tr><th>Jam</th><th>PS IV</th><th>PS VI</th></tr></thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={i}>
                <td>{r.jam}</td>
                <td><input className="input" value={r.ps4} onChange={e=>upd(i,'ps4',e.target.value)} /></td>
                <td><input className="input" value={r.ps6} onChange={e=>upd(i,'ps6',e.target.value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function FiltersSection({value,onChange}){
  const init = (value?.rows) || FILTER_UNITS.map(u=>({unit:u, durasi_runtime_menit:'', jeda_start_stop_menit:''}));
  const [rows,setRows] = useState(init);
  const upd = (i,k,v)=>{
    const n=[...rows]; n[i]={...n[i],[k]:v}; setRows(n); onChange({rows:n});
  }
  return (
    <>
      <h4 className="title">7) Data Operasi Unit Filter</h4>
      <div style={{overflowX:'auto'}}>
        <table className="table">
          <thead><tr><th>Unit</th><th>Durasi Runtime (menit)</th><th>Jeda Start/Stop (menit)</th></tr></thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={i}>
                <td>{r.unit}</td>
                <td><input className="input" value={r.durasi_runtime_menit} onChange={e=>upd(i,'durasi_runtime_menit',e.target.value)} /></td>
                <td><input className="input" value={r.jeda_start_stop_menit} onChange={e=>upd(i,'jeda_start_stop_menit',e.target.value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
