import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { api } from '../services/api';

function RenderKV({obj}){
  if(!obj) return <em>-</em>;
  return (
    <table className="table">
      <thead><tr><th>Key</th><th>Nilai</th></tr></thead>
      <tbody>
        {Object.entries(obj).map(([k,v])=> <tr key={k}><td>{k}</td><td>{String(v)}</td></tr>)}
      </tbody>
    </table>
  );
}

function RenderQuality({q}){
  if(!q) return <em>-</em>;
  return (
    <>
      <h4>Jar Test</h4>
      <table className="table">
        <thead><tr><th>Shift</th><th>pH</th><th>Dosis (ppm)</th><th>ppm aktual</th></tr></thead>
        <tbody>
          {(q.jar_test||[]).map((r,i)=><tr key={i}><td>{r.shift}</td><td>{r.ph}</td><td>{r.dosis_ppm}</td><td>{r.ppm_aktual}</td></tr>)}
        </tbody>
      </table>
      <h4>% Lumpur</h4>
      <table className="table">
        <thead><tr><th>Shift</th><th>Acc I</th><th>Acc II</th><th>Acc III</th></tr></thead>
        <tbody>
          {(q.lumpur||[]).map((r,i)=><tr key={i}><td>{r.shift}</td><td>{r.acc1}</td><td>{r.acc2}</td><td>{r.acc3}</td></tr>)}
        </tbody>
      </table>
    </>
  );
}

function RenderPressure({p}){
  if(!p) return <em>-</em>;
  return (
    <table className="table">
      <thead><tr><th>Jam</th><th>PS IV</th><th>PS VI</th></tr></thead>
      <tbody>
        {(p.rows||[]).map((r,i)=><tr key={i}><td>{r.jam}</td><td>{r.ps4}</td><td>{r.ps6}</td></tr>)}
      </tbody>
    </table>
  );
}

function RenderFilters({f}){
  if(!f) return <em>-</em>;
  return (
    <table className="table">
      <thead><tr><th>Unit</th><th>Durasi Runtime (menit)</th><th>Jeda Start/Stop (menit)</th></tr></thead>
      <tbody>
        {(f.rows||[]).map((r,i)=><tr key={i}><td>{r.unit}</td><td>{r.durasi_runtime_menit}</td><td>{r.jeda_start_stop_menit}</td></tr>)}
      </tbody>
    </table>
  );
}

export default function DataPage({wtpTitle, wtpQuery}){
  const [items,setItems] = useState([]);
  useEffect(()=>{ api.get(`/entries?wtp=${wtpQuery}`).then(r=>setItems(r.data.data)); },[wtpQuery]);

  return (
    <Layout>
      <h2 className="title">Data WTP {wtpTitle}</h2>
      {items?.map?.(it=> (
        <div className="card" key={it.id} style={{marginBottom:16}}>
          <h3 className="title">Tanggal: {it.date}</h3>
          <h4>Flowmeter</h4>
          <RenderKV obj={it.flowmeter} />
          <h4>Bahan Kimia</h4>
          <RenderKV obj={it.chemicals} />
          <h4>Listrik (kWh)</h4>
          <RenderKV obj={it.electricity} />
          <RenderQuality q={it.quality} />
          <h4>Durasi Penggunaan Alat</h4>
          <RenderKV obj={it.durations} />
          <h4>Pressure Header</h4>
          <RenderPressure p={it.pressure} />
          <h4>Operasi Unit Filter</h4>
          <RenderFilters f={it.filters} />
        </div>
      ))}
    </Layout>
  );
}

export function DataWTPCidanau(){ return <DataPage wtpTitle='Cidanau' wtpQuery='cidanau'/> }
export default DataWTPCidanau;