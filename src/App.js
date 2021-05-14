import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar/Navbar'
import Homepage from './components/homepage/homepage'
import BookmarksPage from './components/bookmarksPage/BookmarksPage'
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
  const [bookmarks, setBookmarks] = useState([
    {
      "adult": false,
      "backdrop_path": "/6TPZSJ06OEXeelx1U1VIAt0j9Ry.jpg",
      "genre_ids": [
        28,
        80,
        53
      ],
      "id": 587996,
      "original_language": "es",
      "original_title": "Bajocero",
      "overview": "When a prisoner transfer van is attacked, the cop in charge must fight those inside and outside while dealing with a silent foe: the icy temperatures.",
      "popularity": 893.758,
      "poster_path": "/dWSnsAGTfc8U27bWsy2RfwZs0Bs.jpg",
      "release_date": "2021-01-29",
      "title": "Below Zero",
      "video": false,
      "vote_average": 6.4,
      "vote_count": 547
    },
    {
      "adult": false,
      "backdrop_path": "/ovggmAOu1IbPGTQE8lg4lBasNC7.jpg",
      "genre_ids": [
        878,
        28,
        12,
        53
      ],
      "id": 412656,
      "original_language": "en",
      "original_title": "Chaos Walking",
      "overview": "Two unlikely companions embark on a perilous adventure through the badlands of an unexplored planet as they try to escape a dangerous and disorienting reality, where all inner thoughts are seen and heard by everyone.",
      "popularity": 1031.402,
      "poster_path": "/9kg73Mg8WJKlB9Y2SAJzeDKAnuB.jpg",
      "release_date": "2021-02-24",
      "title": "Chaos Walking",
      "video": false,
      "vote_average": 7.2,
      "vote_count": 549
    },
    {
      "adult": false,
      "backdrop_path": "/5Zv5KmgZzdIvXz2KC3n0MyecSNL.jpg",
      "genre_ids": [
        28,
        53,
        80
      ],
      "id": 634528,
      "original_language": "en",
      "original_title": "The Marksman",
      "overview": "Jim Hanson’s quiet life is suddenly disturbed by two people crossing the US/Mexico border – a woman and her young son – desperate to flee a Mexican cartel. After a shootout leaves the mother dead, Jim becomes the boy’s reluctant defender. He embraces his role as Miguel’s protector and will stop at nothing to get him to safety, as they go on the run from the relentless assassins.",
      "popularity": 967.189,
      "poster_path": "/6vcDalR50RWa309vBH1NLmG2rjQ.jpg",
      "release_date": "2021-01-15",
      "title": "The Marksman",
      "video": false,
      "vote_average": 7.4,
      "vote_count": 437
    },
    {
      "adult": false,
      "backdrop_path": "/c7dFSqZQYqNNJVpacpIGZe3gkLW.jpg",
      "genre_ids": [
        16,
        35,
        14
      ],
      "id": 813258,
      "original_language": "en",
      "original_title": "Monster Pets: A Hotel Transylvania Short",
      "overview": "Drac tries out some new monster pets to help occupy Tinkles for playtime.",
      "popularity": 976.082,
      "poster_path": "/dkokENeY5Ka30BFgWAqk14mbnGs.jpg",
      "release_date": "2021-04-02",
      "title": "Monster Pets: A Hotel Transylvania Short",
      "video": false,
      "vote_average": 7.7,
      "vote_count": 93
    },
    {
      "adult": false,
      "backdrop_path": "/zDq2pwPyt4xwSFHKUoNN2LohDWj.jpg",
      "genre_ids": [
        27
      ],
      "id": 632357,
      "original_language": "en",
      "original_title": "The Unholy",
      "overview": "Alice, a young hearing-impaired girl who, after a supposed visitation from the Virgin Mary, is inexplicably able to hear, speak and heal the sick. As word spreads and people from near and far flock to witness her miracles, a disgraced journalist hoping to revive his career visits the small New England town to investigate. When terrifying events begin to happen all around, he starts to question if these phenomena are the works of the Virgin Mary or something much more sinister.",
      "popularity": 844.368,
      "poster_path": "/b4gYVcl8pParX8AjkN90iQrWrWO.jpg",
      "release_date": "2021-03-31",
      "title": "The Unholy",
      "video": false,
      "vote_average": 5.5,
      "vote_count": 81
    }
  ])
  const [playlists, setPlaylists] = useState([
    {
      name: "My Playlist",
      id: uuidv4(),
      movies: [
        {
          "adult": false,
          "backdrop_path": "/ovggmAOu1IbPGTQE8lg4lBasNC7.jpg",
          "genre_ids": [
            878,
            28,
            12,
            53
          ],
          "id": 412656,
          "original_language": "en",
          "original_title": "Chaos Walking",
          "overview": "Two unlikely companions embark on a perilous adventure through the badlands of an unexplored planet as they try to escape a dangerous and disorienting reality, where all inner thoughts are seen and heard by everyone.",
          "popularity": 1031.402,
          "poster_path": "/9kg73Mg8WJKlB9Y2SAJzeDKAnuB.jpg",
          "release_date": "2021-02-24",
          "title": "Chaos Walking",
          "video": false,
          "vote_average": 7.2,
          "vote_count": 549
        },
        {
          "adult": false,
          "backdrop_path": "/c7dFSqZQYqNNJVpacpIGZe3gkLW.jpg",
          "genre_ids": [
            16,
            35,
            14
          ],
          "id": 813258,
          "original_language": "en",
          "original_title": "Monster Pets: A Hotel Transylvania Short",
          "overview": "Drac tries out some new monster pets to help occupy Tinkles for playtime.",
          "popularity": 976.082,
          "poster_path": "/dkokENeY5Ka30BFgWAqk14mbnGs.jpg",
          "release_date": "2021-04-02",
          "title": "Monster Pets: A Hotel Transylvania Short",
          "video": false,
          "vote_average": 7.7,
          "vote_count": 93
        },
        {
          "adult": false,
          "backdrop_path": "/5Zv5KmgZzdIvXz2KC3n0MyecSNL.jpg",
          "genre_ids": [
            28,
            53,
            80
          ],
          "id": 634528,
          "original_language": "en",
          "original_title": "The Marksman",
          "overview": "Jim Hanson’s quiet life is suddenly disturbed by two people crossing the US/Mexico border – a woman and her young son – desperate to flee a Mexican cartel. After a shootout leaves the mother dead, Jim becomes the boy’s reluctant defender. He embraces his role as Miguel’s protector and will stop at nothing to get him to safety, as they go on the run from the relentless assassins.",
          "popularity": 967.189,
          "poster_path": "/6vcDalR50RWa309vBH1NLmG2rjQ.jpg",
          "release_date": "2021-01-15",
          "title": "The Marksman",
          "video": false,
          "vote_average": 7.4,
          "vote_count": 437
        },
        {
          "adult": false,
          "backdrop_path": "/6TPZSJ06OEXeelx1U1VIAt0j9Ry.jpg",
          "genre_ids": [
            28,
            80,
            53
          ],
          "id": 587996,
          "original_language": "es",
          "original_title": "Bajocero",
          "overview": "When a prisoner transfer van is attacked, the cop in charge must fight those inside and outside while dealing with a silent foe: the icy temperatures.",
          "popularity": 893.758,
          "poster_path": "/dWSnsAGTfc8U27bWsy2RfwZs0Bs.jpg",
          "release_date": "2021-01-29",
          "title": "Below Zero",
          "video": false,
          "vote_average": 6.4,
          "vote_count": 547
        },
        {
          "adult": false,
          "backdrop_path": "/zDq2pwPyt4xwSFHKUoNN2LohDWj.jpg",
          "genre_ids": [
            27
          ],
          "id": 632357,
          "original_language": "en",
          "original_title": "The Unholy",
          "overview": "Alice, a young hearing-impaired girl who, after a supposed visitation from the Virgin Mary, is inexplicably able to hear, speak and heal the sick. As word spreads and people from near and far flock to witness her miracles, a disgraced journalist hoping to revive his career visits the small New England town to investigate. When terrifying events begin to happen all around, he starts to question if these phenomena are the works of the Virgin Mary or something much more sinister.",
          "popularity": 844.368,
          "poster_path": "/b4gYVcl8pParX8AjkN90iQrWrWO.jpg",
          "release_date": "2021-03-31",
          "title": "The Unholy",
          "video": false,
          "vote_average": 5.5,
          "vote_count": 81
        }
      ]
    },
  ])

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

  console.log(playlists)

  const removeMovieFromplaylist = (playlistId, movieId) => {

    console.log('playlist id:', playlistId, 'movie id', movieId)

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

    console.log(playlists)

  }

  const addMovieToPlaylist = (playlistId, movieId) => {
    console.log('playlist id:', playlistId, 'movie id', movieId)

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

    console.log(playlists)
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
  }, [])

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



