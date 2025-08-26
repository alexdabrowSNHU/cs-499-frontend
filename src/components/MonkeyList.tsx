import React, { useState, useEffect } from 'react';
import type { Monkey } from '../types/monkey';

// MonkeyList.tsx is a React component that displays a list of monkeys
// We fetch the monkeys from the server and display them in a paginated format
// It is used in MonkeyPage.tsx in the pages directory

// MonkeyList component
// MonkeyList display the list of monkeys after fetching them from the server and displays them in a paginated format
const MonkeyList: React.FC = () => {
    // monkeys is an array of Monkey objects, setMonkeys is a function to update the state of monkeys
    const [monkeys, setMonkeys] = useState<Monkey[]>([]);
    // loading is a boolean that indicates whether the data is being loaded, setLoading is a function to update the state of loading
    const [loading, setLoading] = useState<boolean>(true);
    // error is a string that contains a message, setError is a function to update the state of error
    const [error, setError] = useState<string | null>(null);
    // page is a number that indicates the current page, setPage is a function to update the state of page - its default value is 1
    const [page, setPage] = useState<number>(1);
    // pageSize is how many monkeys are displayed on each page
    const pageSize = 10;
    // Sort method
    const [sortMethod, setSortMethod] = useState<string>('');
    // How long the sort takes in milliseconds
    const [sortDuration, setSortDuration] = useState<number | null>(null);

    // This is for fetching the monkeys from the server 
    useEffect(() => {
        // Fetch monkeys from the server
        const fetchMonkeys = async () => {
            // Attempt to fetch the data from the server
            try {
                // Response from the server
                const response = await fetch(
                    // if sortMethod is set, append it to the URL as a query parameter
                    `https://cs-499-api-aehve5e4afg0bsh8.centralus-01.azurewebsites.net/api/v1/animals/monkeys${sortMethod ? `?sort=${sortMethod}` : ''}`
                );

                // If the response is not ok, throw an error
                if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);
                // Parse the response as JSON
                const data = await response.json();
                if (Array.isArray(data)) {
                    setMonkeys(data); // backend returned the array directly
                    setSortDuration(null);
                } else {
                    setMonkeys(data.monkeys ?? []); // backend returned { monkeys: [...], sortDuration: X }
                    setSortDuration(data.sortDuration ?? null);
                }

            } catch (e: any) {
                // Set the error state with the error message
                setError(e.message);
            } finally {
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
        return (
            <div className="text-center p-4">
                <p>Currently loading data.</p>
                <p>
                    Due to free tier limitations, cold starts may cause initial loads to take up to a minute.
                </p>
            </div>
        );
    }
    // Message to display if there was an error fetching the monkeys 
    if (error) return <p className="text-center text-red-400 p-4">Error fetching monkeys: {error}</p>;

    return (
        // Main container for the monkey list
        <div className="text-center">
            <h2 className="text-2xl font-bold text-sky-300">Monkey List</h2>
            <div className="w-1/2 mx-auto border-b-2 border-b-gray-700 mt-5 mb-5"></div>
            {/* If there are no monkeys, display "No monkeys found." */}
            {monkeys.length === 0 ? (
                <p className="p-4">No monkeys found.</p>
            ) : (
                <>
                    <div className="max-h-[640px] overflow-y-scroll scrollbar-hide mx-auto w-[80%] p-2 border border-gray-700 rounded-lg bg-slate-900">
                        <ul className="list-none p-0">
                            {/* Map through currentMonkeys array and create a list item for each monkey */}
                            {/*Each list item's key is the monkey's id*/}
                            {currentMonkeys.map((monkey) => (
                                <li
                                    key={monkey.id}
                                    className="mb-4 p-4 border border-slate-700 rounded-lg shadow-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                                >
                                    <strong className="text-xl text-teal-400 block mb-1">{monkey.name}</strong>
                                    <span className="text-slate-300">{monkey.species}</span>
                                    <br />
                                    <span className="text-xs text-slate-400 block mt-1">ID: {monkey.id}</span>
                                    <span className="text-sm text-slate-300 block">Acquisition Country: {monkey.acquisitionCountry}</span>
                                    <span className="text-sm text-slate-300 block">Training Status: {monkey.trainingStatus}</span>
                                    <span className="text-sm text-slate-300 block">Reserved: {monkey.reserved ? 'Yes' : 'No'}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 flex-wrap max-w-4xl mx-auto">

                        {/* Left Sort Button */}
                        <div className="flex justify-start">
                            <button
                                onClick={() => {
                                    setSortMethod('insertion');
                                    setPage(1);
                                    setLoading(true);
                                }}
                                className="bg-blue-600 hover:bg-indigo-700 text-white px-4 py-2 rounded min-w-[220px]"
                            >
                                Sort by name - insertion sort
                            </button>
                        </div>

                        {/* Center Pagination Controls */}
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                disabled={page === 1}
                                className="bg-gray-700 px-4 py-2 rounded disabled:opacity-50 min-w-[90px] text-center"
                            >
                                Previous
                            </button>
                            <span className="text-gray-300 text-sm">Page {page}</span>
                            <button
                                onClick={() => setPage((prev) => (endIndex < monkeys.length ? prev + 1 : prev))}
                                disabled={endIndex >= monkeys.length}
                                className="bg-gray-700 px-4 py-2 rounded disabled:opacity-50 min-w-[90px] text-center"
                            >
                                Next
                            </button>
                        </div>

                        {/* Right Sort Button */}
                        <div className="flex justify-end">
                            <button
                                onClick={() => {
                                    setSortMethod('java');
                                    setPage(1);
                                    setLoading(true);
                                }}
                                className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded min-w-[220px]"
                            >
                                Sort by name - java sort()
                            </button>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        {sortDuration !== null && (
                            <p className="text-sm text-gray-400">
                                Sort completed in <span className="font-semibold text-teal-400">{sortDuration}</span> ms.
                            </p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default MonkeyList;
