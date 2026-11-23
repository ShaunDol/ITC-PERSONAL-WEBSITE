// Assignment #4: Simple Payroll System
const peso = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' });
const employees = [];
const payrollBody = document.getElementById('payrollBody');
const payrollError = document.getElementById('payrollError');

const fields = {
  name: document.getElementById('empName'),
  days: document.getElementById('daysWorked'),
  rate: document.getElementById('dailyRate'),
  deduction: document.getElementById('deduction')
};

function cell(text) {
  const td = document.createElement('td');
  td.textContent = text;
  return td;
}

function renderTable() {
  payrollBody.innerHTML = '';
  if (employees.length === 0) {
    const tr = document.createElement('tr');
    const td = cell('No employees added yet.');
    td.colSpan = 7;
    td.className = 'empty';
    tr.appendChild(td);
    payrollBody.appendChild(tr);
    return;
  }
  employees.forEach(function (emp, index) {
    const gross = emp.days * emp.rate;
    const net = gross - emp.deduction;
    const tr = document.createElement('tr');
    tr.appendChild(cell(index + 1));
    tr.appendChild(cell(emp.name));
    tr.appendChild(cell(emp.days));
    tr.appendChild(cell(peso.format(emp.rate)));
    tr.appendChild(cell(peso.format(gross)));
    tr.appendChild(cell(peso.format(emp.deduction)));
    tr.appendChild(cell(peso.format(net)));
    payrollBody.appendChild(tr);
  });
}

function addEmployee() {
  payrollError.textContent = '';
  const name = fields.name.value.trim();
  const days = parseFloat(fields.days.value);
  const rate = parseFloat(fields.rate.value);
  const deduction = parseFloat(fields.deduction.value);

  if (!name) { payrollError.textContent = 'Please enter the employee’s name.'; return; }
  if (isNaN(days) || days < 0) { payrollError.textContent = 'Days worked must be a number, 0 or higher.'; return; }
  if (isNaN(rate) || rate < 0) { payrollError.textContent = 'Daily rate must be a number, 0 or higher.'; return; }
  if (isNaN(deduction) || deduction < 0) { payrollError.textContent = 'Deduction must be a number, 0 or higher.'; return; }
  if (deduction > days * rate) { payrollError.textContent = 'Deduction cannot be more than the gross pay.'; return; }

  employees.push({ name: name, days: days, rate: rate, deduction: deduction });
  renderTable();
  fields.name.value = '';
  fields.days.value = '';
  fields.rate.value = '';
  fields.deduction.value = '';
  fields.name.focus();
}

function deleteEmployee() {
  payrollError.textContent = '';
  const input = document.getElementById('deleteLineNo');
  const line = Number(input.value);
  if (input.value.trim() === '' || !Number.isInteger(line) || line < 1 || line > employees.length) {
    payrollError.textContent = employees.length === 0
      ? 'There are no employees to delete.'
      : 'Enter a line number from 1 to ' + employees.length + '.';
    return;
  }
  employees.splice(line - 1, 1);
  input.value = '';
  renderTable();
}

document.getElementById('addEmpBtn').addEventListener('click', addEmployee);
document.getElementById('deleteEmpBtn').addEventListener('click', deleteEmployee);
Object.keys(fields).forEach(function (k) {
  fields[k].addEventListener('keydown', function (e) { if (e.key === 'Enter') { addEmployee(); } });
});
renderTable();
