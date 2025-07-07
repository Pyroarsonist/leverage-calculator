import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import LeverageCalculator from './LeverageCalculator.jsx';
import { ThemeProvider } from './ThemeContext';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider>
            <LeverageCalculator />
        </ThemeProvider>
    </StrictMode>
);
