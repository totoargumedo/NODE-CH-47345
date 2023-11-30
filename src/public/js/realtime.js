const socket = io();

socket.on("products", (data) => {
  renderProducts(data);
});

function renderProducts(products) {
  const table = document.querySelector("tbody");
  table.innerHTML = "";
  products.reverse();
  products.forEach((product) => {
    let newRow = document.createElement("tr");
    let statusColor;
    if (product.status) {
      statusColor = "success";
    } else {
      statusColor = "danger";
    }
    newRow.innerHTML = `
            <th scope="row">${product._id}</th>
            <td><img
                  class="rounded object-fit-cover"
                  src="${product.thumbnails[0]}"
                  alt="${product.title}"
                  style="height: 50px;width:50px;"
                /></td>
            <td>${product.title}</td>
            <td>${product.description}</td>
            <td>${product.code}</td>
            <td class="text-primary"><strong>$${product.price}</strong></td>
            <td class="text-${statusColor}">${product.status}</td>
            <td>${product.category}</td>
            <td><strong>${product.stock}</strong></td>`;
    table.appendChild(newRow);
  });
}

const productForm = document.getElementById("productForm");

productForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const code = document.getElementById("code").value;
  const price = document.getElementById("price").valueAsNumber;
  const stock = document.getElementById("stock").valueAsNumber;
  const category = document.getElementById("category").value;
  const thumbnails = [];
  for (let i = 0; i < thumbnailsCount; i++) {
    let thumbnail = document.getElementById(`thumbnails${i + 1}`).value;
    thumbnails.push(thumbnail);
  }

  const newProduct = {
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails,
  };

  await fetch("/api/products", {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      productForm.reset();
      title.focus();
      socket.emit("newProduct");
    })
    .catch((error) => console.log(error));
});

let thumbnailsCount = 1;
function addImageInput() {
  thumbnailsCount++;
  let newInput = document.createElement("div");
  newInput.classList = "input-group py-2";
  newInput.innerHTML = `
      <input type="text" class="form-control" id="thumbnails${thumbnailsCount}" id="thumbnails">
      <button type="button" class="btn btn-success" onclick="addImageInput()">+</button>
    `;
  document.getElementById("productImages").appendChild(newInput);
}
