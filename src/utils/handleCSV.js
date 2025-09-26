import Papa from 'papaparse';
import validateCSVRow from './validateCSV'; // Adjust the path if needed
// Function to handle CSV file parsing and validation
const handleCSV = ({ file, onValidData }) => {
    // PapaParse is used to parse the CSV file
    Papa.parse(file, {
        // Config for parsing the CSV
        // The header option is set to true to read the first row as headers that map
        header: true,
        skipEmptyLines: true,
        // Callback function when parsing is complete
        // This function will be called with the parsed results for further processing
        // ParseResult contains the parsed data, and we can access it through results.data
        complete: (results) => {
            // Store the raw data from the CSV
            const rawData = results.data;
            // Initialzing an empty array store valid and invalid rows -
            const validData = [];
            // Initializing an empty array to store invalid rows with their index, an array of errors, and the row data
            const invalidRows = [];
            // Iterate through each row of the CSV data
            rawData.forEach((row, index) => {
                // Validate the row using the validateCSVRow function
                // This function checks the row against the Animal type and returns validation results
                const { isValid, errors } = validateCSVRow(row);
                if (isValid) {
                    validData.push(row);
                }
                else {
                    invalidRows.push({ index: index + 1, errors, row });
                }
            });
            // After processing, log the results
            if (invalidRows.length > 0) {
                console.warn('Invalid CSV rows found:', invalidRows);
            }
            if (invalidRows.length === 0) {
                console.log('All rows are valid');
                // print valid data to console
                alert('Valid data: ' + JSON.stringify(validData));
            }
            // Passes the valid data back to the caller in AddDataPage.tsx
            onValidData(validData);
        },
        error: (error) => {
            console.error('Error parsing CSV:', error);
        }
    });
};
export default handleCSV;
