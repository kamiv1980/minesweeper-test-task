import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import '../styles/Navbar.css';

const link = 'https://github.com/kamiv1980/minesweeper-test-task';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-links">
                <Link to="/" className="navbar-item">Game</Link>
                <Link to="/editor" className="navbar-item">Editor</Link>
            </div>
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="github-icon"
                aria-label="GitHub Repository"
            >
                <FaGithub />
            </a>
        </nav>
    );
};

export default Navbar;
