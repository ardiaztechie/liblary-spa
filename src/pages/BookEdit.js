import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BookEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        year: ""
    });

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/books/${id}`)
        .then(response => {
            setBookData(response.data.data);
        })
        .catch(error => {
            alert('Error fetching book data: ' + error);
        });
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBookData({ ...bookData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/books/${id}`, bookData)
        .then(response => {
            alert('Book updated successfully!');
            navigate('/book');
        })
        .catch(error => {
            alert('Error updating book: ' + error);
        });
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 mb-4 text-gray-800">Edit Book</h1>
            
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
                        <button type="submit" className="btn btn-primary mt-3">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookEdit;
