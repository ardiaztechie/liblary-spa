import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookCreate = () => {
    const navigate = useNavigate();
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        year: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBookData({ ...bookData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/api/books', bookData)
        .then(response => {
            alert('Book added successfully!');
            navigate('/book');
        })
        .catch(error => {
            alert('Error adding book: ' + error);
        });
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 mb-2 text-gray-800">Add New Book</h1>
            <Link to="/book" className="btn btn-secondary mb-4">Back</Link>
            
            <div className="card shadow mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Title:</label>
                            <input type="text" className="form-control" name="title" value={bookData.title} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Author:</label>
                            <input type="text" className="form-control" name="author" value={bookData.author} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Year:</label>
                            <input type="number" className="form-control" name="year" value={bookData.year} onChange={handleInputChange} required />
                        </div>
                        <button type="submit" className="btn btn-success mt-3">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookCreate;
