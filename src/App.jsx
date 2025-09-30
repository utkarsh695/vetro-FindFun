// Main App component with routing and context providers
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WatchlistProvider } from './context/WatchlistContext';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { WatchlistPage } from './pages/WatchlistPage';

function App() {
  return (
    <WatchlistProvider>
      <Router>
        <div className="min-h-screen gradient-background-animated">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/watchlist" element={<WatchlistPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </WatchlistProvider>
  );
}

export default App;