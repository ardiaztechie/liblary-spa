import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const BorrowingCreate = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        book_id: "",
        user_id: ""
    });

    useEffect(() => {
        // Load data buku
        axios.get('http://127.0.0.1:8000/api/books')
        .then(response => setBooks(response.data.data))
        .catch(error => console.error(error));

        // Load data users (peminjam)
        axios.get('http://127.0.0.1:8000/api/users')
        .then(response => setUsers(response.data.data))
        .catch(error => console.error(error));
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('http://127.0.0.1:8000/api/borrowings', formData)
        .then(response => {
            alert('Data peminjaman berhasil disimpan!');
            navigate('/borrowings');
        })
        .catch(error => {
            alert('Gagal menyimpan: ' + error.message);
        });
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 mb-4 text-gray-800">Tambah Peminjaman</h1>
            <Link to="/borrowings" className="btn btn-secondary mb-4">Kembali</Link>
            
            <div className="card shadow mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Pilih Peminjam (User):</label>
                            <select className="form-control" name="user_id" value={formData.user_id} onChange={handleInputChange} required>
                                <option value="">-- Pilih User --</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Pilih Buku:</label>
                            <select className="form-control" name="book_id" value={formData.book_id} onChange={handleInputChange} required>
                                <option value="">-- Pilih Buku --</option>
                                {books.map(book => (
                                    <option key={book.id} value={book.id}>{book.title} (Stok: 1)</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-success mt-3">Simpan Peminjaman</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BorrowingCreate;
