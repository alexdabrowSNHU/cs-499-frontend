import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
// MonkeyList.tsx is a React component that displays a list of monkeys
// We fetch the monkeys from the server and display them in a paginated format
// It is used in MonkeyPage.tsx in the pages directory
// MonkeyList component
// MonkeyList display the list of monkeys after fetching them from the server and displays them in a paginated format
const MonkeyList = () => {
    // monkeys is an array of Monkey objects, setMonkeys is a function to update the state of monkeys
    const [monkeys, setMonkeys] = useState([]);
    // loading is a boolean that indicates whether the data is being loaded, setLoading is a function to update the state of loading
    const [loading, setLoading] = useState(true);
    // error is a string that contains a message, setError is a function to update the state of error
    const [error, setError] = useState(null);
    // page is a number that indicates the current page, setPage is a function to update the state of page - its default value is 1
    const [page, setPage] = useState(1);
    // pageSize is how many monkeys are displayed on each page
    const pageSize = 10;
    // Sort method
    const [sortMethod, setSortMethod] = useState('');
    // How long the sort takes in milliseconds
    const [sortDuration, setSortDuration] = useState(null);
    // This is for fetching the monkeys from the server 
    useEffect(() => {
        // Fetch monkeys from the server
        const fetchMonkeys = async () => {
            // Attempt to fetch the data from the server
            try {
                // Response from the server
                const response = await fetch(
                // if sortMethod is set, append it to the URL as a query parameter
                `https://cs-499-api-aehve5e4afg0bsh8.centralus-01.azurewebsites.net/api/v1/animals/monkeys${sortMethod ? `?sort=${sortMethod}` : ''}`);
                // If the response is not ok, throw an error
                if (!response.ok)
                    throw new Error(`HTTP error status: ${response.status}`);
                // Parse the response as JSON
                const data = await response.json();
                if (Array.isArray(data)) {
                    setMonkeys(data); // backend returned the array directly
                    setSortDuration(null);
                }
                else {
                    setMonkeys(data.monkeys ?? []); // backend returned { monkeys: [...], sortDuration: X }
                    setSortDuration(data.sortDuration ?? null);
                }
            }
            catch (e) {
                // Set the error state with the error message
                setError(e.message);
            }
            finally {
                // Update the loading state to false
                setLoading(false);
            }
        };
        // Call the fetchMonkeys function
        fetchMonkeys();
    }, [sortMethod]); // Re-fetch when sortMethod changes
    // These are the constants for pagination
    // The goal of this pagination is to display a maximum of 10 monkeys on each page
    // startIndex is the index of the first monkey on the current page
    // It's calculated by multiplying the current page number (page) minus 1 by the number of monkeys per page (pageSize)
    const startIndex = (page - 1) * pageSize;
    // endIndex is the index of the last monkey on the current page
    const endIndex = startIndex + pageSize;
    // currentMonkeys is the array of monkeys that will be displayed on the current page
    // It's a slice of the monkeys array from startIndex to endIndex
    const currentMonkeys = monkeys.slice(startIndex, endIndex);
    // Message to display while loading
    if (loading) {
        return (_jsxs("div", { className: "text-center p-4", children: [_jsx("p", { children: "Currently loading data." }), _jsx("p", { children: "Due to free tier limitations, cold starts may cause initial loads to take up to a minute." })] }));
    }
    // Message to display if there was an error fetching the monkeys 
    if (error)
        return _jsxs("p", { className: "text-center text-red-400 p-4", children: ["Error fetching monkeys: ", error] });
    return (
    // Main container for the monkey list
    _jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-2xl font-bold text-sky-300", children: "Monkey List" }), _jsx("div", { className: "w-1/2 mx-auto border-b-2 border-b-gray-700 mt-5 mb-5" }), monkeys.length === 0 ? (_jsx("p", { className: "p-4", children: "No monkeys found." })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "max-h-[640px] overflow-y-scroll scrollbar-hide mx-auto w-[80%] p-2 border border-gray-700 rounded-lg bg-slate-900", children: _jsx("ul", { className: "list-none p-0", children: currentMonkeys.map((monkey) => (_jsxs("li", { className: "mb-4 p-4 border border-slate-700 rounded-lg shadow-lg bg-slate-800 hover:bg-slate-700 transition-colors", children: [_jsx("strong", { className: "text-xl text-teal-400 block mb-1", children: monkey.name }), _jsx("span", { className: "text-slate-300", children: monkey.species }), _jsx("br", {}), _jsxs("span", { className: "text-xs text-slate-400 block mt-1", children: ["ID: ", monkey.id] }), _jsxs("span", { className: "text-sm text-slate-300 block", children: ["Acquisition Country: ", monkey.acquisitionCountry] }), _jsxs("span", { className: "text-sm text-slate-300 block", children: ["Training Status: ", monkey.trainingStatus] }), _jsxs("span", { className: "text-sm text-slate-300 block", children: ["Reserved: ", monkey.reserved ? 'Yes' : 'No'] })] }, monkey.id))) }) }), _jsxs("div", { className: "mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 flex-wrap max-w-4xl mx-auto", children: [_jsx("div", { className: "flex justify-start", children: _jsx("button", { onClick: () => {
                                        setSortMethod('insertion');
                                        setPage(1);
                                        setLoading(true);
                                    }, className: "bg-blue-600 hover:bg-indigo-700 text-white px-4 py-2 rounded min-w-[220px]", children: "Sort by name - insertion sort" }) }), _jsxs("div", { className: "flex items-center justify-center gap-4", children: [_jsx("button", { onClick: () => setPage((prev) => Math.max(prev - 1, 1)), disabled: page === 1, className: "bg-gray-700 px-4 py-2 rounded disabled:opacity-50 min-w-[90px] text-center", children: "Previous" }), _jsxs("span", { className: "text-gray-300 text-sm", children: ["Page ", page] }), _jsx("button", { onClick: () => setPage((prev) => (endIndex < monkeys.length ? prev + 1 : prev)), disabled: endIndex >= monkeys.length, className: "bg-gray-700 px-4 py-2 rounded disabled:opacity-50 min-w-[90px] text-center", children: "Next" })] }), _jsx("div", { className: "flex justify-end", children: _jsx("button", { onClick: () => {
                                        setSortMethod('java');
                                        setPage(1);
                                        setLoading(true);
                                    }, className: "bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded min-w-[220px]", children: "Sort by name - java sort()" }) })] }), _jsx("div", { className: "text-center mt-4", children: sortDuration !== null && (_jsxs("p", { className: "text-sm text-gray-400", children: ["Sort completed in ", _jsx("span", { className: "font-semibold text-teal-400", children: sortDuration }), " ms."] })) })] }))] }));
};
export default MonkeyList;
