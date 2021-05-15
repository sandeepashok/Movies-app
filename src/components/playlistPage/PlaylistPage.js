import React from 'react'
import Playlist from '../Playlist/Playlist'

export default function PlaylistPage({ image, addBookmarksHandler, bookmarks, removeBookmarksHandler, playlists, removeMovieFromplaylist, removePlaylistHandler }) {

    return (
        <>
            <h1 className='page-heading'>Playlists</h1>
            <div className='playlist-container'>

                {playlists.length > 0 && playlists.map((playlist) => {
                    console.log(playlist.id)
                    return (
                        <div className='playlist-card-container' key={playlist.id}>
                            <div className='playlist-header'>
                                <h1 className='playlist-name' >{playlist.name}</h1>
                                <button className='delete-playlist' onClick={() => removePlaylistHandler(playlist.id)}>Delete playlist</button>
                            </div>
                            <div className='playlist-cards'>
                                <Playlist key={Playlist.id} moviesData={playlist} image={image} addBookmarksHandler={addBookmarksHandler} bookmarks={bookmarks} removeBookmarksHandler={removeBookmarksHandler} removeMovieFromplaylist={removeMovieFromplaylist} removePlaylistHandler={removePlaylistHandler} />
                            </div>
                        </div>
                    );

                })}

            </div>
        </>
    )
}

