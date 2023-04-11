const form = document.querySelector(".form");
const dayInput = document.querySelector(".day input");
const monthInput = document.querySelector(".month input");
const yearInput = document.querySelector(".year input");
const dayCal = document.querySelector(".calculation .day-cal");
const monthCal = document.querySelector(".calculation .month-cal");
const yearCal = document.querySelector(".calculation .year-cal");
const errorMessages = document.querySelectorAll(".error-msg");
const errorDay = document.querySelector("#error-day");
const errorMonth = document.querySelector("#error-month");
const errorYear = document.querySelector("#error-year");
const inputs = document.querySelectorAll("input");
const labels = document.querySelectorAll("label");
const labelDay = document.querySelector(".day label");
const labelMonth = document.querySelector(".month label");
const labelYear = document.querySelector(".year label");

//calculation

let birthMonth;
let currentMonth;
let birthDay;
let currentDay;
let birthYear;
let currentYear;

const addDay = () => {
  currentDay = new Date().getDate();
  birthDay = new Date(
    `${yearInput.value}-${monthInput.value}-${dayInput.value}`
  );
  const daysInBirthMonth = new Date(
    birthDay.getFullYear(),
    birthDay.getMonth() + 1,
    0
  ).getDate();

  if (currentDay >= birthDay.getDate()) {
    //passed birthday
    dayCal.innerHTML = Math.abs(currentDay - birthDay.getDate());
  } else {
    dayCal.innerHTML =
      daysInBirthMonth - Math.abs(currentDay - birthDay.getDate());
  }

  dayInput.value = "";
};

const addMonth = () => {
  currentMonth = new Date().getMonth() + 1;
  birthMonth =
    new Date(
      `${yearInput.value}-${monthInput.value}-${dayInput.value}`
    ).getMonth() + 1;

  if (currentMonth >= birthMonth) {
    //passed birthmonth
    monthCal.innerHTML = Math.abs(currentMonth - birthMonth);
  } else {
    monthCal.innerHTML = 12 - Math.abs(currentMonth - birthMonth);
  }

  monthInput.value = "";
};

const addYear = () => {
  currentYear = new Date().getFullYear();
  birthYear = new Date(yearInput.value).getFullYear();

  if (currentMonth >= birthMonth) {
    //passed birthyear
    yearCal.innerHTML = currentYear - birthYear;
  } else {
    yearCal.innerHTML = currentYear - birthYear - 1;
  }

  yearInput.value = "";
};

//validation

const validDay = () => {
  const regEx = /[1-9]|[0-2]\d|[3][0-1]/;

  if (!dayInput.value.match(regEx)) {
    errorDay.classList.add("active");
    errorDay.innerHTML = "Must be a valid day";
    return false;
  } else {
    errorDay.classList.remove("active");
    labelDay.classList.remove("active");
    dayInput.classList.remove("active");
    return true;
  }
};

const validMonth = () => {
  const regEx = /[0]\d|[1][1-2]|[1-9]/;

  if (!monthInput.value.match(regEx)) {
    errorMonth.classList.add("active");
    errorMonth.innerHTML = "Must be a valid month";
    return false;
  } else {
    errorMonth.classList.remove("active");
    labelMonth.classList.remove("active");
    monthInput.classList.remove("active");
    return true;
  }
};

const validYear = () => {
  const regEx = /[2][0][0-2][0-3]|[01]\d{3}/;

  if (!yearInput.value.match(regEx)) {
    errorYear.classList.add("active");
    errorYear.innerHTML = "Must be in the past";
    return false;
  } else {
    errorYear.classList.remove("active");
    labelYear.classList.remove("active");
    yearInput.classList.remove("active");
    return true;
  }
};

const submitForm = () => {
  if (dayInput.value == "" && monthInput.value == "" && yearInput.value == "") {
    errorMessages.forEach((message) => {
      message.classList.add("active");
    });
    inputs.forEach((input) => {
      input.classList.add("active");
    });
    labels.forEach((label) => {
      label.classList.add("active");
    });
  } else {
    validDay();
    validMonth();
    validYear();
  }
};

//submit form

form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitForm();

  if (validDay() === true && validMonth() === true && validYear() === true) {
    addDay();
    addMonth();
    addYear();
  }
});
