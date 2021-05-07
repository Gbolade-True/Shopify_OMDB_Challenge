import React, { FC, useState, useContext } from 'react';
import Search from '../../utils/search';
import { OMDBMoviesContext } from '../../context/OMDBMoviesContext';
import './index.scss';

interface IProps {};

const Navbar: FC<IProps> = (props) => {

    const value = useContext(OMDBMoviesContext);
    const { getMoviesBySearch } = value;
    const [ movieName, setMovieName ] = useState('');

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setMovieName(e.target.value);
    };

    return (
        <div className='navigations'>
            <header className="navbar">
                <div className='logo'>
                    <p>OMDB</p>
                </div>

                <div className='search'>
                    <Search valueIn={movieName.length > 0} value={movieName} onChange={handleChange}                    onClick={() => {getMoviesBySearch(movieName, value.pageNumber); value.setMovie(movieName)}} onClose={() => setMovieName('')} />
                </div>
                
                <div className='icons'>
                    {value.showNominees?
                        <p onClick={ () => {value.setShowNominees(false)}}>Back to list</p>
                        :
                        <p onClick={ () => {value.setShowNominees(true)}}>Nominees {value.nominees.length}</p>
                    }
                </div>
            </header>
        </div>
    )
};

export default Navbar;