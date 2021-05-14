import './navbar.css'
import React, { useState } from 'react'
import axios from 'axios'
import MovieIcon from '@material-ui/icons/Movie';
// import MenuIcon from '@material-ui/icons/Menu';
import { NavLink, Link } from 'react-router-dom'

export default function Searchbar({ setMovies, searchData }) {

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

    return (
        <div className='searchbar-container'>
            <header>
                <div className='brand-name'>
                    {/* <MenuIcon className='hamburger-icon' /> */}
                    <Link to='/' className='brandname-and-icon'>
                        <h2 className='brand' >Movieezy</h2>
                        <MovieIcon className='movie-icon' />
                    </Link>
                </div>
                <form className='search-form' onSubmit={onSubmitHandler} onChange={onChangeHandler}>
                    <Link to='/' className='searchbar-container'><input type='search' placeholder='Search Movies...' className='searchbar' value={searchTerm} /></Link>
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


