import React from 'react'
import Bookmarks from '../Bookmarks/Bookmarks'

const BookmarksPage = ({ bookmarks, image, removeBookmarksHandler, playlists, removeMovieFromplaylist, addMovieToPlaylist, addEmptyPlaylist }) => {
    return (
        <>
            <h1>Bookmarks</h1>
            <div className='bookmarks-container'>

                {bookmarks.length > 0 && bookmarks.map(bookmark => {

                    return <Bookmarks key={bookmark.id} bookmark={bookmark} image={image} removeBookmarksHandler={removeBookmarksHandler} playlists={playlists} removeMovieFromplaylist={removeMovieFromplaylist} addMovieToPlaylist={addMovieToPlaylist} addEmptyPlaylist={addEmptyPlaylist} />

                })}

            </div>
        </>
    )
}

export default BookmarksPage
