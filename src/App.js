import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routes';
function App() {
    return (
    // flex-col is used to stacked the header, main and footer
    // min-h-screen is used to make sure the footer is always at the bottom
    _jsxs("div", { className: "flex flex-col min-h-screen bg-gray-900 text-gray-100", children: [_jsx(Header, {}), _jsx("main", { className: "flex-grow container mx-auto p-4", children: _jsx(AppRoutes, {}) }), _jsx(Footer, {})] }));
}
export default App;
