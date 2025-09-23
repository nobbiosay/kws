import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import RoleSelect from './pages/RoleSelect';
import Dashboard from './pages/Dashboard';
import WTPKerencengForm from './pages/WTPKerencengForm';
import WTPCidanauForm from './pages/WTPCidanauForm';
import DataWTPKerenceng from './pages/DataWTPKerenceng';
import DataWTPCidanau from './pages/DataWTPCidanau';
import { useAuth } from './context/AuthContext';

function Private({children}){
  const { token } = useAuth();
  return token ? children : <Navigate to="/" />;
}

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/role" element={<Private><RoleSelect/></Private>} />
      <Route path="/dashboard" element={<Private><Dashboard/></Private>} />
      <Route path="/kerenceng/input" element={<Private><WTPKerencengForm/></Private>} />
      <Route path="/cidanau/input" element={<Private><WTPCidanauForm/></Private>} />
      <Route path="/kerenceng/data" element={<Private><DataWTPKerenceng/></Private>} />
      <Route path="/cidanau/data" element={<Private><DataWTPCidanau/></Private>} />
    </Routes>
  );
}
