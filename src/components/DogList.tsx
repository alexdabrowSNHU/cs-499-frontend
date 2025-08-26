import React, { useState, useEffect } from 'react';
import type { Dog } from '../types/dog';

// DogList.tsx is a React component that displays a list of dogss
// We fetch the dogs from the server and display them in a paginated format
// It is used in DogPage.tsx in the pages directory

// DogList component
// Doglist display the list of dogs after fetching them from the server and displays them in a paginated format
const DogList: React.FC = () => {
    // dogs is an array of Dog objects, setDogs is a function to update the state of dogs
    const [dogs, setDogs] = useState<Dog[]>([]);
    // loading is a boolean that indicates whether the data is being loaded, setLoading is a function to update the state of loading
    const [loading, setLoading] = useState<boolean>(true);
    // error is a string that contains a message, setError is a function to update the state of error
    const [error, setError] = useState<string | null>(null);
    // page is a number that indicates the current page, setPage is a function to update the state of page - its default value is 1
    const [page, setPage] = useState<number>(1);
    // pageSize is how many dogs are displayed on each page
    const pageSize = 10;
    // Sort method
    const [sortMethod, setSortMethod] = useState<string>('');
    // How long the sort takes in milliseconds
    const [sortDuration, setSortDuration] = useState<number | null>(null);




    // This is for fetching the dogs from the server 
    useEffect(() => {
        // Fetch dogs from the server
        const fetchDogs = async () => {
            // Attempt to fetch the data from the server
            try {
                // Response from the server
                const response = await fetch(
                    // if sortMethod is set, append it to the URL as a query parameter
                    `https://cs-499-api-aehve5e4afg0bsh8.centralus-01.azurewebsites.net/api/v1/animals/dogs${sortMethod ? `?sort=${sortMethod}` : ''}`
                );

                // If the response is not ok, throw an error
                if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);
                // Parse the response as JSON
                const data = await response.json();
                if (Array.isArray(data)) {
                    setDogs(data); // backend returned the array directly
                    setSortDuration(null);
                } else {
                    setDogs(data.dogs ?? []); // backend returned { dogs: [...], sortDuration: X }
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
        // Call the fetchDogs function
        fetchDogs();
    }, [sortMethod]); // Re-fetch when sortMethod changes

    // These are the constants for pagination
    // The goal of this pagination is to display a maximum of 10 dogs on each page
    // startIndex is the index of the first dog on the current page
    // It's calculated by multiplying the current page number (page) minus 1 by the number of dogs per page (pageSize)
    const startIndex = (page - 1) * pageSize;
    // endIndex is the index of the last dog on the current page
    const endIndex = startIndex + pageSize;
    // currentDogs is the array of dogs that will be displayed on the current page
    // It's a slice of the dogs array from startIndex to endIndex
    const currentDogs = dogs.slice(startIndex, endIndex);

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
    // Message to display if there was an error fetching the dogs 
    if (error) return <p className="text-center text-red-400 p-4">Error fetching dogs: {error}</p>;

    return (
        // Main container for the dog list
        <div className="text-center">
            <h2 className="text-2xl font-bold text-sky-300">Dog List</h2>
            <div className="w-1/2 mx-auto border-b-2 border-b-gray-700 mt-5 mb-5"></div>
            {/* If there are no dogs, display "No dogs found." */}
            {dogs.length === 0 ? (
                <p className="p-4">No dogs found.</p>
            ) : (
                <>
                    <div className="max-h-[640px] overflow-y-scroll scrollbar-hide mx-auto w-[80%] p-2 border border-gray-700 rounded-lg bg-slate-900">
                        <ul className="list-none p-0">
                            {/* Map through currentDogs array and create a list item for each dog */}
                            {/*Each list item's key is the dog's id*/}
                            {currentDogs.map((dog) => (
                                <li
                                    key={dog.id}
                                    className="mb-4 p-4 border border-slate-700 rounded-lg shadow-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                                >
                                    <strong className="text-xl text-teal-400 block mb-1">{dog.name}</strong>
                                    <span className="text-slate-300">{dog.breed}</span>
                                    <br />
                                    <span className="text-xs text-slate-400 block mt-1">ID: {dog.id}</span>
                                    <span className="text-sm text-slate-300 block">Acquisition Country: {dog.acquisitionCountry}</span>
                                    <span className="text-sm text-slate-300 block">Training Status: {dog.trainingStatus}</span>
                                    <span className="text-sm text-slate-300 block">Reserved: {dog.reserved ? 'Yes' : 'No'}</span>
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
                                onClick={() => setPage((prev) => (endIndex < dogs.length ? prev + 1 : prev))}
                                disabled={endIndex >= dogs.length}
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

export default DogList;
