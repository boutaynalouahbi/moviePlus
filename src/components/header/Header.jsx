import React, { useEffect, useState } from 'react'
import './style.scss'
import ContentWrapper from '../contentWrapper/ContentWrapper'
import { HiOutlineSearch } from 'react-icons/hi'
import { VscChromeClose } from 'react-icons/vsc'
import { SlMenu } from 'react-icons/sl'
import { useLocation, useNavigate } from 'react-router-dom'
export default function Header() {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
}, [location]);
const openSearch = () => {
    setShowSearch(true);
    setMobileMenu(false);
  };
  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };
  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
        navigate(`/search/${query}`);
        setTimeout(() => {
            setShowSearch(false);
        }, 1000);
    }
  };
  const navigationHandler = (type) => {
    if (type === "movie") {
        navigate("/explore/movie");
    } else {
        navigate("/explore/tv");
    }
  };
  const controlNavbar = () => {
    if (window.scrollY > 200) {
        if (window.scrollY > lastScrollY && !mobileMenu) {
            setShow("hide");
        } else {
            setShow("show");
        }
    } else {
        setShow("top");
    }
    setLastScrollY(window.scrollY);
};
useEffect(() => {
  window.addEventListener("scroll", controlNavbar);
  return () => {
      window.removeEventListener("scroll", controlNavbar);
  };
}, [lastScrollY]);
useEffect(()=>{
    const handleResize = () => {
        if (window.innerWidth > 768) {
            setMobileMenu(false)
            console.log("La largeur de la fenêtre est supérieure à 768 pixels");
        }}
    window.addEventListener("resize", handleResize);
    return () => {
    window.removeEventListener("resize", handleResize);
    };
},[])

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
        <ContentWrapper>
            <div className="logo" onClick={() => navigate("/")}>
                <img src="myLogo.png" alt="Logo" />
            </div>
            <ul className="menuItems">
                <li
                        className="menuItem"
                        onClick={() => navigationHandler("movie")}
                    >
                        Movies
                    </li>
                <li
                        className="menuItem"
                        onClick={() => navigationHandler("tv")}
                    >
                        TV Shows
                    </li>
                {!mobileMenu && 
                <li className="menuItem">
                    <HiOutlineSearch onClick={openSearch}/>
                </li>}
                
            </ul>
            <div className="mobileMenuItems">
                <HiOutlineSearch onClick={openSearch}/>
                {mobileMenu ? (
                        <VscChromeClose onClick={() => setMobileMenu(false)} />
                    ) : (
                        <SlMenu onClick={openMobileMenu} />
                    )}
            </div>
        </ContentWrapper>
        {showSearch && <div className="searchBar">
            <ContentWrapper>
                <div className="searchInput">
                    <input type="text"
                        name=""
                        id=""
                        placeholder="Search for a movie or tv show...."
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyUp={searchQueryHandler}
                    />
                    <VscChromeClose
                        onClick={() => setShowSearch(false)}
                    /></div>
            </ContentWrapper>
        </div>}
        
    </header>
  )
}
