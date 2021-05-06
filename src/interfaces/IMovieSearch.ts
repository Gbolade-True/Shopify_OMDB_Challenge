export interface IMovieSearch {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
};

export type MovieResultType = {
    Search: Array<IMovieSearch>;
    totalResults: string;
    Response: string;
};