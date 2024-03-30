import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Website from "./pages/website";
function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<Website/>}></Route> 
      
    </Routes>
    </Suspense>
    </BrowserRouter>
  );
}

export default App;
