import React from 'react'
import "../style/SearchList.css"
import { SearchResult } from './SearchResult'
import noResFoundImg from '../assets/no-result-found.jpg'
export const SearchList = ({ results, currentPage,setCurrentPage, totalPages, handleNextPage, handlePreviousPage, input,setInput }) => {
    const handleKeywordSearch = async (keyword) => {
            await setInput(keyword)
            await setCurrentPage(1)
    };
    return (
        <div className='search-result-container'>
            {
                results.length != 0
                    ?
                    <>
                        <h2 id='result-heading'>Results for {input}</h2>
                        <div className='results-list'>
                            {
                                results.map((result, id) => {
                                    return (
                                        <SearchResult handleKeywordSearch={handleKeywordSearch} result={result} key={id} />
                                    )
                                })
                            }
                        </div>
                        <div className='pagination-div'>
                            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                                Previous
                            </button>
                            <span id='pages'>{`Page ${currentPage} of ${totalPages}`}</span>
                            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                                Next
                            </button>
                        </div>
                    </>
                    :
                    <div className='no-result-div'>
                        <img className="noResult" src={noResFoundImg} />
                        <p className='noResult-Para'>No Result Found</p>
                    </div>
            }

        </div>
    )
}
