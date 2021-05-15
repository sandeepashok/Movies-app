import './navbar.css'
import React, { useState } from 'react'
import axios from 'axios'
import MovieIcon from '@material-ui/icons/Movie';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink, Link } from 'react-router-dom'
import ModalSlider from '../ModalSlider/ModalSlider';

export default function Navbar({ setMovies, searchData }) {

    const [searchTerm, setSearchTerm] = useState('')

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios(searchData + searchTerm)
            .then(
                (moviesList) => {
                    setMovies(moviesList.data.results)
                }
            )

        setSearchTerm('')

    }

    const onChangeHandler = (e) => {
        setSearchTerm(e.target.value)
    }

    const [isActive, setIsActive] = useState(false)

    return (
        <div className='searchbar-container'>
            <ModalSlider setIsActive={setIsActive} isActive={isActive} />
            <header>
                <div className='brand-name'>
                    <MenuIcon className='hamburger-icon' onClick={() => setIsActive(!isActive)} />
                    <Link to='/' className='brandname-and-icon'>
                        <h2 className='brand' >Movieezy</h2>
                        <MovieIcon className='movie-icon' />
                    </Link>
                </div>
                <form className='search-form' onSubmit={onSubmitHandler} onChange={onChangeHandler}>
                    <input type='search' placeholder='Search Movies...' className='searchbar' value={searchTerm} />
                </form>
                <nav>
                    <NavLink to='/' end activeClassName='active-nav-links' className='nav-links'>Home</NavLink>
                    <NavLink to='/bookmarks' activeClassName='active-nav-links' className='nav-links'>Bookmarks</NavLink>
                    <NavLink to='/playlists' activeClassName='active-nav-links' className='nav-links'>Playlists</NavLink>
                </nav>
            </header>
        </div >
    )
}


