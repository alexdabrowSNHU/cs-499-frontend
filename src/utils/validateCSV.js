// Function to validate a row of CSV data against the Animal type
const validateBaseAnimal = (row) => {
    // array to hold error messages
    const errors = [];
    if (!row.id)
        errors.push('Missing id');
    if (!row.name)
        errors.push('Missing name');
    if (!row.type)
        errors.push('Missing type');
    if (!row.gender)
        errors.push('Missing gender');
    if (!row.age)
        errors.push('Missing age');
    if (!row.weight)
        errors.push('Missing weight');
    if (!row.acquisitionDate)
        errors.push('Missing acquisitionDate');
    if (!row.inServiceCountry)
        errors.push('Missing inServiceCountry');
    if (!row.trainingStatus)
        errors.push('Missing trainingStatus');
    if (row.reserved === undefined)
        errors.push('Missing reserved status');
    if (!row.acquisitionCountry)
        errors.push('Missing acquisitionCountry');
    return errors;
};
const validateDog = (row) => {
    // Array to hold error message of Dog type
    const errors = [];
    if (!row.breed)
        errors.push('Missing breed for dog');
    return errors;
};
const validateMonkey = (row) => {
    // Array to hold error messages of monkey type
    const errors = [];
    if (!row.species)
        errors.push('Missing species for monkey');
    if (!row.tailLength)
        errors.push('Missing tailLength for monkey');
    if (!row.height)
        errors.push('Missing height for monkey');
    if (!row.bodyLength)
        errors.push('Missing bodyLength for monkey');
    return errors;
};
// Function to validate a CSV row based on the type of animal
const validateCSVRow = (row) => {
    const errors = [];
    // Validate base animal properties and spread any errors so they aren't nested
    errors.push(...validateBaseAnimal(row));
    // Validate specific animal types
    if (row.type === 'dog') {
        errors.push(...validateDog(row));
    }
    else if (row.type === 'monkey') {
        errors.push(...validateMonkey(row));
    }
    // Return validation result
    return {
        // if the errors array is empty, the row is valid
        isValid: errors.length === 0,
        // return the errors array
        errors: errors,
    };
};
export default validateCSVRow;
