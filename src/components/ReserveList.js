import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
// The component returns a list of animals, or a message if no animals are found
const ReserveList = ({ results, hasSearched }) => {
    // If the user has searched for animals and no results are found, show "No animals found."
    if (hasSearched && results.length === 0) {
        return _jsx("p", { className: "text-gray-400 mt-4", children: "No animals found." });
    }
    return (
    /* This is the list of animals that are not reserved. */
    _jsx("ul", { className: "mt-4 space-y-4 max-w-xl mx-auto text-left", children: results.map((animal) => (
        /* Each list item has a key, which is the animal's ID */
        _jsx("li", { children: _jsxs(Link, { to: `/reserve/${animal.type}/${animal.id}`, className: "block p-4 border border-gray-600 rounded bg-slate-800 hover:bg-slate-700 transition text-white", children: [_jsxs("h3", { className: "text-lg font-semibold text-teal-400", children: [animal.name, " (", animal.type ? (animal.type.charAt(0).toUpperCase() + animal.type.slice(1)) : 'Error - type not found', ")"] }), _jsxs("p", { className: "text-xs text-gray-400", children: ["ID: ", animal.id] }), animal.type === 'dog' ? (_jsxs("p", { className: "text-sm text-gray-300", children: ["Breed: ", animal.breed] })) : (_jsxs("p", { className: "text-sm text-gray-300", children: ["Species: ", animal.species] })), _jsxs("p", { className: "text-sm text-gray-300", children: ["Training Status: ", animal.trainingStatus] }), _jsxs("p", { className: "text-sm text-gray-400", children: ["Acquisition Country: ", animal.acquisitionCountry] })] }) }, animal.id))) }));
};
export default ReserveList;
