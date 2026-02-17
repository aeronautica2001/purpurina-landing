/**
 * Formatea un valor numérico a pesos colombianos (COP)
 * Ejemplo: 25000 -> $ 25.000
 * @param {number|string} value 
 * @returns {string} Valor formateado
 */
export const formatCOP = (value) => {
    const number = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(number)) return '$ 0';

    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(number);
};
