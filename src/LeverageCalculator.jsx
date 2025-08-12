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
    const [isLong, setIsLong] = useState(
        () => localStorage.getItem('isLong') !== 'false'
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

    useEffect(() => {
        localStorage.setItem('isLong', isLong.toString());
    }, [isLong]);

    const handleLeverageChange = (e) => {
        const value = parseFloat(e.target.value);
        setLeverage(value);
    };

    const handleEntryPriceChange = (e) => {
        const value = parseFloat(e.target.value);
        setEntryPrice(value);
    };

    const handleExitPriceChange = (e) => {
        const value = parseFloat(e.target.value);
        setExitPrice(value);
    };

    const handleMarginRequirementChange = (e) => {
        const value = parseFloat(e.target.value);
        setMarginRequirement(value);
    };

    const togglePositionType = () => {
        setIsLong(!isLong);
    };

    const {
        pnlAbsolute,
        pnlPercent: pnlPercent,
        liquidationPrice,
        isWrongInput,
    } = calculate({
        leverage,
        entryPrice,
        exitPrice,
        marginRequirement,
        isLong,
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
                    <label htmlFor="leverage" data-unit="x">
                        Leverage
                    </label>
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
                    <label htmlFor="entry-price" data-unit="$">
                        Entry Price
                    </label>
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
                    <label htmlFor="exit-price" data-unit="$">
                        Exit Price
                    </label>
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

                <div className="position-toggle-container">
                    <span className={!isLong ? 'active' : ''}>Short</span>
                    <button
                        className={`position-toggle ${isLong ? 'long' : 'short'}`}
                        onClick={togglePositionType}
                        aria-label={
                            isLong
                                ? 'Switch to short position'
                                : 'Switch to long position'
                        }
                    >
                        <span className="position-toggle-slider"></span>
                    </button>
                    <span className={isLong ? 'active' : ''}>Long</span>
                </div>

                <div className="results">
                    <div className="result-item">
                        <span>PNL:</span>
                        {isWrongInput ? (
                            <span className="result-value error">
                                Invalid Input
                            </span>
                        ) : (
                            <span
                                className={`result-value ${parseFloat(pnlAbsolute) > 0 ? 'positive' : parseFloat(pnlAbsolute) < 0 ? 'negative' : ''}`}
                            >
                                {pnlAbsolute}$
                            </span>
                        )}
                    </div>
                    <div className="result-item">
                        <span>PNL (%):</span>
                        {isWrongInput ? (
                            <span className="result-value error">
                                Invalid Input
                            </span>
                        ) : (
                            <span
                                className={`result-value ${parseFloat(pnlPercent) > 0 ? 'positive' : parseFloat(pnlPercent) < 0 ? 'negative' : ''}`}
                            >
                                {pnlAbsolute}$
                            </span>
                        )}
                    </div>
                    <div className="result-item">
                        <span>Liquidation Price:</span>
                        {isWrongInput ? (
                            <span className="result-value error">
                                Invalid Input
                            </span>
                        ) : (
                            <span className={`result-value liquidation`}>
                                {liquidationPrice}$
                            </span>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default LeverageCalculator;
