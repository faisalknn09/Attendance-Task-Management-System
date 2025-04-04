import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Menu from './components/Menu'
import { useState } from 'react'

const App = () => {
  const location = useLocation();
  const selectedName = location.state?.selectedName || "Faisal"; // Default to "Guest" if no name is passed
  const [title, setTitle] = useState("Dashboard");

  return (
    <div>
      <Menu setTitle={setTitle} />
      <Header title={title} username={selectedName} />
      <Outlet />
    </div>
  );
};

export default App;
