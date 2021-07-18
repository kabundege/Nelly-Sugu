import React, { useContext, useState } from 'react'
import { CgMusic } from "react-icons/cg";
import { FaAngellist,FaChevronLeft,FaChevronRight } from "react-icons/fa";
import { NavLink,Route,Switch,useLocation,useHistory } from 'react-router-dom';
import { GoHome,GoSearch } from "react-icons/go";
import { BiCircle } from "react-icons/bi";
import HomeView from '../views/Home';
import Player from '../components/player';
import { StoreContext } from '../config/store';

const Search = () => (
    <div className="container">
        Search
    </div>
)

const Library = () => (
    <div className="container">
        Library
    </div>
)

const MusicPlayer = () => {
    const history = useHistory()
    const location = useLocation()
    const [ searchQuery,setQuery ] = useState("")
    const { nowPlaying } = useContext(StoreContext)

    const sidenav = (
        <div className="sidenav">
            <FaAngellist  
                size={50} 
                className="brand" 
                onClick={()=>history.replace('/')}
                />
            <div className="links">
                <NavLink exact to="/">
                    <GoHome className="link" size={30} />
                </NavLink>
                <NavLink to="/search">
                    <GoSearch className="link" size={30} />
                </NavLink>
                <NavLink to="/library">
                    <CgMusic className="link" size={30} />
                </NavLink>
            </div>
            <p>Version 1.0.0</p>
        </div>
    )

    const header = (
        <div className="header">
            <div className="navs">
                <FaChevronLeft size={25} className="nav" />
                <FaChevronRight size={25} className="nav" />
            </div>
            <div className="search-input">
                <BiCircle size={20} className="icon" />
                <input  
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e)=>setQuery(e.target.value)}
                />
            </div>
        </div>
    )

    return (
        <div className="music-container">
            {sidenav}
            <div className="parent">
                {header} 
                <Switch location={location}>
                    <Route exact path="/" component={HomeView} />
                    <Route path="/search" component={Search} />
                    <Route path="/library" component={Library} />
                </Switch>
                { nowPlaying.uri ? <Player/> : "" }
            </div>
        </div>
    )
}

export default MusicPlayer
