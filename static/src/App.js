import { Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Pages/home';
import { Route } from 'react-router-dom';
import Header from './components/models/Header';
import Education from './components/Pages/education';
import Skills from './components/Pages/skills';

function App() {
  return (
    <div className="App">
      <div className="App-content">
      <Header/> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/skills" element={<Skills/>} />
        <Route path="/education" element={<Education/>} />
      </Routes>  
      </div>
    </div>
  );
}

export default App;
