import { Link } from 'react-router-dom';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import { useRef, useEffect } from 'react';

function Navbar() {
    const sidenavRef = useRef(null);

    const openNav = () => {
        document.getElementById("sidenav").style.width = "250px";
    }

    const closeNav = () => {
        document.getElementById("sidenav").style.width = "0";
    }

    useEffect(() => {
        const handleClickOutside = (event) => {

            if (sidenavRef.current && !sidenavRef.current.contains(event.target)) {
                closeNav();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sidenavRef]);

    return (
        <nav className="navbar">
            <img src="/logo.png" alt="logo" />
            <h1>Plot<br />Garden</h1>
            <button className="sidebtn" onClick={openNav}>
                <i className="fa fa-bars"></i>
            </button>
            <div id="sidenav" className="sidenav" ref={sidenavRef}>
                <button class="closebtn" onClick={closeNav}>&times;</button>
                <Link to="/" onClick={closeNav}>About</Link>
                <Link to="/gardens" onClick={closeNav}>Gardens</Link>
                <Link to="/crops" onClick={closeNav}>Plants</Link>
                <Link to="/guides" onClick={closeNav}>Guides</Link>
                <LoginButton />
                <LogoutButton />
            </div>
        </nav>
    );
}

export default Navbar;
