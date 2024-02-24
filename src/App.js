import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SearchBar } from './components/SearchBar';
import { SearchList } from './components/SearchList';
import API_URL from './config';
function App() {
  const [input, setInput] = useState("")
  const [results, setResults] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${API_URL}/search?api-key=test&q=${input}&show-fields=thumbnail,headline&show-tags=keyword&page=${currentPage}&page-size=${pageSize}`
        const response = await fetch(url);
        const data = await response.json();
        setResults(data.response.results);
        setTotalPages(data.response.pages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage,input]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/"
            element={<SearchBar
              setResults={setResults}
              currentPage={currentPage}
              pageSize={pageSize}
              setInput={setInput}
              input={input}
              setTotalPages={setTotalPages}
            />} />
          <Route path="/search"
            element={<SearchList
              results={results}
              pageSize={pageSize}
              currentPage={currentPage}
              setPageSize={setPageSize}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              handlePreviousPage={handlePreviousPage}
              handleNextPage={handleNextPage}
              input={input}
              setInput={setInput}
            />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
