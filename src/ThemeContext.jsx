import { createContext, useState, useEffect, useContext } from 'react';

// Create a context for the theme
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }) => {
    // State to track the current theme (dark by default)
    const isDarkByDefault = window.matchMedia(
        '(prefers-color-scheme: dark)'
    ).matches;

    const [isDarkTheme, setIsDarkTheme] = useState(isDarkByDefault);

    // Function to toggle between dark and light themes
    const toggleTheme = () => {
        setIsDarkTheme((prevTheme) => !prevTheme);
    };

    // Apply the theme class to the document body
    useEffect(() => {
        document.body.className = isDarkTheme ? 'dark-theme' : 'light-theme';
    }, [isDarkTheme]);

    // Value to be provided by the context
    const value = {
        isDarkTheme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};
