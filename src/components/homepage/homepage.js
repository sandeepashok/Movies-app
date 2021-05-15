import React from 'react'
import MovieList from '../MoviesList/MovieList';

export default function Homepage({ movies, image, addBookmarksHandler, bookmarks, removeBookmarksHandler, playlists, removeMovieFromplaylist, addMovieToPlaylist, addEmptyPlaylist }) {
    return (
        <>
            <h1>Homepage</h1>

            <div className='movie-container'>

                {movies.length > 0 && movies.map(movie => {

                    return <MovieList key={movie.id} data={movie} image={image} addBookmarksHandler={addBookmarksHandler} bookmarks={bookmarks} removeBookmarksHandler={removeBookmarksHandler} playlists={playlists} removeMovieFromplaylist={removeMovieFromplaylist} addMovieToPlaylist={addMovieToPlaylist} addEmptyPlaylist={addEmptyPlaylist} />

                })}

            </div>
        </>
    )
}


