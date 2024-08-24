import { useEffect, useState } from 'react'
import './App.css'


function factorial(n) {
  if (n === 0) return 1;
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

function binomialCoefficient(n, k) {
  return factorial(n) / (factorial(k) * factorial(n - k));
}

function binomialDistribution(n, k, p) {
  const coefficient = binomialCoefficient(n, k);
  const probability = Math.pow(p, k) * Math.pow(1 - p, n - k);
  return coefficient * probability;
}

function cumulativeBinomialDistribution(n, k, p) {
  let cumulativeProbability = 0;
  
  for (let i = k; i <= n; i++) {
    cumulativeProbability += binomialDistribution(n, i, p);
  }

  return cumulativeProbability;
}

function App() {

  const [count, setCount] = useState(() => {
    const contadorGuardado = localStorage.getItem('count');
    return contadorGuardado ? parseInt(contadorGuardado, 10) : 0;
  }
  )


  useEffect(() => {
    localStorage.setItem('count', count)
  }, [count])

  const sumContador = () => { setCount(count + 1)}
  const resetearContador = () => { setCount(count * 0)}
  const restarContador = () => { setCount(count - 1)}

  return (
    <>
      <article className='main'>
        <div>
          <h1><img className='gold' src='/gold.webp'/>Contador Cajas<img className='tweak' src='/weak.webp'/></h1>
        </div>
        <div className="card">
          <h1>{count}</h1>
          <button onClick={sumContador}>
            -$2500
          </button>
          <button onClick={resetearContador}>
            <span style={{color: "green"}}>reset</span>
          </button>
          <button onClick={restarContador}>
            <span style={{color: "blue"}}>-1</span>
          </button>
        </div>
        <div className='stats'>
          <h2>Estadisticas</h2>
          <div className='row'>
            <span>Probabilidad</span>
            <input type="text" readOnly value={"1/385"} />
          </div>
          <div className='row'>
            <span>B(n,p) (%)</span>
            <input type="text" readOnly value={`${(cumulativeBinomialDistribution(count, 1, 0.0026) * 100).toFixed(2)}%`}/>
          </div>
          <div className='row'>
            <span>Dinero Gastado (Llaves)</span>
            <input type='text' readOnly value={`$${(count*2500)}`}/>
          </div>
        </div>
      </article>
    </>
  )
}

export default App