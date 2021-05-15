import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar'
import Homepage from './components/Homepage/Homepage'
import BookmarksPage from './components/BookmarksPage/BookmarksPage'
import PlaylistPage from './components/playlistPage/PlaylistPage'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import { Routes, Route } from 'react-router-dom'

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMAGE_API = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

export default function App() {

  const [movies, setMovies] = useState([]);
  const [bookmarks, setBookmarks] = useState([])
  const [playlists, setPlaylists] = useState([])

  // console.log(playlistmovies)

  const addBookmarksHandler = (id) => {
    const bookmarkExists = bookmarks.find(bookmark => {
      return bookmark.id === id;
    })

    if (!bookmarkExists) {
      const selectedMovie = movies.find(movie => {
        return movie.id === id;
      })
      const selectedMovieCopy = { ...selectedMovie }
      setBookmarks([...bookmarks, selectedMovieCopy])
    }
  }

  const removeBookmarksHandler = (id) => {
    const bookmarksCopy = [...bookmarks]
    const filteredBookmarks = bookmarksCopy.filter(bookmark => {
      return bookmark.id !== id;
    })
    setBookmarks(filteredBookmarks)
  }

  const removeMovieFromplaylist = (playlistId, movieId) => {

    const currentPlaylist = playlists.map(playlist => {
      if (playlistId !== playlist.id) {
        return playlist
      } else {
        const playlistCopy = { ...playlist }
        const filteredPlaylistMovies = playlistCopy.movies.filter(movie => {
          return movie.id !== movieId
        })
        const allPlaylistsCopy = [...playlists]

        const playlistToUpdate = allPlaylistsCopy.find(playlist => {
          return playlist.id === playlistId
        })
        const playlistToUpdateCopy = { ...playlistToUpdate }
        playlistToUpdateCopy.movies = filteredPlaylistMovies
        return playlistToUpdateCopy
      }
    })

    // console.log(currentPlaylist)

    setPlaylists(currentPlaylist)


  }

  const addMovieToPlaylist = (playlistId, movieId) => {

    const currentPlaylist = playlists.map(playlist => {
      if (playlistId !== playlist.id) {
        return playlist
      } else {

        const requiredMovie = movies.find(movie => {
          return movie.id === movieId
        })

        const allPlaylistsCopy = [...playlists]

        const playlistToUpdate = allPlaylistsCopy.find(playlist => {
          return playlist.id === playlistId
        })
        const playlistToUpdateCopy = { ...playlistToUpdate }
        playlistToUpdateCopy.movies.push(requiredMovie)
        return playlistToUpdateCopy
      }
    })
    setPlaylists(currentPlaylist)

  }

  const addEmptyPlaylist = (playlistName) => {
    const emptyPlaylist = {
      name: playlistName,
      id: uuidv4(),
      movies: []
    }
    const playlistsCopy = [...playlists]
    playlistsCopy.push(emptyPlaylist)
    setPlaylists(playlistsCopy)
  }

  const removePlaylistHandler = (id) => {
    const playlistsCopy = [...playlists]
    const filteredplaylists = playlistsCopy.filter(playlist => {
      return playlist.id !== id;
    })
    setPlaylists(filteredplaylists)
  }

  useEffect(() => {
    axios(FEATURED_API)
      .then(
        (moviesList) => {
          setMovies(moviesList.data.results)
        }
      )
    setBookmarks(JSON.parse(localStorage.getItem('bookmarks')) || []);
    setPlaylists(JSON.parse(localStorage.getItem('playlists')) || []);
  }, [])



  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  useEffect(() => {
    localStorage.setItem('playlists', JSON.stringify(playlists))
  }, [playlists])

  return (
    <div className="App">
      <>

        <Navbar setMovies={setMovies} searchData={SEARCH_API} />

        <Routes>

          <Route path='/'
            element={
              <Homepage movies={movies} image={IMAGE_API} addBookmarksHandler={addBookmarksHandler} bookmarks={bookmarks} removeBookmarksHandler={removeBookmarksHandler} playlists={playlists} removeMovieFromplaylist={removeMovieFromplaylist} addMovieToPlaylist={addMovieToPlaylist} addEmptyPlaylist={addEmptyPlaylist} />
            } />


          <Route path='/bookmarks'
            element={
              <BookmarksPage bookmarks={bookmarks} image={IMAGE_API} removeBookmarksHandler={removeBookmarksHandler} playlists={playlists} removeMovieFromplaylist={removeMovieFromplaylist} addMovieToPlaylist={addMovieToPlaylist} addEmptyPlaylist={addEmptyPlaylist} />
            } />

          <Route path='/playlists'
            element={
              <PlaylistPage image={IMAGE_API} addBookmarksHandler={addBookmarksHandler} bookmarks={bookmarks} removeBookmarksHandler={removeBookmarksHandler} playlists={playlists} removeMovieFromplaylist={removeMovieFromplaylist} removePlaylistHandler={removePlaylistHandler} />
            } />

        </Routes>

      </>
    </div>
  );
}



