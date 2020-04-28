document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);

const crrncy = {
  EUR: { USD: 1.08, AUD: 1.67 },
  USD: { EUR: 0.92, AUD: 1.54 },
  AUD: { USD: 0.65, EUR: 0.6 },
};

// let selectCrrncy = document.getElementById("selected-currency");
// //console.log(selectedCrrncy);
// let currencyBtn = document.querySelector("currency-btn");

// function convertToBaseCurrency() {
//   let baseCurrency = selectCrrncy.value;
//   console.log(baseCurrency);
// }

// currencyBtn.addEventListener("click", convertToBaseCurrency);

var btn = document.querySelector(".calculate-btn");
var baseCurrencyInput = document.getElementById("currency-1");
var secondCurrencyInput = document.getElementById("currency-2");
var amountInput = document.getElementById("amount");
var toShowAmount = document.querySelector(".given-amount");
var toShowBase = document.querySelector(".base-currency");
var toShowSecond = document.querySelector(".second-currency");
var toShowResult = document.querySelector(".final-result");

function convertCurrency(event) {
  event.preventDefault();
  var amount = amountInput.value;
  var from = baseCurrencyInput.value;
  var to = secondCurrencyInput.value;
  var result = 0;

  try {
    if (from == to) {
      result = amount;
    } else {
      result = amount * crrncy[from][to];
    }
  } catch (err) {
    result = amount * (1 / crrncy[to][from]);
  }

  toShowAmount.innerHTML = amount;
  toShowBase.textContent = from + " = ";
  toShowSecond.textContent = to;
  toShowResult.textContent = result;
}

btn.addEventListener("click", convertCurrency);