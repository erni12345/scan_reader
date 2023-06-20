
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import MangaDetails from './MangaDetails';
import ReadChapter from './ReadChapter';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manga/:id" element={<MangaDetails />} />
          <Route path="/read/:id" element ={<ReadChapter />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
