import './bookmarks.css'
import CloseIcon from '@material-ui/icons/Close';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import QueueIcon from '@material-ui/icons/Queue';
import React, { useState } from 'react'

export default function Bookmarks({ bookmark, image, removeBookmarksHandler, playlists, removeMovieFromplaylist, addMovieToPlaylist, addEmptyPlaylist }) {

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [modalInput, setModalInput] = useState('')

    const substuteImage = 'https://images.unsplash.com/photo-1542423348-821c6bb30fe6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHBvc3RlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'

    const substuteOverview = "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book."

    let modalClass = 'hide-modal'

    isModalVisible ? modalClass = 'modal' : modalClass = 'hide-modal';

    return (
        <div className='movie'>

            <div className='movie-info'>

                <div className={modalClass}>
                    <div className='modal-content'>
                        <CloseIcon className='close' onClick={() => setIsModalVisible(false)} />
                        <h2>Add to Playlist</h2>
                        <div className='checklist-container'>

                            {playlists.map(playlist => {

                                const movieExistInPlaylist = playlist.movies.find(movie => {

                                    return movie.id === bookmark.id
                                })

                                return <label className='playlist-names' key={playlist.id}>
                                    <input type='checkbox' value={!!movieExistInPlaylist} checked={!!movieExistInPlaylist} onChange={(e) => {
                                        if (!!movieExistInPlaylist) {
                                            removeMovieFromplaylist(playlist.id, bookmark.id)
                                        } else {
                                            addMovieToPlaylist(playlist.id, bookmark.id)
                                        }
                                    }
                                    } /> <span>{playlist.name}</span></label>
                            })}
                        </div>

                        <form>
                            <input type='text' value={modalInput} onChange={(e) => setModalInput(e.target.value)} />
                            <button type='submit' class='modal-button' onClick={(e) => {
                                e.preventDefault()
                                if (modalInput !== '') {
                                    addEmptyPlaylist(modalInput)
                                    setModalInput('')
                                }
                            }}>Create Playlist</button>
                        </form>
                    </div>
                </div>

                <TurnedInIcon className='bookmark' onClick={() => removeBookmarksHandler(bookmark.id)} />

                <img alt='Poster' src={(bookmark.poster_path ? image + bookmark.poster_path : substuteImage)} />

                <h3>{bookmark.title}</h3>

                <div className='rating-playlist-section'>

                    <span>IMDb: &#9733;{bookmark.vote_average}</span>

                    <QueueIcon className='playlist-btn' onClick={() => {
                        setIsModalVisible(true)
                    }} />

                </div>

                <div className='overview'>

                    <h2>Overview:</h2>

                    <p>{bookmark.overview ? bookmark.overview : substuteOverview}</p>

                </div>

            </div>

        </div>
    )
}



