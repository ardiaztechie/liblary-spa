import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookIndex = () => {
    const [books, setBooks] = useState([]);
    const loadBooks = () => {
        axios.get('http://127.0.0.1:8000/api/books')
        .then(response => {
            setBooks(response.data.data);
        })
        .catch(error => {
            alert('Error fetching data: ' + error);
        });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this book?')){
            axios.delete(`http://127.0.0.1:8000/api/books/${id}`)
            .then(() => {
                alert('Data deleted successfully');
                loadBooks();
            })
            .catch(error => {
                alert('Error deleting the data: ' + error);
            });
        }
    };

    useEffect(() => {
        loadBooks();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Book Data</h1>
            <Link to="/book/create" className="btn btn-primary mb-2">Create</Link>
            
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Year</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((book, index) => (
                                    <tr key={index}>
                                        <td>{book.id}</td>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.year}</td>
                                        <td>
                                            <Link 
                                                to={`/book/edit/${book.id}`} 
                                                className="btn btn-sm btn-info">Edit
                                            </Link>
                                            <button onClick={() => 
                                                handleDelete(book.id)} 
                                                className="btn btn-sm btn-danger ml-1">Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookIndex;
