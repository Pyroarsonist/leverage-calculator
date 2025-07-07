export const calculate = ({
    leverage,
    marginRequirement,
    exitPrice,
    entryPrice,
}) => {
    const positionSize = leverage * marginRequirement;
    const units = positionSize / entryPrice;
    const profitLoss = units * (exitPrice - entryPrice);
    const pnl = (profitLoss / positionSize) * 100;

    return {
        profitLoss: profitLoss.toFixed(2),
        pnl: pnl.toFixed(2),
    };
};
