import { useCallback, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navabar';
import { AuthContext } from './context/auth-context';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import UserBord from './pages/UserBoard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // take
  const [userId, setUserId] = useState(false);
  const [username, setUsername] = useState('Guest');

  const login = useCallback((uid, username) => {
    setIsLoggedIn(true);
    setUserId(uid);
    setUsername(username);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    setUsername('Guest');
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Routes>
        {/* Redirect to home page if use is logged in  */}
        <Route path="/board" element={<UserBord />} />
        <Route path="*" element={<Navigate to="/board" replace />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    );
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
        <Navbar />
        {routes}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
