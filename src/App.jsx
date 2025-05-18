import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Formulario from './components/Formulario';
import ProductList from './components/ProductList';

function App() {
  return (
    <Router>
      {/* Navbar clara, fija en la parte superior */}
      <nav className="navbar navbar-light bg-light fixed-top shadow-sm">
        <div className="container">
          <ul className="navbar-nav d-flex flex-row gap-3 flex-wrap mb-0">
            <li className="nav-item">
              <Link className="nav-link fw-bold text-dark" to="/">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold text-dark" to="/form">Formulario</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Contenido con espacio superior para que no lo tape el navbar */}
      <div className="container" style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/form" element={<Formulario />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
