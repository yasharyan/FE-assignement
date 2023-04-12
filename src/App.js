import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Register from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default App;
