import React from 'react';
import { useCalculator } from '../../contexts/CalculatorContext.jsx';
import './IntermediateResultsSection.scss';

const IntermediateResultsSection = () => {
    const {
        intermediatePrice,
        intermediatePnlAbsolute,
        intermediatePnlPercent,
        intermediatePnlAfterFees,
        isWrongInput,
        feesEnabled,
        handleIntermediatePriceChange,
    } = useCalculator();

    return (
        <div className="result-container">
            <h3>Intermediate Results</h3>
            <div className="input-group">
                <label htmlFor="intermediate-price" data-unit="$">
                    Intermediate Price
                </label>
                <input
                    id="intermediate-price"
                    type="number"
                    value={intermediatePrice}
                    onChange={handleIntermediatePriceChange}
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                />
            </div>
            {intermediatePrice > 0 && (
                <>
                    <div className="result-item">
                        <span>Intermediate PNL:</span>
                        {isWrongInput ? (
                            <span className="result-value error">
                                Invalid Input
                            </span>
                        ) : (
                            <span
                                className={`result-value ${parseFloat(intermediatePnlAbsolute) > 0 ? 'positive' : parseFloat(intermediatePnlAbsolute) < 0 ? 'negative' : ''}`}
                            >
                                {intermediatePnlAbsolute}$
                            </span>
                        )}
                    </div>
                    <div className="result-item">
                        <span>Intermediate PNL (%):</span>
                        {isWrongInput ? (
                            <span className="result-value error">
                                Invalid Input
                            </span>
                        ) : (
                            <span
                                className={`result-value ${parseFloat(intermediatePnlPercent) > 0 ? 'positive' : parseFloat(intermediatePnlPercent) < 0 ? 'negative' : ''}`}
                            >
                                {intermediatePnlPercent}%
                            </span>
                        )}
                    </div>
                    {feesEnabled && (
                        <div className="result-item">
                            <span>Intermediate PNL after fees:</span>
                            {isWrongInput ? (
                                <span className="result-value error">
                                    Invalid Input
                                </span>
                            ) : (
                                <span
                                    className={`result-value ${parseFloat(intermediatePnlAfterFees) > 0 ? 'positive' : parseFloat(intermediatePnlAfterFees) < 0 ? 'negative' : ''}`}
                                >
                                    {intermediatePnlAfterFees}$
                                </span>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default IntermediateResultsSection;
