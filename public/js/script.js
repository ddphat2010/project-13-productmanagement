// formSearch
// const formSearch = document.querySelector("[formSearch]");

// if(formSearch) {
//   const url = new URL(window.location.href);

//   formSearch.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const keyword = e.target.elements.keyword.value

//     if(keyword) {
//       url.searchParams.set("keyword", keyword);
//     } else {
//       url.searchParams.delete("keyword")
//   }

//   window.location.href = url.href;
//   })
// }
// End formSearch

// Show Alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  const closeAlert = showAlert.querySelector("[close-alert]");
  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
// End Show Alert

// table-cart
const tableCart = document.querySelector("[table-cart]");
if(tableCart) {
  const inputsQuantity = tableCart.querySelectorAll("input[name='quantity']");

  inputsQuantity.forEach(input => {
    input.addEventListener("change", () => {
      const productId = input.getAttribute("item-id");
      const quantity = input.value;

      window.location.href = `/cart/update/${productId}/${quantity}`;
    });
  });
}
// End table-cart