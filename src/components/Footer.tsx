import React from "react";
import "../styles/footer.css";

// This is the footer component that will be used on all pages
const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-800 p-5 text-white text-center shadow-md dark:bg-slate-900 border-t-2 border-slate-700 font-source-code-pro">
        <p className="text-sm">
            CS-499 Capstone Project - Alexander Dabrow
        </p>
        </footer>
    );
}

export default Footer;