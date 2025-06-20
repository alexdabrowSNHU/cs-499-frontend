import React, { useState, useEffect } from 'react';
import ReserveList from '../components/ReserveList';
import type { Dog } from '../types/dog';
import type { Monkey } from '../types/monkey';
import type { Animal } from '../types/animal';

// ReservePage component
function ReservePage() {
    //  Query is input in the search bar, setQuery is the setter to update the state of query - deault value is an empty string
    const [query, setQuery] = useState('');
    // allAnimals holds the full unreserved animals fetched from the backend
    const [allAnimals, setAllAnimals] = useState<Animal[]>([]);
    // results is the filtered list based on query, passed to ReserveList
    const [results, setResults] = useState<Animal[]>([]);
    // hasSearched is a boolean that tracks if the users has searched or not - default value is false 
    const [hasSearched, setHasSearched] = useState(false); 
    // page is the current page for pagination
    const [page, setPage] = useState(1);
    // pageSize is how many results per page
    const pageSize = 10;

    // fetch unreserved animals from the backend on mount
    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const res = await fetch('https://cs-499-api-aehve5e4afg0bsh8.centralus-01.azurewebsites.net/api/v1/animals/available');
                const data = await res.json();
                console.log('Fetched animals:', data); 
                setAllAnimals(data);
            } catch (err) {
                console.error('Failed to fetch animals:', err);
            }
        };
        fetchAnimals();
    }, []);

    // this function handles the form submission when the user clicks the search button
    const handleSubmit = (e: React.FormEvent) => {
        // prevent the default form submission behavior - this keeps the page from refreshing
        e.preventDefault();
        // if user search is empty
        if (!query) {
            // set results to an empty array and return
            setResults([]);
            setHasSearched(false);
            return;
        }
        // filter the allAnimals array based on the query
        const filtered = allAnimals.filter((animal) =>
            // check if animal.name is defined first and then check if it includes the query
            animal.name && animal.name.toLowerCase().includes(query.toLowerCase()) 
        );
        // set the results to the filtered array
        setResults(filtered);
        setPage(1); // reset to first page
        // set hasSearched to true
        setHasSearched(true);
    };

    // Pagination slice of results
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedResults = results.slice(startIndex, endIndex);

    return (
        <div className="text-center">
            <h1 className="text-3xl font-bold mb-6 text-gray-300">Reserve an Animal</h1>
            {/* Search bar */}
            {/* query is our constant we defined in ReservePage() that uses useState */}
            {/* setQuery is the setter function that updates the state of query */}
            {/* handleSubmit is the function that handles the form submission */}
            {/* onChange event calls setQuery when the input value changes */}
            {/* onSubmit event calls handleSubmit when the form is submitted */}
            {/* The Search button has a type of submit, which submits the form when clicked */}
           
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                <input
                    name="query"
                    placeholder="Search by name"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="px-4 py-2 w-64 rounded border border-gray-600 bg-slate-800 text-white placeholder-gray-400 
             focus:outline-none focus:ring-2 focus:ring-teal-400 
             transition duration-200 ease-in-out"
                />
                <button
                    type="submit"
                    className="bg-teal-400 hover:bg-teal-500 text-white px-6 py-2 rounded transition"
                >
                    Search
                </button>
            </form>

            {/* ReserveList components - takes two props: results and hasSearched */}
            <ReserveList results={paginatedResults} hasSearched={hasSearched} />

            {/* Pagination controls */}
            {results.length > pageSize && (
                <div className="flex justify-center items-center gap-4 mt-4">
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="bg-gray-700 px-4 py-2 rounded disabled:opacity-50 min-w-[90px]"
                    >
                        Previous
                    </button>
                    <span className="text-gray-300 text-sm">Page {page}</span>
                    <button
                        onClick={() => setPage((p) => (endIndex < results.length ? p + 1 : p))}
                        disabled={endIndex >= results.length}
                        className="bg-gray-700 px-4 py-2 rounded disabled:opacity-50 min-w-[90px]"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default ReservePage;
