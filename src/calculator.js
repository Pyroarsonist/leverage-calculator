export const calculate = ({
    leverage,
    marginRequirement,
    exitPrice,
    entryPrice,
    isLong,
}) => {
    const positionSize = leverage * marginRequirement;
    const units = positionSize / entryPrice;

    // Calculate PNL based on position type (long or short)
    const priceDifference = isLong
        ? exitPrice - entryPrice
        : entryPrice - exitPrice;
    const pnlAbsolute = units * priceDifference;
    const pnlPercent = (pnlAbsolute / positionSize) * 100;

    // Calculate liquidation price
    // For long positions: liquidation occurs when price falls below a certain threshold
    // For short positions: liquidation occurs when price rises above a certain threshold
    // Simplified formula: liquidation happens when losses equal initial margin (minus a small buffer for fees)
    // const buffer = 0.05; // 5% buffer for fees
    // const effectiveMargin = marginRequirement * (1 - buffer);

    let liquidationPrice;
    if (isLong) {
        // Long position: liquidation price is below entry price
        liquidationPrice = entryPrice * (1 - 1 / leverage);
    } else {
        // Short position: liquidation price is above entry price
        liquidationPrice = entryPrice * (1 + 1 / leverage);
    }

    return {
        pnlAbsolute: pnlAbsolute.toFixed(2),
        pnlPercent: pnlPercent.toFixed(2),
        liquidationPrice: liquidationPrice.toFixed(2),
        isWrongInput: isNaN(pnlPercent),
    };
};
