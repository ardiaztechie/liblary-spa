import React, { useState, useEffect } from "react";
import axios from "axios";

function BookIndex() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/books")
      .then((response) => {
        // Logika pencegah macet: otomatis deteksi format data dari Laravel
        if (response.data && response.data.data) {
          setBooks(response.data.data); // Jika dibungkus API Resource
        } else if (Array.isArray(response.data)) {
          setBooks(response.data); // Jika Laravel langsung me-return array mentah
        } else {
          setBooks([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title text-bold">Daftar Buku Perpustakaan</h3>
      </div>
      <div className="card-body p-0">
        <table className="table table-striped table-bordered m-0">
          <thead>
            <tr>
              <th style={{ width: 60 }}>#</th>
              <th>Judul Buku</th>
              <th>Pengarang</th>
            </tr>
          </thead>
          <tbody>
            {books && books.length > 0 ? (
              books.map((book, index) => (
                <tr key={index}>
                  <td>{index + 1}.</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-3">
                  Data buku di database Laravel kamu masih kosong. Coba isi
                  datanya dulu di database!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookIndex;
