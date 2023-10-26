export const calculatePercentageChange = (purchaseValue, currentValue) => {
	if (purchaseValue === 0) return 0;
	return ((currentValue - purchaseValue) / purchaseValue) * 100;
};
