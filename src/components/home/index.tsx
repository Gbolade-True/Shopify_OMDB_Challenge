import React, { FC, useContext, useEffect, useState } from 'react';
import { OMDBMoviesContext } from '../../context/OMDBMoviesContext';
import { IMovieSearch } from '../../interfaces/IMovieSearch';
import GCard from '../../utils/card';
import './index.scss';

interface IProps {}

const Home:FC<IProps> = ( props ) => {
    const value = useContext(OMDBMoviesContext);
    const { pageNumber, setPageNumber, loading, nominees, movie, getMoviesBySearch, showNominees, setShowNominees, addToNominees, removeNominee, movies, setNominees } = value;
    var arrayToMap = showNominees ? nominees : movies;
    const [ prevNominees, setPrevNominees ] = useState<Array<IMovieSearch>>();

    var uniqueMovies = nominees.map(movie => {
        return movie.imdbID
    });
    const checkMovie = ( movie: IMovieSearch ) => {
        if(uniqueMovies.includes(movie.imdbID)){
            return false
        }else {
            return true
        }
    };

    useEffect(() => {
        var dNominees = localStorage.getItem('nominees')
        if(dNominees!== null) {
            setNominees(JSON.parse(dNominees))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        if( JSON.stringify(prevNominees) !== JSON.stringify(nominees) ) {
            setPrevNominees(nominees)
            localStorage.setItem('nominees', JSON.stringify(nominees))
        }
    },[prevNominees, nominees])

    return(
        <div style={{textAlign: 'center', backgroundColor:'#1D1D1D', minHeight:'100vh'}}>

            <div style={{paddingTop: '80px'}}>
                {showNominees ?
                    'View Nominees'
                    : 
                    <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
                        {nominees.length<5 && 
                        <>
                            <i className='fa fa-arrow-left' onClick={() => {pageNumber > 1 ? setPageNumber(pageNumber - 1): void(0); getMoviesBySearch(movie, pageNumber-1)}} />
                                <p style={{margin: '0 10px'}}>Page {pageNumber}</p>
                            <i className='fa fa-arrow-right' onClick={() => { setPageNumber(pageNumber + 1); getMoviesBySearch(movie, pageNumber+1)}} />
                        </>
                        }
                    </div>
                    
                }
            </div>

            {nominees.length < 5 || showNominees ?
                loading! ?
                    <h2>Loading...</h2>
                    :
                    <>
                    <div className='home'>
                        <div className="card-wrapper" >
                            {arrayToMap!?.map((movie, index) => {
                                    return(
                                        (checkMovie(movie) || showNominees ) &&
                                        <GCard cardObject={movie} cardImage={movie.Poster} cardHeader={movie.Title}
                                            onClick={() => addToNominees(movie)} key={index} remNom={() => removeNominee(movie)}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div> 
                    </>
                :
                <>
                    <h2>You've successfully nominated 5 movies!!!</h2>  
                    <div className='notify' onClick={() => setShowNominees(true)}>
                        <p>
                            View the nominee list...
                       </p>
                    </div>
                </>
            }

        </div>
    );
};

export default Home;