import { useEffect, useState } from "react";
import './App.css'
import MovieCard  from "./MovieCard";

//the link to make the api call
const API_URL = 'http://www.omdbapi.com?apikey=fe5ff497'

const movie1 = {
    "Title": "Superman Returns",
    "Year": "2006",
    "imdbID": "tt0348150",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNDUzZGRhNzktYTZkMC00YWFiLTljMDEtMTk2OWJhYzAyYmY2XkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg"
}

const App = () => {

    const [movies,setMovies] = useState([])
    const [searchTerm,setSearchTerm] = useState("")

    const searchMovies = async (title:string) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        //to get only the search array
        setMovies(data.Search);
        
    }

    useEffect(() => {
        searchMovies("superman");
    },[])

    return(
        <div className="app">
            <h1>movieWorld</h1>

            <div className="search">
                <input type="text" placeholder="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} />

                <button onClick={() => searchMovies(searchTerm)}>Find</button>
            </div>

            {
                movies?.length > 0 ?(
                    <div className="container">

                    {
                        movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))
                    }
        
                    </div>
                ):
                (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )

            }



        </div>
    );
}

export default App;