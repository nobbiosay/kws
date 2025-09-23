import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar(){
  const { logout } = useAuth();
  return (
    <div className="navbar">
      <strong>Krakatau Water Solution</strong>
      <NavLink to="/dashboard" className={({isActive})=>isActive?'active':''}>Dashboard</NavLink>
      <NavLink to="/kerenceng/input" className={({isActive})=>isActive?'active':''}>Input WTP Kerenceng</NavLink>
      <NavLink to="/cidanau/input" className={({isActive})=>isActive?'active':''}>Input WTP Cidanau</NavLink>
      <NavLink to="/kerenceng/data" className={({isActive})=>isActive?'active':''}>Data WTP Kerenceng</NavLink>
      <NavLink to="/cidanau/data" className={({isActive})=>isActive?'active':''}>Data WTP Cidanau</NavLink>
      <span style={{marginLeft:'auto'}} />
      <button className="btn" onClick={logout}>Logout</button>
    </div>
  );
}
