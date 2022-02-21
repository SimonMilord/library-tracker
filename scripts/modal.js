
const modal = document.getElementById("modal");
const btn = document.getElementById("newbook");
const cancel = document.getElementById("cancel");


// When the user clicks on the new book, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on cancel, close the modal
cancel.onclick = function(event) {
  event.preventDefault();
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}