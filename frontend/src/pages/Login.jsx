import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login(){
  const [operator_id,setId] = useState('');
  const [password,setPw] = useState('');
  const nav = useNavigate();
  const { login } = useAuth();

  const submit = async (e)=>{
    e.preventDefault();
    await login({operator_id,password});
    nav('/role');
  };

  return (
    <div className="container">
      <div className="card" style={{maxWidth:480, margin:'60px auto'}}>
        <h2 className="title">Masuk</h2>
        <p className="subtitle">Silakan login untuk melanjutkan.</p>
        <form className="grid" onSubmit={submit}>
          <div>
            <label className="label">ID Operator</label>
            <input className="input" value={operator_id} onChange={e=>setId(e.target.value)} />
          </div>
          <div>
            <label className="label">Password</label>
            <input className="input" type="password" value={password} onChange={e=>setPw(e.target.value)} />
          </div>
          <button className="btn" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
