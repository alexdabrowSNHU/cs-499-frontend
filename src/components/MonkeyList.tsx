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
    const [loading, setLoading] = useState(true);
    // error is a string that contains a message, setError is a function to update the state of error
    const [error, setError] = useState<string | null>(null);
    // page is a number that indicates the current page, setPage is a function to update the state of page - it's default value is 1
    const [page, setPage] = useState(1);
    // pageSize is how many monkeys are displayed on each page
    const pageSize = 10;

    
    // This is for fetching the monkeys from the server - it's currently using the local spring boot server for testing purposes
    useEffect(() => {
        // Fetch monkeys from the server
        const fetchMonkeys = async () => {
            // Attempt to fetch the data from the server
            try {
                // Response from the server
                const response = await fetch('https://cs-499-api-aehve5e4afg0bsh8.centralus-01.azurewebsites.net/api/v1/animals/monkeys');
                // If the response is not ok, throw an error
                if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);
                // Parse the response as JSON
                const data: Monkey[] = await response.json();
                // Set the monkeys state with the data from the server
                setMonkeys(data);
                // Catch any errors that occur during the fetch
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
    }, []);


    // These are the constants for pagination
    // The goal of this pagination is to display a maximum of 10 monkeys on each page
    // startIndex is the index of the first monkey on the current page
    // It's calculated by multiplying the current page number (page) minus 1 by the number of monkeys per page (pageSize)
    const startIndex = (page - 1) * pageSize;
    // endIndex is the index of the last monkey on the current page
    const endIndex = startIndex + pageSize;
    // currentMonkeys is the array of monkeys that will be displayed on the current page
    const currentMonkeys = monkeys.slice(startIndex, endIndex);

    // Message to display while loading
    if (loading) return <p className="text-center p-4">Loading monkeys...</p>;
    // Message to display if there is an error fetching the monkeys
    if (error) return <p className="text-center text-red-400 p-4">Error fetching monkeys: {error}</p>;

    return (
        // Main container for the monkey list
        <div className="text-center">
            <h2 className="text-2xl font-bold text-sky-300">Monkey List</h2>
            <div className="w-1/2 mx-auto border-b-2 border-b-gray-700 mt-5 mb-5"></div>
            {/* If there are no monkeys, display "No mokeys found." */}
            {monkeys.length === 0 ? (
                <p className="p-4">No monkeys found.</p>
            ) : (
                <>
                    <div className="max-h-[640px] overflow-y-scroll scrollbar-hide mx-auto w-[80%] p-2 border border-gray-700 rounded-lg bg-slate-900">
                        <ul className="list-none p-0">
                            {/* Map through currentMonkeyss array and create a list item for each monkey */}
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

                    {/* Pagination Controls at the bottom of the page */}
                    <div className="mt-4 flex items-center justify-between max-w-xs mx-auto">
                        {/* Previous button */}
                        {/* It decreases the page number by 1 and ensures the min page number is 1 */}
                        {/* When the page number is one, we disable the button */}
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            className="bg-gray-700 px-4 py-2 rounded disabled:opacity-50 min-w-[90px] text-center"
                        >
                            Previous
                        </button>
                        <span className="text-gray-300 text-sm">Page {page}</span>
                        {/* Next button */}
                        {/* It increases the page number by 1 and ensures the max page number is the total number of monkeys divided by the page size */}
                        {/* When the endIndex is greater than or equal to the total number of monkeys, we disable the button */}
                        <button
                            onClick={() => setPage((prev) => (endIndex < monkeys.length ? prev + 1 : prev))}
                            disabled={endIndex >= monkeys.length}
                            className="bg-gray-700 px-4 py-2 rounded disabled:opacity-50 min-w-[90px] text-center"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default MonkeyList;
