import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import DogPage from '../pages/DogPage';
import ReservePage from '../pages/ReservePage';
import MonkeyPage from '../pages/MonkeyPage';
import AnimalReserveForm from '../pages/AnimalReserveForm';
import AddDataPage from '../pages/AddDataPage';
// We are using react router for routing
// We are defining all the routes here
export default function AppRoutes() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "/dogs", element: _jsx(DogPage, {}) }), _jsx(Route, { path: "/monkeys", element: _jsx(MonkeyPage, {}) }), _jsx(Route, { path: "/reserve", element: _jsx(ReservePage, {}) }), _jsx(Route, { path: "/reserve/:type/:id", element: _jsx(AnimalReserveForm, {}) }), _jsx(Route, { path: "/addData", element: _jsx(AddDataPage, {}) })] }));
}
