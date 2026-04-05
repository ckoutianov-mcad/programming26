import { Routes, Route } from "react-router-dom";
import { Home } from "./views/Home";
import { FragranceDetail } from "./views/FragranceDetail";
import "./App.css";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home /> } />
        {/** Dynamic Path */}
        <Route path=":id" element={<FragranceDetail />} />
      </Routes>
    </>
  );
}

export default App;
