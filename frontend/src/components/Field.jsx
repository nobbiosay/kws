export default function Field({label,name,type='number',value,onChange,step='any'}){
  return (
    <div>
      <label className="label" htmlFor={name}>{label}</label>
      <input id={name} className="input" type={type} value={value ?? ''} step={step}
        onChange={e=>onChange(name, e.target.value)} />
    </div>
  );
}
