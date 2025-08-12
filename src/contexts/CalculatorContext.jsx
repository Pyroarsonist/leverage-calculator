import { createContext, useState, useEffect, useContext } from 'react';
import { calculate } from '../utils/calculator.js';

// Create a context for the calculator
const CalculatorContext = createContext();

// Custom hook to use the calculator context
export const useCalculator = () => useContext(CalculatorContext);

// Helper function to get stored values from localStorage
const getStoredValue = (key, defaultValue) => {
    try {
        const saved = localStorage.getItem(key);
        return saved !== null ? parseFloat(saved) : defaultValue;
    } catch (error) {
        console.error(`Error reading ${key} from localStorage:`, error);
        return defaultValue;
    }
};

// Helper function to save values to localStorage
const saveToLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, value.toString());
    } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error);
    }
};

// Calculator provider component
export const CalculatorProvider = ({ children }) => {
    // State for all calculator inputs
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
    const [intermediatePrice, setIntermediatePrice] = useState(() =>
        getStoredValue('intermediatePrice', 0)
    );
    const [feePercentage, setFeePercentage] = useState(() =>
        getStoredValue('feePercentage', 0.1)
    );
    const [feesEnabled, setFeesEnabled] = useState(
        () => localStorage.getItem('feesEnabled') !== 'false'
    );

    // Save values to localStorage when they change
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

    useEffect(() => {
        saveToLocalStorage('intermediatePrice', intermediatePrice);
    }, [intermediatePrice]);

    useEffect(() => {
        saveToLocalStorage('feePercentage', feePercentage);
    }, [feePercentage]);

    useEffect(() => {
        localStorage.setItem('feesEnabled', feesEnabled.toString());
    }, [feesEnabled]);

    // Event handlers
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

    const handleIntermediatePriceChange = (e) => {
        const value = parseFloat(e.target.value);
        setIntermediatePrice(value);
    };

    const handleFeePercentageChange = (e) => {
        const value = parseFloat(e.target.value);
        setFeePercentage(value);
    };

    const toggleFeesEnabled = () => {
        setFeesEnabled(!feesEnabled);
    };

    const togglePositionType = () => {
        setIsLong(!isLong);
    };

    // Calculate results based on current state
    const calculationResults = calculate({
        leverage,
        entryPrice,
        exitPrice,
        marginRequirement,
        isLong,
        intermediatePrice,
        feePercentage,
        feesEnabled,
    });

    // Value to be provided by the context
    const value = {
        // Input values
        leverage,
        entryPrice,
        exitPrice,
        marginRequirement,
        isLong,
        intermediatePrice,
        feePercentage,
        feesEnabled,

        // Event handlers
        handleLeverageChange,
        handleEntryPriceChange,
        handleExitPriceChange,
        handleMarginRequirementChange,
        handleIntermediatePriceChange,
        handleFeePercentageChange,
        toggleFeesEnabled,
        togglePositionType,

        // Calculation results
        ...calculationResults,
    };

    return (
        <CalculatorContext.Provider value={value}>
            {children}
        </CalculatorContext.Provider>
    );
};
