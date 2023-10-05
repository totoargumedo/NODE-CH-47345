import ProductManager from "./managers/productManager.js";

console.log("Programa iniciado");

//Instancia de ProductManager
const lightsabers = new ProductManager("lightsabers");

//Agregamos producto con todos los campos
console.log(
  lightsabers.addProduct({
    title: "Conde Dooku Rojo",
    description: "Sable de luz rojo del Conde Dooku",
    price: 18500,
    code: "LSRCD1",
    thumbnail:
      "https://i.etsystatic.com/28256896/r/il/c6aa65/4725062999/il_794xN.4725062999_h1hn.jpg",
    stock: 3,
  })
);
//Agregamos producto con todos los campos
console.log(
  lightsabers.addProduct({
    title: "Conde Dooku verde",
    description: "Sable de verde rojo del Maestro Dooku",
    price: 18500,
    code: "LSVCD1",
    thumbnail:
      "https://i.etsystatic.com/28256896/r/il/c6aa65/4725062999/il_794xN.4725062999_h1hn.jpg",
    stock: 3,
  })
);
//Agregamos producto con campo code repetido
console.log(
  lightsabers.addProduct({
    title: "Conde Dooku verde",
    description: "Sable de verde rojo del Maestro Dooku",
    price: 18500,
    code: "LSVCD1",
    thumbnail:
      "https://i.etsystatic.com/28256896/r/il/c6aa65/4725062999/il_794xN.4725062999_h1hn.jpg",
    stock: 3,
  })
);
//Agregamos producto con campo faltante
console.log(
  lightsabers.addProduct({
    title: "Conde Dooku verde",
    description: "Sable de verde rojo del Maestro Dooku",
    price: 18500,
    thumbnail:
      "https://i.etsystatic.com/28256896/r/il/c6aa65/4725062999/il_794xN.4725062999_h1hn.jpg",
    stock: 3,
  })
);
//Recuperamos todos los productos cargados
console.table(lightsabers.getProducts());
//Recuperamos producto con id existente
console.log(lightsabers.getProductById(1));
//Recuperamos producto con id inexistente
console.log(lightsabers.getProductById(3));
