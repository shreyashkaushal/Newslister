import React from 'react'
import '../style/SearchResult.css'
import defaultThumbnail from '../assets/default-thumbnail.png';
import { Link } from 'react-router-dom';
export const SearchResult = ({ result,handleKeywordSearch}) => {
    return (
        <>
            <div className="list-item">
                <Link to={result.webUrl} target="_blank" rel="noopener noreferrer">
                    <img className="thumbnail" src={result.fields.thumbnail ? result.fields.thumbnail : defaultThumbnail} alt="Thumbnail 1" />
                </Link>
                <div className='heading-div'>
                    <Link to={result.webUrl} target="_blank" rel="noopener noreferrer" className='link'>
                        <h4 className="heading">{result.fields.headline}</h4>
                    </Link>
                    <div className="tags">
                        {
                            result.tags.filter((tag) => tag.type === "keyword").map((keyword, id) => {
                                return (
                                    <div className="tag" onClick={()=>handleKeywordSearch(keyword.webTitle)} key={id}>{keyword.webTitle}</div>
                                )
                            })
                        }


                    </div>
                </div>
            </div>
        </>
    )
}
