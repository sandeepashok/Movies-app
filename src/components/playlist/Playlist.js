import './playlist.css'
import { CgPlayListRemove } from "@react-icons/all-files/cg/CgPlayListRemove";
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import React from 'react'

export default function Playlist({ moviesData, image, addBookmarksHandler, bookmarks, removeBookmarksHandler, removeMovieFromplaylist }) {

    const substuteImage = 'https://images.unsplash.com/photo-1542423348-821c6bb30fe6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHBvc3RlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'

    const substuteOverview = "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book."

    return (
        <>

            { moviesData.movies.map(data => {
                const bookmarkExists = bookmarks.find(bookmark => {
                    return bookmark.id === data.id;
                })
                return (
                    <div className='movie' >

                        <div className='movie-info' key={moviesData.id}>

                            <> {bookmarkExists ? <TurnedInIcon className='bookmark' onClick={() => {
                                removeBookmarksHandler(data.id)
                            }} /> : <TurnedInNotIcon className='bookmark' onClick={() => {
                                addBookmarksHandler(data.id)
                            }
                            } />}</>

                            <img alt='Poster' src={(data.poster_path ? image + data.poster_path : substuteImage)} />

                            <h3>{data.title}</h3>

                            <div className='rating-playlist-section'>

                                <span>IMDb: &#9733;{data.vote_average}</span>

                                <CgPlayListRemove className='remove-from-playlist-btn' onClick={() => {
                                    removeMovieFromplaylist(moviesData.id, data.id)
                                }} />

                            </div>
                            <div className='overview'>

                                <h2>Overview:</h2>

                                <p>{data.overview ? data.overview : substuteOverview}</p>

                            </div>

                        </div>
                    </div>

                );
            })
            }
        </>


    )
}









