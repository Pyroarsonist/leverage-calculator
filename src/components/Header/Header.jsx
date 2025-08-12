import React from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import './Header.scss';

const Header = () => {
    const { isDarkTheme, toggleTheme } = useTheme();

    return (
        <header className="LeverageCalculator-header">
            <h1>Leverage Calculator</h1>
            <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={
                    isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'
                }
            >
                {isDarkTheme ? '☀️' : '🌙'}
            </button>
        </header>
    );
};

export default Header;
