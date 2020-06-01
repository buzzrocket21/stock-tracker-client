export const formatCurrency = (value: number): string => value.toLocaleString("en-US", {
    style: 'currency',
    currency: 'USD'
});