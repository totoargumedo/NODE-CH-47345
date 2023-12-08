const addToCartForm = document.getElementById("addToCartForm");

addToCartForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const quantity = addToCartForm.elements.quantity.value;
  const pid = addToCartForm.elements.pid.value;

  //solicitud al endpoint de carrito para sumar producto, todavia no tengo logica para traer el cid
  await fetch(
    `/api/carts/65725190328f701a6a911a20/product/${pid}?quantity=${quantity}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(async (res) => {
      const response = await res.json();
      addToCartForm.reset();
      addToCartForm.focus();
    })
    .catch((error) => console.log(error));
});
