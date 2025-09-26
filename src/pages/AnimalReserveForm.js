import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useParams } from 'react-router-dom';
import { useState } from 'react';
// This is the page where users can input their info to reserve an animal
// local dev address: http://localhost:5173/reserve/:id
function AnimalReserveForm() {
    const { id } = useParams(); // ID of the animal to reserve
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');
    const handleSubmit = async (e) => {
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
        }
        catch (err) {
            setStatus('error');
            setMessage(err.message || 'An error occurred.');
        }
    };
    return (_jsxs("div", { className: "max-w-lg mx-auto mt-10 text-center", children: [_jsxs("h2", { className: "text-2xl text-teal-300 mb-5", children: ["Reserve Animal ID #", id] }), status === 'success' && (_jsx("p", { className: "text-green-400 mb-4", children: message })), status === 'error' && (_jsx("p", { className: "text-red-400 mb-4", children: message })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsx("input", { placeholder: "First Name", className: "w-full px-4 py-2 bg-slate-800 border border-gray-600 rounded text-white", value: firstName, onChange: (e) => setFirstName(e.target.value), required: true }), _jsx("input", { placeholder: "Last Name", className: "w-full px-4 py-2 bg-slate-800 border border-gray-600 rounded text-white", value: lastName, onChange: (e) => setLastName(e.target.value), required: true }), _jsx("input", { placeholder: "Phone Number", className: "w-full px-4 py-2 bg-slate-800 border border-gray-600 rounded text-white", value: phoneNumber, onChange: (e) => setPhoneNumber(e.target.value), required: true }), _jsx("div", { className: "flex justify-center", children: _jsx("button", { type: "submit", className: "bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded", children: "Submit Reservation" }) })] })] }));
}
export default AnimalReserveForm;
