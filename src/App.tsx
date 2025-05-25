import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routes';

function App() {
  return (
    // flex-col is used to stacked the header, main and footer
    // min-h-screen is used to make sure the footer is always at the bottom
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <Header />
      {/* Main content area after header */}
      {/* mx-auto is used to center the container horizontally */}
      <main className="flex-grow container mx-auto p-4">
        {/* AppRoutes is used to handle routing from index.tsx in ../routes */}
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
