import React from 'react';
import './LeverageCalculator.scss';
import Header from '../Header/Header.jsx';
import FeesSection from '../FeesSection/FeesSection.jsx';
import InputsSection from '../InputsSection/InputsSection.jsx';
import ResultsSection from '../ResultsSection/ResultsSection.jsx';
import IntermediateResultsSection from '../IntermediateResultsSection/IntermediateResultsSection.jsx';

function LeverageCalculator() {
    return (
        <div className="LeverageCalculator">
            <div className="calculator-wrapper">
                <div className="calculator-main">
                    <Header />
                    <main className="calculator-container">
                        <InputsSection />
                        <ResultsSection />
                        <IntermediateResultsSection />
                    </main>
                </div>
                <FeesSection />
            </div>
        </div>
    );
}

export default LeverageCalculator;
