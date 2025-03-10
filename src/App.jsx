import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Transactions from './pages/Transactions';
import Login from './pages/Login';
import './App.css';
import NotFound from './pages/NotFound';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;