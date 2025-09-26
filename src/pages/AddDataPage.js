import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import handleCSV from '../utils/handleCSV';
function AddDataPage() {
    // useState to manage the file name - this will be displayed when a file is chosen - deafult is 'No file chosen'
    const [file, setFile] = useState(null);
    // Function to handle file input change - it will update the fileName state to the name of the file chosen
    const handleFileChange = (event) => {
        // Get the selected file from the input element - if no file is selected, it will be null
        const selectedFile = event.target.files?.[0] ?? null;
        // Update the file state with the selected file
        setFile(selectedFile);
    };
    return (_jsx("div", { className: "flex flex-col items-center flex-grow", children: _jsxs("div", { className: "bg-gray-800 w-[480px] p-6 rounded-lg shadow-lg text-gray-200", children: [_jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-2xl font-bold mb-6", children: "Upload Data" }), _jsx("p", { className: "mb-6", children: "Upload a CSV file to add animals" })] }), _jsxs("div", { className: "flex flex-col flex-grow justify-center items-center w-full px-4", children: [_jsx("label", { htmlFor: "file-upload", className: `
                    mb-4 text-white font-bold py-2 px-4 rounded
                    transition duration-200 ease-in-out cursor-pointer 
                    ${file ? 'bg-gray-500 hover:bg-gray-600' : 'bg-teal-400 hover:bg-teal-500'}`, children: "Choose File" }), _jsx("span", { id: "file-name", className: `
                    mt-20 mb-6 text-md
                    ${file ? 'text-white' : 'text-gray-600'}`, children: file ? file.name : 'No file chosen' }), _jsx("div", { className: "hidden", children: _jsx("input", { id: "file-upload", type: "file", className: "hidden", onChange: handleFileChange, accept: '.csv' }) }), _jsx("button", { className: `transition duration-200 ease-in-out cursor-pointer mt-0 font-bold py-2 px-4 rounded
                    ${file ? 'bg-teal-400 hover:bg-teal-500 text-white opacity-100' : 'opacity-50 cursor-pointer mt-0 bg-gray-400 hover:bg-gray-500 text-white'}`, onClick: () => {
                                // If no file is selected, alert user to choose a file
                                if (!file) {
                                    alert('Please choose a file before uploading.');
                                }
                                else {
                                    // Get the file input element and the file from it
                                    const fileInput = document.getElementById('file-upload');
                                    const file = fileInput.files?.[0];
                                    // If a file is selected, call handleCSV with the file and a callback function onValidData that will give us the valid data
                                    if (file) {
                                        // Call handleCSV function to parse and validate the CSV file
                                        handleCSV({
                                            file: file, onValidData: async (data) => {
                                                try {
                                                    const response = await fetch('https://cs-499-api-aehve5e4afg0bsh8.centralus-01.azurewebsites.net/api/v1/animals/batch-upload', {
                                                        method: 'POST',
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                        },
                                                        body: JSON.stringify(data),
                                                    });
                                                    if (!response.ok) {
                                                        throw new Error(`HTTP error! status: ${response.status}`);
                                                    }
                                                    // Parse the response as JSON
                                                    const result = await response.json();
                                                    console.log('Upload successful:', result);
                                                    alert('Data uploaded successfully!');
                                                }
                                                catch (error) {
                                                    console.error('Upload failed:', error);
                                                    alert('Failed to upload data.');
                                                }
                                            }
                                        });
                                    }
                                }
                            }, children: "Upload" })] })] }) }));
}
export default AddDataPage;
