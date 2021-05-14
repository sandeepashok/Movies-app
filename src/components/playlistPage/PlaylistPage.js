import React from 'react'
import Playlist from '../playlist/Playlist'

export default function PlaylistPage({ image, addBookmarksHandler, bookmarks, removeBookmarksHandler, playlists, removeMovieFromplaylist, removePlaylistHandler }) {

    return (
        <>
            <h1 className='page-heading'>Playlists</h1>
            <div className='playlist-container'>

                {playlists.length > 0 && playlists.map(playlist => {
                    return (
                        Playlist.movies !== [] ? <div key={playlist.id} className='playlist-card-container' >
                            <div className='playlist-header'>
                                <h1 className='playlist-name' >{playlist.name}</h1>
                                <button className='delete-playlist' onClick={() => removePlaylistHandler(playlist.id)}>Delete playlist</button>
                            </div>
                            <div className='playlist-cards'>
                                <Playlist moviesData={playlist} image={image} addBookmarksHandler={addBookmarksHandler} bookmarks={bookmarks} removeBookmarksHandler={removeBookmarksHandler} removeMovieFromplaylist={removeMovieFromplaylist} removePlaylistHandler={removePlaylistHandler} />
                            </div>
                        </div> : <h1>No Movies in Playlist</h1>
                    );

                })}

            </div>
        </>
    )
}

