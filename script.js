const billAmount = document.getElementById("bill-amount");
const numberOfPeople = document.getElementById("people-number");
const customInput = document.getElementById("custom");
const btns = document.querySelectorAll(".btn");
const tipPerPerson = document.querySelector(".tip-amount");
const errorMessage = document.querySelector(".error-msg");
const totalPerPerson = document.querySelector(".total-amount");
const resetBtn = document.getElementById("reset");

//String Manipulation with RegEx
function toFixed(value) {
  var re = new RegExp("^-?\\d+(?:.\\d{0," + (2 || -1) + "})?");
  return value.toString().match(re)[0];
}


//Tip Amount
function tipAmount(percentNumber) {
  let bill = billAmount.value;
  let people = numberOfPeople.value;
  return (bill / people) * (percentNumber / 100);
}


//Amount per Person
function amountPerPerson(percentNumber) {
  let bill = billAmount.value;
  let people = numberOfPeople.value;
  return bill / people + tipAmount(percentNumber);
}


//Reset Input Fields
function reset() {
  tipPerPerson.innerText = `${"$"}${0}${"."}${0}${0}`;
  totalPerPerson.innerText = `${"$"}${0}${"."}${0}${0}`;
  billAmount.value = "";
  numberOfPeople.value = "";
  customInput.value = "";
}

//Tip per Person
function customTip(value) {
  let bill = billAmount.value;
  let people = numberOfPeople.value;
  return (bill / people) * (value / 100);
}

//Total Bill per person
function customTotal(value) {
  let bill = billAmount.value;
  let people = numberOfPeople.value;
  return bill / people + customTip(value);
}

//Percent Buttons
btns.forEach((button) => {
  button.addEventListener("click", () => {
    percentNumber = parseFloat(button.innerText);
    tipPerPerson.innerText = `${"$"}${toFixed(tipAmount(percentNumber))}`;
    totalPerPerson.innerText = `${"$"}${toFixed(
      amountPerPerson(percentNumber)
    )}`;
  });
});

//Reset Buttons
resetBtn.addEventListener("click", () => {
  reset();
});


//Event Listeners
var event = new Event("input");
customInput.addEventListener("input", () => {
  value = customInput.value;
  tipPerPerson.innerText = `${"$"}${toFixed(customTip(value))}`;
  totalPerPerson.innerText = `${"$"}${toFixed(customTotal(value))}`;
});

numberOfPeople.addEventListener("input", () => {
  let people = numberOfPeople.value;
  if (people == 0) {
    errorMessage.classList.add("show-error-msg");
    setTimeout(() => {
      errorMessage.classList.remove("show-error-msg");
    }, 1000);

    numberOfPeople.style.borderColor = "red";
    return;
  }

  if (people > 0) {
    numberOfPeople.style.borderColor = "#26c2ad";
  }
});
