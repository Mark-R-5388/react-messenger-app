import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <div className="navbar_container">
        <h3>
          <Link to="/">Messenger</Link>
        </h3>
        <div>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}
