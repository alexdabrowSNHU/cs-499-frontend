import { useParams } from 'react-router-dom';

// This is the page where users can input their info to reserve an animal
// This page is unfinished and will be completed soon
// local dev address: http://localhost:5173/reserve/:id

function AnimalReserveForm() {
  // this is the id of the animal that has been clicked on the reserve page
  const { id } = useParams(); 

  return (
    <div className="max-w-lg mx-auto mt-10 text-center">
      <h2 className="text-2xl text-teal-300 mb-5">Reserve Animal ID #{id}</h2>
      <form className="space-y-4">
        <input
          placeholder="First Name"
          className="w-full px-4 py-2 bg-slate-800 border border-gray-600 rounded text-white"
        />
        <input
          placeholder="Last Name"
          className="w-full px-4 py-2 bg-slate-800 border border-gray-600 rounded text-white"
        />
        <input
          placeholder="Phone Number"
          className="w-full px-4 py-2 bg-slate-800 border border-gray-600 rounded text-white"
        />
        <div className="flex justify-center">
          <button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded">
            Submit Reservation
          </button>
        </div>
      </form>
    </div>
  );
}

export default AnimalReserveForm;
