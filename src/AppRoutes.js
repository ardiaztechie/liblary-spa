import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import BookIndex from './pages/BookIndex';
import BookCreate from './pages/BookCreate';
import BookEdit from './pages/BookEdit';
import Borrower from './pages/Borrower';

const routesConfig = [
    { path: "/", component: Dashboard },
    { path: "/book", component: BookIndex },
    { path: "/book/create", component: BookCreate },
    { path: "/book/edit/:id", component: BookEdit },
    { path: "/borrower", component: Borrower },
];

const AppRoutes = () => {
    return (
        <Routes>
            {routesConfig.map((route, index) => (
                <Route key={index} path={route.path}
                element={<route.component />} />
            ))}
        </Routes>
    );
}

export default AppRoutes;
