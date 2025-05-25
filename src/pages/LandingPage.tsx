import { Link } from 'react-router-dom';

// Main landing page
// dev address: http://localhost:5173/

function LandingPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-4">
        Welcome to GS Rescues
      </h1>
      <p className="text-center mb-8">
        Rescue animals and adoption services for dogs and monkeys
      </p>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <Link
          to="/dogs"
          className="bg-fuchsia-200/20 text-2xl text-center mb-8 w-[240px] h-[140px] border-2 border-white/70 flex items-center justify-center rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-900/15 hover:scale-105 hover:shadow-lg hover:shadow-gray-700"
        >
          See all dogs
        </Link>
        <Link
          to="/monkeys"
          className="bg-fuchsia-200/20 text-2xl text-center mb-8 w-[240px] h-[140px] border-2 border-white/70 flex items-center justify-center rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-900/15 hover:scale-105 hover:shadow-lg hover:shadow-gray-700"
        >
          See all monkeys
        </Link>
        <Link
          to="/reserve"
          className="bg-fuchsia-200/20 text-2xl text-center mb-8 w-[240px] h-[140px] border-2 border-white/70 flex items-center justify-center rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-900/15 hover:scale-105 hover:shadow-lg hover:shadow-gray-700"
        >
          Reserve an animal
        </Link>
      </div>
    </>
  );
}

export default LandingPage;
