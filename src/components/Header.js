import { jsx as _jsx } from "react/jsx-runtime";
import "../styles/header.css";
import "../index.css";
import { Link } from "react-router-dom";
// This is the header component that will be used on all pages
const Header = () => {
    return (_jsx("header", { className: "bg-slate-800 p-5 text-white text-center shadow-md dark:bg-slate-900 border-2 border-slate-700 font-source-code-pro", children: _jsx(Link, { to: "/", children: _jsx("h1", { className: "text-3xl font-bold mb-2", children: "GS Rescues" }) }) }));
};
export default Header;
