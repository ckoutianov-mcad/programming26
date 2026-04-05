import { Routes, Route } from "react-router-dom";
import { Home } from "./views/Home";
import { FragranceDetail } from "./views/FragranceDetail";
import fragranceData from "./assets/fragrance-data.json"
import "./App.css";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home /> } />
        {/** Dynamic Path */}
        <Route path=":id" element={<FragranceDetail data={fragranceData}/>} />
      </Routes>
    </>
  );
}

export default App;
