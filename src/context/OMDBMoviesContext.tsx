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
    const [ movie, setMovie ] = useState('');
    const [ nominees, setNominees ] = useState<Array<IMovieSearch>>([]);
    const [ notifyNominee ] = useState(nominees.length === 5? true : false);
    const [ pageNumber, setPageNumber ] = useState(1);

    const getMoviesBySearch = async ( query: string, pageNumber: number ) => {
        setLoading(true);
        await axios.get<MovieResultType>(`${baseurl}&s=${query}&type=movie&page=${pageNumber}`)
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
            addToNominees, removeNominee, notifyNominee, showNominees, setShowNominees,
            pageNumber, setPageNumber, movie, setMovie
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
    getMoviesBySearch: (query: string, pageNumber: number) => Promise<void>;
    addToNominees: (movie: IMovieSearch) => void;
    removeNominee: (movie: IMovieSearch) => void;
    notifyNominee: boolean;
    showNominees: boolean;
    setShowNominees: React.Dispatch<React.SetStateAction<boolean>>;
    pageNumber: number;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
    movie: string;
    setMovie: React.Dispatch<React.SetStateAction<string>>;
}

