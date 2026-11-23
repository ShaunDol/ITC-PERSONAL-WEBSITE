// Assignment #2: Income Tax Calculator (progressive brackets)
const taxInput = document.getElementById('taxIncome');
const taxError = document.getElementById('taxError');
const taxResult = document.getElementById('taxResult');
const peso = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' });

// over = lower limit, base = basic tax, rate = rate on the excess
const brackets = [
  { over: 0,       base: 0,       rate: 0    },
  { over: 250000,  base: 0,       rate: 0.20 },
  { over: 400000,  base: 30000,   rate: 0.25 },
  { over: 800000,  base: 130000,  rate: 0.30 },
  { over: 2000000, base: 490000,  rate: 0.32 },
  { over: 8000000, base: 2410000, rate: 0.35 }
];

function computeTax(income) {
  let index = 0;
  for (let i = 0; i < brackets.length; i++) {
    if (income > brackets[i].over) { index = i; }
  }
  const b = brackets[index];
  return { index: index, tax: b.base + (income - b.over) * b.rate };
}

function showLine(label, value) {
  const line = document.createElement('div');
  line.className = 'line';
  const l = document.createElement('div'); l.className = 'label'; l.textContent = label;
  const v = document.createElement('div'); v.className = 'val'; v.textContent = value;
  line.appendChild(l); line.appendChild(v);
  taxResult.appendChild(line);
}

document.getElementById('calcTaxBtn').addEventListener('click', function () {
  taxError.textContent = '';
  const rows = document.querySelectorAll('#taxTable tbody tr');
  rows.forEach(function (r) { r.classList.remove('current'); });

  const income = parseFloat(taxInput.value);
  if (isNaN(income) || income < 0) {
    taxError.textContent = 'Please enter a valid non-negative taxable income.';
    return;
  }
  const result = computeTax(income);
  rows[result.index].classList.add('current');
  taxResult.innerHTML = '';
  showLine('Net taxable income', peso.format(income));
  showLine('Income tax due', peso.format(result.tax));
  showLine('Effective tax rate', (income > 0 ? result.tax / income * 100 : 0).toFixed(2) + '%');
});
taxInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') { document.getElementById('calcTaxBtn').click(); }
});
