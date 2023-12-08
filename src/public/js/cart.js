const deleteFromCartButton = document.getElementById("deleteFromCartButton");

async function deleteFromCart(event, cid, pid) {
  event.preventDefault();
  await fetch(`/api/carts/${cid}/product/${pid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      const response = await res.json();
      console.log(response);
      location.reload();
    })
    .catch((error) => console.log(error));
}
