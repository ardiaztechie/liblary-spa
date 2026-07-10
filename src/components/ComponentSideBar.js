import React from "react";
import { Link } from "react-router-dom";

function ComponentSideBar() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="/" className="brand-link">
        <span className="brand-text font-weight-light pl-3">Library SPA</span>
      </Link>

      <div className="sidebar">
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
          >
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p> Dashboard</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/books" className="nav-link">
                <i className="nav-icon fas fa-book"></i>
                <p> Menu Perpus</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default ComponentSideBar;
