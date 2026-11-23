// Assignment #1: Unit Conversion
const convInput = document.getElementById('convInput');
const convError = document.getElementById('convError');
const convResult = document.getElementById('convResult');
const tiles = document.querySelectorAll('.tile');

// Each conversion is a small function
function celsiusToFahrenheit(c) { return c * 9 / 5 + 32; }
function fahrenheitToCelsius(f) { return (f - 32) * 5 / 9; }
function metersToFeet(m) { return m / 0.3048; }
function feetToMeters(ft) { return ft * 0.3048; }

const conversions = {
  cToF:  { fn: celsiusToFahrenheit, from: '°C', to: '°F', minInput: -273.15 },
  fToC:  { fn: fahrenheitToCelsius, from: '°F', to: '°C', minInput: -459.67 },
  mToFt: { fn: metersToFeet,        from: 'm',  to: 'ft' },
  ftToM: { fn: feetToMeters,        from: 'ft', to: 'm' }
};

function format(n) {
  return Number(n.toFixed(6)).toLocaleString('en-US', { maximumFractionDigits: 6 });
}
function showResult(text) {
  convResult.innerHTML = '';
  const big = document.createElement('div');
  big.className = 'big';
  big.textContent = text;
  convResult.appendChild(big);
}

tiles.forEach(function (tile) {
  tile.addEventListener('click', function () {
    convError.textContent = '';
    const value = parseFloat(convInput.value);
    if (isNaN(value)) {
      convError.textContent = 'Please enter a valid number.';
      return;
    }
    const c = conversions[tile.dataset.type];
    if (c.minInput !== undefined && value < c.minInput) {
      convError.textContent = 'That temperature is below absolute zero.';
      return;
    }
    tiles.forEach(function (t) { t.setAttribute('aria-pressed', t === tile ? 'true' : 'false'); });
    showResult(format(value) + ' ' + c.from + ' = ' + format(c.fn(value)) + ' ' + c.to);
  });
});
