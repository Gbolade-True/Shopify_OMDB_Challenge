import React, { FC, useContext } from 'react';
import { OMDBMoviesContext } from '../../context/OMDBMoviesContext';
import GCard from '../../utils/card';
import './index.scss';

interface IProps {}

const Home:FC<IProps> = ( props ) => {
    const value = useContext(OMDBMoviesContext);
    var arrayToMap = value.showNominees ? value.nominees : value.movies

    return(
        <div style={{textAlign: 'center', backgroundColor:'#1D1D1D', minHeight:'100vh'}}>
            <h2 style={{paddingTop: '80px'}}>{value.showNominees ? 'View Nominees': 'Your results'}</h2>
            {value.nominees.length < 5 || value.showNominees ?
                value!?.loading! ?
                    <h2>Loading...</h2>
                    :
                    <div className='home'>
                        <div className="card-wrapper" >
                            {arrayToMap!?.map((movie, index) => {
                                    return(
                                        <GCard cardObject={movie} cardImage={movie.Poster} cardHeader={movie.Title}
                                            onClick={() => value!?.addToNominees(movie)} key={index} remNom={() => value!?.removeNominee(movie)}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div> 
                :
                <>
                    <h2>You've successfully nominated 5 movies!!!</h2>  
                    <div className='notify'>
                        <p onClick={() => value.setShowNominees(true)}>
                            View the nominee list...
                       </p>
                    </div>
                </>
            }

        </div>
    );
};

export default Home;