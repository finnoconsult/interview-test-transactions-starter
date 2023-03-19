import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Transactions } from "./Transactions";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="*" element={<Login />} />
            <Route path="/transactions" element={<Transactions />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
