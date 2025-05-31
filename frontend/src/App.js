import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { useState } from 'react';
import RefrshHandler from './RefrshHandler';
import LandingPage from './pages/Landingpage';
import Alerts from './pages/alerts';
import History from './pages/history';
import Live from './pages/live';
import Payment from './pages/Payment';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
        <Route path='/live' element={<PrivateRoute element={<Live />} />} />
        <Route path='/alerts' element={<PrivateRoute element={<Alerts />} />} />
        <Route path='/history' element={<PrivateRoute element={<History />} />} />
        <Route path='/payment' element={<Payment />} />
      </Routes>
    </div>
  );
}

export default App;
