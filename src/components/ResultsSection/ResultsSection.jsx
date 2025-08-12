import React from 'react';
import { useCalculator } from '../../contexts/CalculatorContext.jsx';
import './ResultsSection.scss';

const ResultsSection = () => {
    const {
        pnlAbsolute,
        pnlPercent,
        liquidationPrice,
        fees,
        pnlAfterFees,
        isWrongInput,
        feesEnabled,
    } = useCalculator();

    return (
        <div className="results">
            <div className="result-item">
                <span>PNL:</span>
                {isWrongInput ? (
                    <span className="result-value error">Invalid Input</span>
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
                    <span className="result-value error">Invalid Input</span>
                ) : (
                    <span
                        className={`result-value ${parseFloat(pnlPercent) > 0 ? 'positive' : parseFloat(pnlPercent) < 0 ? 'negative' : ''}`}
                    >
                        {pnlPercent}%
                    </span>
                )}
            </div>
            {feesEnabled && (
                <div className="result-item">
                    <span>Fees:</span>
                    {isWrongInput ? (
                        <span className="result-value error">
                            Invalid Input
                        </span>
                    ) : (
                        <span className="result-value">{fees}$</span>
                    )}
                </div>
            )}
            {feesEnabled && (
                <div className="result-item">
                    <span>PNL after fees:</span>
                    {isWrongInput ? (
                        <span className="result-value error">
                            Invalid Input
                        </span>
                    ) : (
                        <span
                            className={`result-value ${parseFloat(pnlAfterFees) > 0 ? 'positive' : parseFloat(pnlAfterFees) < 0 ? 'negative' : ''}`}
                        >
                            {pnlAfterFees}$
                        </span>
                    )}
                </div>
            )}
            <div className="result-item">
                <span>Liquidation Price:</span>
                {isWrongInput ? (
                    <span className="result-value error">Invalid Input</span>
                ) : (
                    <span className={`result-value liquidation`}>
                        {liquidationPrice}$
                    </span>
                )}
            </div>
        </div>
    );
};

export default ResultsSection;
