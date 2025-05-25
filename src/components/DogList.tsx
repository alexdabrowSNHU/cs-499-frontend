import React, { useState, useEffect } from 'react';
import type { Dog } from '../types/dog';

// DogList.tsx is a React component that displays a list of dogss
// We fetch the dogs from the server and display them in a paginated format
// It is used in DogPage.tsx in the pages directory

// Mock dog data
// This was generated using Copilot for testing purposes
// This is our "server" data
// This will not be used in the final version of the code, but is here for testing purposes
// This generates 30 dogs with different attributes
const mockDogs: Dog[] = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Dog ${i + 1}`,
    breed: ['Labrador', 'Beagle', 'Poodle', 'Bulldog'][i % 4],
    trainingStatus: ['Trained', 'Phase 1', 'Phase 2'][i % 3],
    acquisitionCountry: ['USA', 'Canada', 'Mexico', 'UK'][i % 4],
    reserved: i % 3 === 0,
}));

// DogList component
// Doglist display the list of dogs after fetching them from the server and displays them in a paginated format
const DogList: React.FC = () => {
    // dogs is an array of Dog objects, setDogs is a function to update the state of dogs
    const [dogs, setDogs] = useState<Dog[]>([]);
    // loading is a boolean that indicates whether the data is being loaded, setLoading is a function to update the state of loading
    const [loading, setLoading] = useState<boolean>(true);
    // error is a string that contains a message, setError is a function to update the state of error
    const [error, setError] = useState<string | null>(null);
    // page is a number that indicates the current page, setPage is a function to update the state of page - it's default value is 1
    const [page, setPage] = useState<number>(1);
    // pageSize is how many dogs are displayed on each page
    const pageSize = 10;


    /*
    // This is for fetching the dogs from the server - it's currently using the local spring boot server for testing purposes
    useEffect(() => {
        // Fetch dogs from the server
        const fetchDogs = async () =>
        // Attempt to fetch the data from the server
        try {
            // Response from the server
            const response = await fetch('http://localhost:8080/api/v1/animals/dogs');
            // If the response is not ok, throw an error
            if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);
            // Parse the response as JSON
            const data: Dog[] = await response.json();
            // Set the dogs state with the data from the server
            setDogs(data);
            // Catch any errors that occur during the fetch
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
    }, []);
    */

    // Simulate fetching data
    useEffect(() => {
        setDogs(mockDogs);
        setLoading(false);;
    }, []);

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
    if (loading) return <p className="text-center p-4">Loading dogs...</p>;
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

                    {/* Pagination controls at the bottom of the page */}
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
                        {/* It increases the page number by 1 and ensures the max page number is the total number of dogs divided by the page size */}
                        {/* When the endIndex is greater than or equal to the total number of dogs, we disable the button */}
                        <button
                            onClick={() => setPage((prev) => (endIndex < dogs.length ? prev + 1 : prev))}
                            disabled={endIndex >= dogs.length}
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

export default DogList;
