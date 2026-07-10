import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ComponentSideBar from "./components/ComponentSideBar";
import ComponentHeader from "./components/ComponentHeader";
import ComponentFooter from "./components/ComponentFooter";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    // Router harus ditaruh paling luar di sini supaya tag <Link> di Sidebar aman
    <Router>
      <div className="wrapper">
        {/* Header / Navbar Atas */}
        <ComponentHeader />

        {/* Sidebar Samping */}
        <ComponentSideBar />

        {/* Konten Halaman Utama */}
        <div
          className="content-wrapper"
          style={{ minHeight: "100vh", padding: "20px" }}
        >
          <section className="content">
            <div className="container-fluid">
              <AppRoutes />
            </div>
          </section>
        </div>

        {/* Footer Bawah */}
        <ComponentFooter />
      </div>
    </Router>
  );
}

export default App;
