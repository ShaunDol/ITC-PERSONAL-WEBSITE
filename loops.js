// Assignment #3: Looping Operations
// Factorial uses a while loop, sum uses a do-while loop, average uses a for loop.
const loopInput = document.getElementById('loopN');
const loopError = document.getElementById('loopError');
const loopResult = document.getElementById('loopResult');
const MAX_N = 1000; // keeps the page fast and the factorial readable

function addLine(label, value, how) {
  const line = document.createElement('div');
  line.className = 'line';
  const l = document.createElement('div'); l.className = 'label'; l.textContent = label;
  const v = document.createElement('div'); v.className = 'val'; v.textContent = value;
  const h = document.createElement('div'); h.className = 'how'; h.textContent = how;
  line.appendChild(l); line.appendChild(v); line.appendChild(h);
  loopResult.appendChild(line);
}

document.getElementById('computeLoopsBtn').addEventListener('click', function () {
  loopError.textContent = '';
  const raw = loopInput.value.trim();
  const n = Number(raw);
  if (raw === '' || !Number.isInteger(n) || n < 1) {
    loopError.textContent = 'Please enter a valid positive integer (N ≥ 1).';
    return;
  }
  if (n > MAX_N) {
    loopError.textContent = 'Please enter a value of ' + MAX_N + ' or less.';
    return;
  }

  // Factorial with a while loop (BigInt so large results stay exact)
  let factorial = 1n;
  let i = 1n;
  const big = BigInt(n);
  while (i <= big) {
    factorial *= i;
    i++;
  }

  // Sum with a do-while loop
  let sum = 0;
  let j = 1;
  do {
    sum += j;
    j++;
  } while (j <= n);

  // Average with a for loop
  let total = 0;
  for (let k = 1; k <= n; k++) {
    total += k;
  }
  const average = total / n;

  loopResult.innerHTML = '';
  addLine('Factorial of ' + n + ' (' + n + '!)', factorial.toString(), 'Computed with a while loop');
  addLine('Sum of 1 to ' + n, sum.toLocaleString('en-US'), 'Computed with a do-while loop');
  addLine('Average of 1 to ' + n, average.toLocaleString('en-US', { maximumFractionDigits: 2 }), 'Computed with a for loop');
});
loopInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') { document.getElementById('computeLoopsBtn').click(); }
});
