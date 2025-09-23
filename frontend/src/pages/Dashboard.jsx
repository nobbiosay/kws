import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { api } from '../services/api';

export default function Dashboard(){
  const [date,setDate] = useState(()=>new Date().toISOString().slice(0,10));
  const [data,setData] = useState(null);

  useEffect(()=>{ api.get(`/dashboard/${date}`).then(r=>setData(r.data)); },[date]);

  return (
    <Layout>
      <h2 className="title">Dashboard — {date}</h2>
      <div className="card">
        <div className="grid grid-2">
          <div>
            <label className="label">Tanggal</label>
            <input className="input" type="date" value={date} onChange={e=>setDate(e.target.value)} />
          </div>
        </div>
      </div>

      {data && (
        <>
          <div className="card" style={{marginTop:16}}>
            <h3 className="title">Pemakaian Flowmeter (Hari ini − Kemarin)</h3>
            <table className="table">
              <thead><tr><th>WTP</th><th>Item</th><th>Nilai</th></tr></thead>
              <tbody>
                {Object.entries(data.flowmeter).map(([wtp,obj])=>
                  Object.entries(obj).map(([k,v])=> (
                    <tr key={`${wtp}-${k}`}><td>{wtp}</td><td>{k}</td><td>{Number(v).toFixed(2)}</td></tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="card" style={{marginTop:16}}>
            <h3 className="title">Penggunaan Bahan Kimia (Hari Ini)</h3>
            <table className="table">
              <thead><tr><th>WTP</th><th>Item</th><th>Nilai</th></tr></thead>
              <tbody>
                {Object.entries(data.chemicals).map(([wtp,obj])=>
                  Object.entries(obj).map(([k,v])=> (
                    <tr key={`${wtp}-chem-${k}`}><td>{wtp}</td><td>{k}</td><td>{v}</td></tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="card" style={{marginTop:16}}>
            <h3 className="title">Penggunaan Listrik (Hari ini − Kemarin)</h3>
            <table className="table">
              <thead><tr><th>WTP</th><th>Item</th><th>Nilai (kWh)</th></tr></thead>
              <tbody>
                {Object.entries(data.electricity).map(([wtp,obj])=>
                  Object.entries(obj).map(([k,v])=> (
                    <tr key={`${wtp}-elec-${k}`}><td>{wtp}</td><td>{k}</td><td>{Number(v).toFixed(2)}</td></tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Layout>
  );
}
