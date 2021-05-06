import axios from 'axios';
import React, { useState, createContext, ReactNode, FC } from 'react';
import { baseurl } from '../utils/constants';
import { IMovieSearch, MovieResultType } from '../interfaces/IMovieSearch';

export const OMDBMoviesContext = createContext<IValue>({} as IValue );

interface IProps {
    children: ReactNode;
};

export const OMDBMoviesProvider:FC<IProps> = ( props ) => {
    const { children } = props;
    const [ loading, setLoading ] = useState(false);
    const [ showNominees, setShowNominees ] = useState(false);
    const [ movies, setMovies ] = useState<Array<IMovieSearch>>([]);
    const [ nominees, setNominees ] = useState<Array<IMovieSearch>>([]);
    const [ notifyNominee ] = useState(nominees.length === 5? true : false)

    const getMoviesBySearch = async ( query: string ) => {
        setLoading(true);
        await axios.get<MovieResultType>(`${baseurl}&s=${query}`)
        .then((res) => {
            setMovies(res.data.Search)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err, 'err')
        })
    };

    const addToNominees = ( movie: IMovieSearch ) => {
        nominees.length < 5 && !(nominees.some(nominee => nominee.imdbID === movie.imdbID)) &&
        setNominees(prevNomiees => [...prevNomiees, movie ])
    };

    const removeNominee = ( movie: IMovieSearch ) => {
        setNominees(nominees.filter(nominee => nominee.imdbID !== movie.imdbID))
    };

    return(
        <OMDBMoviesContext.Provider value={{
            loading, setLoading, movies, setMovies, nominees, setNominees, getMoviesBySearch,
            addToNominees, removeNominee, notifyNominee, showNominees, setShowNominees
        }}>
            { children }
        </OMDBMoviesContext.Provider>
    )
} 

type IValue = {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    movies: Array<IMovieSearch>;
    setMovies: React.Dispatch<React.SetStateAction<IMovieSearch[]>>;
    nominees: Array<IMovieSearch>;
    setNominees: React.Dispatch<React.SetStateAction<IMovieSearch[]>>;
    getMoviesBySearch: (query: string) => Promise<void>;
    addToNominees: (movie: IMovieSearch) => void;
    removeNominee: (movie: IMovieSearch) => void;
    notifyNominee: boolean;
    showNominees: boolean;
    setShowNominees: React.Dispatch<React.SetStateAction<boolean>>;
}

