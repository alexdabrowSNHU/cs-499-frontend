import { Link } from 'react-router-dom';
import type {Animal} from '../types/animal';
import type {Dog} from '../types/dog';
import type {Monkey} from '../types/monkey';

// ReserveList component
// This component displays a list of animals that are not reserved.

// It takes two props (arguments):
type ReserveListProps = {
    // results is an array of Animal objects that are not reserved
    results: Animal[];
    // hasSearched is a boolean that indicates whether the user has searched for animals - it's used to show a message to the user when no animals are found after a search
    hasSearched: boolean;
};

// The component returns a list of animals, or a message if no animals are found
const ReserveList: React.FC<ReserveListProps> = ({ results, hasSearched }) => {
    // If the user has searched for animals and no results are found, show "No animals found."
    if (hasSearched && results.length === 0) {
        return <p className="text-gray-400 mt-4">No animals found.</p>;
    }


    return (
        /* This is the list of animals that are not reserved. */
        <ul className="mt-4 space-y-4 max-w-xl mx-auto text-left">
            {/* Map through the results array and create a list item for each animal */}
            {/* Each list item is a link to the animal's reservation page */}
            {results.map((animal) => (
                /* Each list item has a key, which is the animal's ID */
                <li key={animal.id}>
                    {/* The link takes the user to the reservation page for that animal */}
                    {/* The animal's name, breed for dogs, species for monkeys, training status, and acquisition country are displayed */}
                    <Link
                        to={`/reserve/${animal.type}/${animal.id}`}
                        className="block p-4 border border-gray-600 rounded bg-slate-800 hover:bg-slate-700 transition text-white"
                    >
                        <h3 className="text-lg font-semibold text-teal-400">
                            {/* Display the animal's name and breed*/}
                            {animal.name} ({animal.type ? (animal.type.charAt(0).toUpperCase() + animal.type.slice(1)) : 'Error - type not found'})
                        </h3>
                        <p className="text-xs text-gray-400">ID: {animal.id}</p>
                        {/* Display the animal's breed for dogs or species for monkeys) */}
                        {animal.type === 'dog' ? (
                            <p className="text-sm text-gray-300">Breed: {(animal as Dog).breed}</p>
                        ) : (
                            <p className="text-sm text-gray-300">Species: {(animal as Monkey).species}</p>
                        )}
                        {/* Display the animal's training status and acquisition country */}
                        <p className="text-sm text-gray-300">Training Status: {animal.trainingStatus}</p>
                        <p className="text-sm text-gray-400">Acquisition Country: {animal.acquisitionCountry}</p>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default ReserveList;
