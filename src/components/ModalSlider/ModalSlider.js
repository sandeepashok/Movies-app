import React from 'react'
import MovieIcon from '@material-ui/icons/Movie';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink, Link } from 'react-router-dom'
import './modal-slider.css'

export default function ModalSlider({ setIsActive, isActive }) {

    return (
        <div className={isActive ? 'modal-slider' : 'close-modal-slider'}>
            <div className='modal-brand-name'>
                <MenuIcon className='modal-hamburger-icon' onClick={() => setIsActive((state) => {
                    return !state
                })} />
                <Link to='/' className='modal-brandname-and-icon'>
                    <h2 className='modal-brand' >Movieezy</h2>
                    <MovieIcon className='modal-movie-icon' />
                </Link>
            </div>
            <nav>
                <NavLink to='/' end activeClassName='modal-active-nav-links' className='modal-nav-links' onClick={() => setIsActive((state) => {
                    return !state
                })} >Home</NavLink>
                <NavLink to='/bookmarks' activeClassName='modal-active-nav-links' className='modal-nav-links' onClick={() => setIsActive((state) => {
                    return !state
                })}>Bookmarks</NavLink>
                <NavLink to='/playlists' activeClassName='modal-active-nav-links' className='modal-nav-links' onClick={() => setIsActive((state) => {
                    return !state
                })}>Playlists</NavLink>
            </nav>
        </div>
    )
}
