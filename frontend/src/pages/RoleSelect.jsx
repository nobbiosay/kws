import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function RoleSelect(){
  const { chooseRole } = useAuth();
  const nav = useNavigate();
  const pick = (r)=>{ chooseRole(r); nav('/dashboard'); };
  return (
    <div className="container">
      <div className="card" style={{maxWidth:640, margin:'60px auto'}}>
        <h2 className="title">Pilih Sebagai</h2>
        <div className="grid grid-3">
          <button className="btn" onClick={()=>pick('operator')}>Operator</button>
        </div>
      </div>
    </div>
  );
}
