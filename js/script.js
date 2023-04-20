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

const calculateAge = () => {
  let date = new Date();
  let currentDay = date.getDate();
  let currentMonth = date.getMonth() + 1;
  let currentYear = date.getFullYear();
  let birth = new Date(
    `${yearInput.value}-${monthInput.value}-${dayInput.value}`
  );
  let birthDay = birth.getDate();
  let birthMonth = birth.getMonth() + 1;
  let birthYear = birth.getFullYear();

  let day;
  let month;
  let year;
  let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (birthDay > currentDay) {
    //hasn't passed birthday
    currentDay = currentDay + months[currentMonth - 1];
    currentMonth = currentMonth - 1;
  }

  if (birthMonth > currentMonth) {
    //hasn't passed birthmonth
    currentMonth = currentMonth + 12;
    currentYear = currentYear - 1;
  }

  //passed birthday and birthmonth
  day = currentDay - birthDay;
  month = currentMonth - birthMonth;
  year = currentYear - birthYear;

  dayCal.innerHTML = day;
  monthCal.innerHTML = month;
  yearCal.innerHTML = year;
};

//validation

const validDay = () => {
  if (!dayInput.value) {
    errorDay.innerHTML = "This field is required";
  } else {
    if (dayInput.value >= 1 && dayInput.value <= 31) {
      errorDay.innerHTML = "";
      return true;
    } else {
      errorDay.innerHTML = "Must be a valid day";
      return false;
    }
  }
};

const validMonth = () => {
  if (!monthInput.value) {
    errorMonth.innerHTML = "This field is required";
  } else {
    if (monthInput.value >= 1 && monthInput.value <= 12) {
      errorMonth.innerHTML = "";
      return true;
    } else {
      errorMonth.innerHTML = "Must be a valid month";
      return false;
    }
  }
};

const validYear = () => {
  if (!yearInput.value) {
    errorYear.innerHTML = "This field is required";
  } else {
    if (yearInput.value >= 100 && yearInput.value < 2023) {
      errorYear.innerHTML = "";
      return true;
    } else {
      errorYear.innerHTML = "Must be in the past";
      return false;
    }
  }
};

//submit form

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validDay();
  validMonth();
  validYear();

  if (validDay() === true && validMonth() === true && validYear() === true) {
    calculateAge();
  }

  dayInput.value = "";
  monthInput.value = "";
  yearInput.value = "";
});
