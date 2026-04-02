import { Link, Route, Routes } from 'react-router-dom'
import { Home } from './links/Home';
import { Llamas } from "./links/Llamas";
import { Alpaca } from "./links/Alpaca";
import './App.css'

function App() {

  return (
    <>
      {/**Navigation */}
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/llamas">Llamas</Link></li>
        <li><Link to="/alpacas">Alpacas</Link></li>
      </ul>
      {/**Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/llamas" element={<Llamas />} />
        <Route path="/alpacas" element={<Alpaca />} />
      </Routes>
    </>
  );
}

export default App
