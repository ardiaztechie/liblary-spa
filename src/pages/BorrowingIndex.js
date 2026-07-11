import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const BorrowingIndex = () => {
    const [borrowings, setBorrowings] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/borrowings')
        .then(response => {
            setBorrowings(response.data.data);
        })
        .catch(error => {
            console.error('Error fetching borrowings data: ', error);
        });
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 mb-2 text-gray-800">Data Peminjaman</h1>
            <p className="mb-4">Daftar transaksi peminjaman buku oleh pengguna.</p>
            
            <Link to="/borrowings/create" className="btn btn-primary mb-4">Tambah Peminjaman</Link>

            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Peminjam (User)</th>
                                    <th>Buku</th>
                                    <th>Tanggal Pinjam</th>
                                </tr>
                            </thead>
                            <tbody>
                                {borrowings.length > 0 ? borrowings.map((borrowing) => (
                                    <tr key={borrowing.id}>
                                        <td>{borrowing.id}</td>
                                        <td>{borrowing.user}</td>
                                        <td>{borrowing.book}</td>
                                        <td>{borrowing.borrow_date}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="text-center">Belum ada data peminjaman</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BorrowingIndex;
