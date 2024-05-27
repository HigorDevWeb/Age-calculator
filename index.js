const form = document.querySelector(".form");
const inputDay = document.querySelector(".day");
const inputMonth = document.querySelector(".month");
const inputYear = document.querySelector(".year");
const resultYear = document.querySelector(".resultYear");
const resultMonth = document.querySelector(".resultMonth");
const resultDay = document.querySelector(".resultDay");

function error() {
  // Verifique se algum dos campos de entrada está vazio ou não é um número
  const isInvalidInput =
    inputDay.value === "" ||
    inputMonth.value === "" ||
    inputYear.value === "" ||
    isNaN(inputDay.value) ||
    isNaN(inputMonth.value) ||
    isNaN(inputYear.value);

  // Defina a cor da borda com base na validade dos campos
  [inputDay, inputMonth, inputYear].forEach((inputElement) => {
    inputElement.style.borderColor = isInvalidInput ? "red" : "";
  });

  // Obtenha os valores de entrada
  const day = parseInt(inputDay.value, 10);
  const month = parseInt(inputMonth.value, 10);
  const year = parseInt(inputYear.value, 10);

  // Verifique se a data de nascimento não está no futuro
  const today = dayjs();
  const birthDate = dayjs(`${day}-${month}-${year}`, { format: "DD-MM-YYYY" });

  if (!birthDate.isValid() || birthDate.isAfter(today)) {
    return error();
  }
}

function calculateAge() {
  // Obtenha os valores de entrada
  const day = parseInt(inputDay.value, 10);
  const month = parseInt(inputMonth.value, 10);
  const year = parseInt(inputYear.value, 10);

  const today = dayjs();
  const birthDate = dayjs(`${day}-${month}-${year}`, { format: "DD-MM-YYYY" });

  const diffYears = today.diff(birthDate, "year");
  const diffMonths = today.diff(birthDate, "month");
  const diffDays = today.diff(birthDate, "day");

  const remainingMonths = today
    .subtract(diffYears, "year")
    .diff(birthDate, "month", true);

  resultYear.innerText = `${Math.floor(diffYears)} `;
  resultMonth.innerText = `${Math.floor(remainingMonths)} `;
  resultDay.innerText = `${Math.floor(diffDays)} `;
}

form.addEventListener("change", (e) => {
  e.preventDefault();
  error();
  calculateAge();
});
