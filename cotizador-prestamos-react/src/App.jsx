import {useState, useEffect} from "react";
import Header from "./components/Header";
import Button from "./components/Button";
import { formatearDinero, calcularTotalPagar } from './helpers';


function App() {
 const [cantidad, setCantidad ] = useState(10000);
 const [meses, setMeses] = useState(6);
 const [total, setTotal] = useState(0);
 const [pago, setPago] = useState(0);

 useEffect(() => {
  const resultadoTotalPagar = calcularTotalPagar(cantidad, meses);
  setTotal(resultadoTotalPagar);

   setPago(total / meses);
 }, [cantidad, meses]);

 useEffect(() => {
   // Calcular el pago mensual
  setPago(total / meses);
 }, [total]);
 
 const MIN = 0;
 const MAX = 20000;
 const STEP = 100;

 function handleChange(e) {
    setCantidad(+e.target.value);
 }

 function handleClickDecremento() {
    const valor = cantidad - STEP
    
    
    
    if( valor < MIN) {
      alert('Cantidad no válida')
      return
    }

    setCantidad(valor);
 }

 function handleClickIncremento() {
  const valor = cantidad + STEP
    
  if( valor > MAX) {
    alert('Cantidad no válida')
    return
  }

  setCantidad(valor);
}

  return (
      <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
        
          <Header />

          <div className="flex justify-between my-6">
            <Button 
            operador="-" // Nombre del componente = "prop"
            fn={handleClickDecremento}
            />
              
            <Button 
            operador="+"
            fn={handleClickIncremento}
            /> 

          </div>
          <input type="range"
          className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600"
          onChange={handleChange}
          min={MIN}
          max={MAX}
          step={STEP}
          value={cantidad}
          />

          <p className="text-center my-10 text-5xl font-extrabold text-indigo-600"> 
          {formatearDinero(cantidad)} 
          </p>
          
          <h2 className="text-center my-10 text-5xl font-extrabold text-indigo-600">
            Elige un <span className="text-indigo-600">Plazo</span> a pagar
          </h2>

          <select 
          className="mg-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center
          text-xl font-bold text-gray-500"
          value={meses}
          onChange={ e => setMeses(+e.target.value)}
          >
            <option value="6"> 6 Meses </option>
            <option value="12"> 12 Meses </option>
            <option value="24"> 24 Meses</option>
          </select>

          <div className="my-5 space-y-3 bg-gray-50 p-5">
          <h2 className="text-center my-10 text-5xl font-extrabold text-indigo-600">
            Resumen <span className="text-indigo-600">Plazo</span> de pagos
          </h2>

          <p className="text-xl text-gray-500 text-center font-bold">{meses} Meses </p>
          <p className="text-xl text-gray-500 text-center font-bold"> {formatearDinero(total)} Total a pagar</p>
          <p className="text-xl text-gray-500 text-center font-bold"> {formatearDinero(pago)} Mensuales </p>
          </div>
      </div>
  )
}

export default App;
