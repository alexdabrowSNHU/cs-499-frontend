import { jsx as _jsx } from "react/jsx-runtime";
import DogList from '../components/DogList';
// This is the main page for the DogList component
// local dev address: http://localhost:5173/dogs
function DogPage() {
    return (_jsx(DogList, {}));
}
export default DogPage;
