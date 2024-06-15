const birth_year = 2000;
const birth_month = 5;
const birth_date = 24;

const today = new Date();
const current_year = today.getFullYear();
const current_month = today.getMonth() + 1; //because stupid getMonth() starts from 0
const current_day = today.getDate();

let age_years = current_year - birth_year;
let age_months = current_month - birth_month;
let age_days = current_day - birth_date;

if (age_days < 0) {
  const previous_month = new Date(current_year, current_month - 1, 0);
  age_days += previous_month.getDate();
  age_months--;
}

if (age_months < 0) {
  age_months += 12; //modular arithmetic to handle negative months
  age_years--;
}

if (!age_months && !age_days) {
  document.getElementById("age").innerHTML = `${age_years} years`;
} else if (!age_months) {
  document.getElementById(
    "age"
  ).innerHTML = `${age_years} years and ${age_days} days`;
} else if (!age_days) {
  document.getElementById(
    "age"
  ).innerHTML = `${age_years} years and ${age_months} months`;
} else {
  document.getElementById(
    "age"
  ).innerHTML = `${age_years} years, ${age_months} months and ${age_days} days`;
}
