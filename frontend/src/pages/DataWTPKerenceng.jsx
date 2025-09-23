import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { api } from '../services/api';

export default function DataWTPKerenceng(){
  const [items,setItems] = useState([]);
  useEffect(()=>{ api.get('/entries?wtp=kerenceng').then(r=>setItems(r.data.data)); },[]);

  return (
    <Layout>
      <h2 className="title">Data WTP Kerenceng</h2>
      <div className="card">
        <table className="table">
          <thead><tr><th>Tanggal</th><th>Flowmeter</th><th>Bahan Kimia</th><th>Listrik</th></tr></thead>
          <tbody>
            {items?.map?.(it=> (
              <tr key={it.id}>
                <td>{it.date}</td>
                <td><span className="badge">{Object.keys(it.flowmeter||{}).length} item</span></td>
                <td><span className="badge">{Object.keys(it.chemicals||{}).length} item</span></td>
                <td><span className="badge">{Object.keys(it.electricity||{}).length} item</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
