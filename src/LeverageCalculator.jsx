import { useState, useEffect } from 'react';
import './LeverageCalculator.css';
import { useTheme } from './ThemeContext';
import { calculate } from './calculator.js';

const getStoredValue = (key, defaultValue) => {
    try {
        const saved = localStorage.getItem(key);
        return saved !== null ? parseFloat(saved) : defaultValue;
    } catch (error) {
        console.error(`Error reading ${key} from localStorage:`, error);
        return defaultValue;
    }
};

const saveToLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, value.toString());
    } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error);
    }
};

function LeverageCalculator() {
    const [leverage, setLeverage] = useState(() =>
        getStoredValue('leverage', 1)
    );
    const [entryPrice, setEntryPrice] = useState(() =>
        getStoredValue('entryPrice', 100)
    );
    const [exitPrice, setExitPrice] = useState(() =>
        getStoredValue('exitPrice', 110)
    );
    const [marginRequirement, setMarginRequirement] = useState(() =>
        getStoredValue('marginRequirement', 100)
    );
    const { isDarkTheme, toggleTheme } = useTheme();

    useEffect(() => {
        saveToLocalStorage('leverage', leverage);
    }, [leverage]);

    useEffect(() => {
        saveToLocalStorage('entryPrice', entryPrice);
    }, [entryPrice]);

    useEffect(() => {
        saveToLocalStorage('exitPrice', exitPrice);
    }, [exitPrice]);

    useEffect(() => {
        saveToLocalStorage('marginRequirement', marginRequirement);
    }, [marginRequirement]);

    const handleLeverageChange = (e) => {
        const value = parseFloat(e.target.value) || 0;
        setLeverage(value);
    };

    const handleEntryPriceChange = (e) => {
        const value = parseFloat(e.target.value) || 0;
        setEntryPrice(value);
    };

    const handleExitPriceChange = (e) => {
        const value = parseFloat(e.target.value) || 0;
        setExitPrice(value);
    };

    const handleMarginRequirementChange = (e) => {
        const value = parseFloat(e.target.value) || 0;
        setMarginRequirement(value);
    };

    const { profitLoss, pnl } = calculate({
        leverage,
        entryPrice,
        exitPrice,
        marginRequirement,
    });

    return (
        <div className="LeverageCalculator">
            <header className="LeverageCalculator-header">
                <h1>Leverage Calculator</h1>
                <button
                    className="theme-toggle"
                    onClick={toggleTheme}
                    aria-label={
                        isDarkTheme
                            ? 'Switch to light mode'
                            : 'Switch to dark mode'
                    }
                >
                    {isDarkTheme ? '☀️' : '🌙'}
                </button>
            </header>
            <main className="calculator-container">
                <div className="input-group">
                    <label htmlFor="leverage" data-unit="x">Leverage</label>
                    <input
                        id="leverage"
                        type="number"
                        value={leverage}
                        onChange={handleLeverageChange}
                        min="0"
                        step="0.1"
                        placeholder="1.0"
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="entry-price" data-unit="$">Entry Price</label>
                    <input
                        id="entry-price"
                        type="number"
                        value={entryPrice}
                        onChange={handleEntryPriceChange}
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="exit-price" data-unit="$">Exit Price</label>
                    <input
                        id="exit-price"
                        type="number"
                        value={exitPrice}
                        onChange={handleExitPriceChange}
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="margin-requirement" data-unit="$">
                        Margin Requirement
                    </label>
                    <input
                        id="margin-requirement"
                        type="number"
                        value={marginRequirement}
                        onChange={handleMarginRequirementChange}
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                    />
                </div>

                <div className="results">
                    <div className="result-item">
                        <span>PNL:</span>
                        <span
                            className={`result-value ${parseFloat(profitLoss) > 0 ? 'positive' : parseFloat(profitLoss) < 0 ? 'negative' : ''}`}
                        >
                            {profitLoss}$
                        </span>
                    </div>
                    <div className="result-item">
                        <span>PNL (%):</span>
                        <span
                            className={`result-value ${parseFloat(pnl) > 0 ? 'positive' : parseFloat(pnl) < 0 ? 'negative' : ''}`}
                        >
                            {pnl}%
                        </span>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default LeverageCalculator;
