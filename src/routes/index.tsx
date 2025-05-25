import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import DogPage from '../pages/DogPage';
import ReservePage from '../pages/ReservePage';
import MonkeyPage from '../pages/MonkeyPage';
import AnimalReserveForm from '../pages/AnimalReserveForm';

// We are using react router for routing
// We are defining all the routes here

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dogs" element={<DogPage />} />
      <Route path="/monkeys" element={<MonkeyPage />} />
      <Route path="/reserve" element={<ReservePage />} />
      <Route path="/reserve/:id" element={<AnimalReserveForm />} />
    </Routes>
  );
}
