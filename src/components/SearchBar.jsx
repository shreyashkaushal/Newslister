import React from 'react'
import { FaSearch } from 'react-icons/fa'
import "../style/SearchBar.css"
import { useNavigate } from 'react-router-dom';
import { FaRegNewspaper } from "react-icons/fa";
import API_URL from '../config';

export const SearchBar = ({ setInput, input, currentPage, pageSize, setResults, setTotalPages }) => {
    const navigate = useNavigate();
    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const handleSearch = async () => {
        try {
            let url = `${API_URL}/search?api-key=test&q=${input}&show-fields=thumbnail,headline&show-tags=keyword&page=${currentPage}&page-size=${pageSize}`
            const response = await fetch(url);
            const data = await response.json();
            console.log("api response", data.response)
            setResults(data.response.results)
            setTotalPages(data.response.pages);
            navigate('/search');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    return (
        <div className="search-bar-container">
            <h1>News Lister <FaRegNewspaper /></h1>
            <div className='input-wrapper'>
                <FaSearch id='search-icon' />
                <input placeholder='Type to search...' value={input} onChange={handleChange} />
                <button disabled={!input.trim()} onClick={handleSearch}>Search</button>
            </div>
        </div>
    )
}
