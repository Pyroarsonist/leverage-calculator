import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import LeverageCalculator from './components/LeverageCalculator/LeverageCalculator.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { CalculatorProvider } from './contexts/CalculatorContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider>
            <CalculatorProvider>
                <LeverageCalculator />
            </CalculatorProvider>
        </ThemeProvider>
    </StrictMode>
);
