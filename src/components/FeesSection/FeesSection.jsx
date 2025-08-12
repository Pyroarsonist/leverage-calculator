import React from 'react';
import { useCalculator } from '../../contexts/CalculatorContext.jsx';
import './FeesSection.scss';

const FeesSection = () => {
    const {
        feesEnabled,
        feePercentage,
        toggleFeesEnabled,
        handleFeePercentageChange,
    } = useCalculator();

    return (
        <div className="fees-container">
            <h3>Fees</h3>
            <div className="fees-checkbox">
                <input
                    type="checkbox"
                    id="fees-enabled"
                    checked={feesEnabled}
                    onChange={toggleFeesEnabled}
                />
                <label htmlFor="fees-enabled">Enable Fees</label>
            </div>
            <div className="input-group">
                <label htmlFor="fee-percentage" data-unit="%">
                    Fee Percentage
                </label>
                <input
                    id="fee-percentage"
                    type="number"
                    value={feePercentage}
                    onChange={handleFeePercentageChange}
                    min="0"
                    step="0.01"
                    placeholder="0.05"
                    disabled={!feesEnabled}
                />
            </div>
        </div>
    );
};

export default FeesSection;
