var modal = document.querySelector(".modal");
var modalEdit = document.querySelector(".modalEdit");
var trigger = document.querySelector(".addExpenseBtn");
var closeButton = document.querySelector(".close-button");
var triggerEdit = document.querySelector(".editExpenseBtn");

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function toggleEditModal() {
  modalEdit.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
  if (event.target === modalEdit) {
    toggleEditModal();
  }
}
trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleEditModal);
window.addEventListener("click", windowOnClick);
triggerEdit.addEventListener("click", toggleEditModal);

let expensePrice = document.querySelectorAll(".expenseSum");

let sortedPrice = expenseObject
  .map((val) => {
    return Number(val.price);
  })
  .sort((a, b) => a - b);
