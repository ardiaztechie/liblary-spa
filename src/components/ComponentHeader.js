import React from "react";

function ComponentHeader() {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Tombol menu kiri */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars"></i>
          </a>
        </li>
      </ul>

      {/* Menu kanan */}
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <span className="nav-link">Selamat Datang, Admin</span>
        </li>
      </ul>
    </nav>
  );
}

export default ComponentHeader;
