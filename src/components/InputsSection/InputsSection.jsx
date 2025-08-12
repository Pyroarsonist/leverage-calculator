import React from 'react';
import { useCalculator } from '../../contexts/CalculatorContext.jsx';
import './InputsSection.scss';

const InputsSection = () => {
    const {
        leverage,
        entryPrice,
        exitPrice,
        marginRequirement,
        isLong,
        handleLeverageChange,
        handleEntryPriceChange,
        handleExitPriceChange,
        handleMarginRequirementChange,
        togglePositionType,
    } = useCalculator();

    return (
        <>
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
        </>
    );
};

export default InputsSection;
