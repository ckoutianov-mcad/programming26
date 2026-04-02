import { Routes, Route } from "react-router-dom";
import { Home } from "./links/Home";
import { Songs } from "./links/Songs";
import musicData from "./assets/music.json"
import './App.css'

function App() {
  return (
    <>
    <h1>Choose your favorite song:</h1>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path=":slug" element={<Songs data={musicData} />} />
    </Routes>
    </>
  )
}

export default App
