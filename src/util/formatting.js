export const currencyFormatter = (amount) => new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR'
}).format(amount);