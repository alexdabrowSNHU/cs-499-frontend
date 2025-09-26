import { jsx as _jsx } from "react/jsx-runtime";
import "../styles/footer.css";
// This is the footer component that will be used on all pages
const Footer = () => {
    return (_jsx("footer", { className: "bg-slate-800 p-5 text-white text-center shadow-md dark:bg-slate-900 border-t-2 border-slate-700 font-source-code-pro", children: _jsx("p", { className: "text-sm", children: "CS-499 Capstone Project - Alexander Dabrow" }) }));
};
export default Footer;
