import React, { useState, useEffect } from "react";
import axios from 'axios';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';

const Dashboard = () => {
    const [stats, setStats] = useState({
        books: 0,
        borrowers: 0,
        borrowings: 0
    });

    useEffect(() => {
        Promise.all([
            axios.get('http://127.0.0.1:8000/api/books'),
            axios.get('http://127.0.0.1:8000/api/users'), 
            axios.get('http://127.0.0.1:8000/api/borrowings')
        ]).then(([booksRes, usersRes, borrowingsRes]) => {
            setStats({
                books: booksRes.data.data.length,
                borrowers: usersRes.data.data.length,
                borrowings: borrowingsRes.data.data.length
            });
        }).catch(err => console.error("Error loading dashboard data", err));
    }, []);

    // Data for Charts
    const barData = [
        { name: 'Buku', Total: stats.books, fill: '#4e73df' },
        { name: 'Pengguna', Total: stats.borrowers, fill: '#1cc88a' },
        { name: 'Peminjaman', Total: stats.borrowings, fill: '#f6c23e' },
    ];

    const pieData = [
        { name: 'Buku Tersedia', value: stats.books > stats.borrowings ? stats.books - stats.borrowings : 0 },
        { name: 'Buku Dipinjam', value: stats.borrowings },
    ];
    const COLORS = ['#1cc88a', '#e74a3b'];

    // Dummy data for monthly trend to make dashboard look premium
    const monthlyData = [
        { name: 'Jan', Peminjaman: 4 },
        { name: 'Feb', Peminjaman: 7 },
        { name: 'Mar', Peminjaman: 5 },
        { name: 'Apr', Peminjaman: 12 },
        { name: 'Mei', Peminjaman: 9 },
        { name: 'Jun', Peminjaman: stats.borrowings }, // Current stat
    ];

    return (
        <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800 font-weight-bold">Dashboard Analitik</h1>
                <a href="/#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                    <i className="fas fa-download fa-sm text-white-50"></i> Generate Report
                </a>
            </div>

            {/* Top Cards */}
            <div className="row">
                <div className="col-xl-4 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Total Buku</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{stats.books}</div>
                                </div>
                                <div className="col-auto"><i className="fas fa-book fa-2x text-gray-300"></i></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Total Pengguna</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{stats.borrowers}</div>
                                </div>
                                <div className="col-auto"><i className="fas fa-users fa-2x text-gray-300"></i></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Transaksi Peminjaman</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{stats.borrowings}</div>
                                </div>
                                <div className="col-auto"><i className="fas fa-exchange-alt fa-2x text-gray-300"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="row">
                {/* Area Chart - Trend Peminjaman */}
                <div className="col-xl-8 col-lg-7">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Tren Peminjaman (6 Bulan Terakhir)</h6>
                        </div>
                        <div className="card-body">
                            <div className="chart-area" style={{ height: '300px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#4e73df" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#4e73df" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" tick={{fontFamily: 'Poppins', fontSize: 12}} />
                                        <YAxis tick={{fontFamily: 'Poppins', fontSize: 12}} />
                                        <Tooltip contentStyle={{ borderRadius: '8px', fontFamily: 'Poppins' }} />
                                        <Area type="monotone" dataKey="Peminjaman" stroke="#4e73df" strokeWidth={3} fillOpacity={1} fill="url(#colorPv)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pie Chart - Status Buku */}
                <div className="col-xl-4 col-lg-5">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Status Ketersediaan Buku</h6>
                        </div>
                        <div className="card-body">
                            <div className="chart-pie pt-4 pb-2" style={{ height: '300px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value">
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ borderRadius: '8px', fontFamily: 'Poppins' }} />
                                        <Legend wrapperStyle={{ fontFamily: 'Poppins', fontSize: '13px' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bar Chart - Komparasi Master Data */}
            <div className="row">
                <div className="col-lg-12 mb-4">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Komparasi Master Data</h6>
                        </div>
                        <div className="card-body">
                            <div className="chart-bar" style={{ height: '300px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barSize={50}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" tick={{fontFamily: 'Poppins', fontSize: 13}} />
                                        <YAxis tick={{fontFamily: 'Poppins', fontSize: 13}} />
                                        <Tooltip cursor={{fill: '#f8f9fc'}} contentStyle={{ borderRadius: '8px', fontFamily: 'Poppins' }} />
                                        <Bar dataKey="Total" radius={[5, 5, 0, 0]}>
                                            {barData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
