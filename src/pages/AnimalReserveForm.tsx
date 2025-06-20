import { useParams } from 'react-router-dom';
import { useState } from 'react';

// This is the page where users can input their info to reserve an animal
// local dev address: http://localhost:5173/reserve/:id

function AnimalReserveForm() {
  const { id } = useParams(); // ID of the animal to reserve

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams({
    firstName,
    lastName,
    phoneNumber,
  });

  try {
    const animalType = window.location.pathname.split('/')[2] + 's'; // Get the animal type from the URL
    const res = await fetch(`https://cs-499-api-aehve5e4afg0bsh8.centralus-01.azurewebsites.net/api/v1/animals/${animalType}/${id}/reserve?${params.toString()}`, {
      method: 'PUT',
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || 'Failed to reserve animal');
    }

    setStatus('success');
    setMessage('Reservation successful!');
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
  } catch (err: any) {
    setStatus('error');
    setMessage(err.message || 'An error occurred.');
  }
};

  return (
    <div className="max-w-lg mx-auto mt-10 text-center">
      <h2 className="text-2xl text-teal-300 mb-5">Reserve Animal ID #{id}</h2>
      
      {status === 'success' && (
        <p className="text-green-400 mb-4">{message}</p>
      )}
      {status === 'error' && (
        <p className="text-red-400 mb-4">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="First Name"
          className="w-full px-4 py-2 bg-slate-800 border border-gray-600 rounded text-white"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          placeholder="Last Name"
          className="w-full px-4 py-2 bg-slate-800 border border-gray-600 rounded text-white"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          placeholder="Phone Number"
          className="w-full px-4 py-2 bg-slate-800 border border-gray-600 rounded text-white"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded"
          >
            Submit Reservation
          </button>
        </div>
      </form>
    </div>
  );
}

export default AnimalReserveForm;
