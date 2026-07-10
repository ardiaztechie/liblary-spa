import React from "react";
import { Routes, Route } from "react-router-dom";
import BookIndex from "./pages/BookIndex";

function Dashboard() {
  return <h1 className="m-0 text-dark">Dashboard Page</h1>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/books" element={<BookIndex />} />
    </Routes>
  );
}

export default AppRoutes;
