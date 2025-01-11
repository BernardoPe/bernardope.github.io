import { Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Pages/Home/home";
import { Route } from "react-router-dom";
import Header from "./Components/Layouts/Header/Header";
import Education from "./Components/Pages/Education/education";
import Skills from "./Components/Pages/Skills/skills";
import Footer from "./Components/Layouts/Footer/footer";
import Projects from "./Components/Pages/Projects/projects";
import About from "./Components/Pages/About/about";

function App() {
  return (
    <div className="App">
      <div className="App-content">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/education" element={<Education />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
