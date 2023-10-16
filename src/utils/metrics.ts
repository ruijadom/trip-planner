/**
 * Converts kilograms (kg) to metric tons (t).
 *
 * @param {number} kg - The value in kilograms to be converted.
 * @returns {string} - A string representing the converted value with units.
 */
export function kgToMetricTons(kg: number): string {
  if (kg >= 1000) {
    const metricTons = kg / 1000;
    return metricTons.toFixed(2) + ' t'; // 'T' for metric tons
  }
  return kg.toFixed(2) + ' kg'; // 'Kg' for kilograms
}

