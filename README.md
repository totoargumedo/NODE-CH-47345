# NODE-CH-47345
# Desafio 1

Se crea clase manager para productos

## Inciar el script

Se configuraron script en el [package.json](https://github.com/totoargumedo/NODE-CH-47345/blob/sprint1/package.json) para iniciar el archivo app.js con las pruebas

```bash
npm run start
```

El proyecto utiliza Javascript modules

## Uso

```javascript
import ProductManager from (/managers/productManager.js)

//Instanciar el manager, recibe el nombre de la colección
const pokemones = new ProductManager("pokemones")

//Guarda un producto nuevo en la clase
//Regresa un objeto con el id (se asigna automaticamente)
//Recibe de forma obligatoria los campos title (string), description(string), price(number), code(string, unico), thumbnail(string) y stock(number)
pokemones.addProduct({
    title: "charmander",
    description: "Charmander peluche primera generación",
    price: 8500,
    code: "PKFG7",
    thumbnail:
    "https://pokeapi.co/api/v2/pokemon-species/4/",
    stock: 33,
  })

//Retorna todos los productos cargados
pokemones.getProducts()

//Regresa el producto con el id indicado
pokemones.getProductbyId(9)
```
