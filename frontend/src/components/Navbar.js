import { Link } from 'react-router-dom';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import { useState, useEffect } from 'react';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown')) {
                setIsOpen(false);
            }
        };

        window.addEventListener('click', handleClickOutside);
        
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <nav className="navbar">
            <img src="/logo.png" alt="logo" />
            <h1>Plot<br />Garden</h1>
            <div className="dropdown">
                <button className="dropbtn" onClick={() => setIsOpen(prev => !prev)}>
                    <i className="fa fa-bars"></i>
                </button>
                {isOpen && (
                    <div id="dropdown-menu" className="dropdown-content">
                        <Link to="/">About</Link>
                        <Link to="/garden">Gardens</Link>
                        <Link to="/">Plants</Link>
                        <Link to="/">Guides</Link>
                        <LoginButton />
                        <LogoutButton />
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
