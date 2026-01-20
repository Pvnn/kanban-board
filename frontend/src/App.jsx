import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'

function App() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    const checkHealth = async () => {
      try {
        await axios.get("http://127.0.0.1:5000/api/health");
        setStatus("healthy");
      } catch (err) {
        console.error(err);
        setStatus("unreachable");
      }
    }
    checkHealth();
  }, [])

  return (
    <>
      <p className='class="text-3xl font-bold underline'>Welcome to TaskB app</p>
      <p>Backend is {status}</p>
    </>
  )
}

export default App
