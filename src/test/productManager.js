import ProductManager from "./managers/productManager.js";

console.log("Programa iniciado");

//Instancia de ProductManager
const lightsabers = new ProductManager(
  "./src/db/lightsabers.json",
  "lightsabers"
);

//Realizo una funcion asincrona para testear
async function test() {
  //Agregamos producto con todos los campos
  await lightsabers.addProduct({
    title: "Conde Dooku Rojo",
    description: "Sable de luz rojo del Conde Dooku",
    price: 18500,
    code: "LSRCD3",
    thumbnail:
      "https://i.etsystatic.com/28256896/r/il/c6aa65/4725062999/il_794xN.4725062999_h1hn.jpg",
    stock: 3,
  });
  //Agregamos producto con todos los campos
  lightsabers.addProduct({
    title: "Conde Dooku verde",
    description: "Sable de verde rojo del Maestro Dooku",
    price: 18500,
    code: "LSVCD3",
    thumbnail:
      "https://i.etsystatic.com/28256896/r/il/c6aa65/4725062999/il_794xN.4725062999_h1hn.jpg",
    stock: 3,
  });

  //Agregamos producto con campo code repetido
  await lightsabers.addProduct({
    title: "Conde Dooku verde",
    description: "Sable de verde rojo del Maestro Dooku",
    price: 18500,
    code: "LSVCD1",
    thumbnail:
      "https://i.etsystatic.com/28256896/r/il/c6aa65/4725062999/il_794xN.4725062999_h1hn.jpg",
    stock: 3,
  });

  //Agregamos producto con campo faltante
  await lightsabers.addProduct({
    title: "Conde Dooku verde",
    description: "Sable de verde rojo del Maestro Dooku",
    price: 18500,
    thumbnail:
      "https://i.etsystatic.com/28256896/r/il/c6aa65/4725062999/il_794xN.4725062999_h1hn.jpg",
    stock: 3,
  });

  // Recuperamos todos los productos cargados
  const all = lightsabers.getProducts();
  console.log(all);
  //Actualizamos producto con id 2
  await lightsabers.updateProduct(2, { stock: 13, price: 20500 });
  //Recuperamos producto con id existente
  const one = await lightsabers.getProductById(2);
  console.log(one);

  //eliminamos producto con id 4
  await lightsabers.deleteProduct(4);
}

setTimeout(() => {
  test();
}, 2000);
