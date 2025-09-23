import { createContext, useContext, useState } from 'react';
import { api, setToken } from '../services/api';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({children}){
  const [token,setTok] = useState(localStorage.getItem('token'));
  const [role,setRole] = useState(localStorage.getItem('role')||'');
  if (token) setToken(token);

  const login = async ({operator_id,password}) => {
    const {data} = await api.post('/login',{operator_id,password});
    setTok(data.token); localStorage.setItem('token',data.token); setToken(data.token);
  };

  const chooseRole = (r) => { setRole(r); localStorage.setItem('role',r); };
  const logout = () => { localStorage.clear(); setTok(null); setRole(''); };

  return <AuthContext.Provider value={{token,role,login,chooseRole,logout}}>{children}</AuthContext.Provider>;
}
