# NODE-CH-47345

# Desafio 3

Se crea clase manager para productos
Se crea servidor http con rutas get

## Iniciar el server

Se configuraron script en el [package.json](https://github.com/totoargumedo/NODE-CH-47345/blob/sprint1/package.json) para iniciar el archivo app.js con las pruebas

```bash
npm run start
```

El proyecto utiliza Javascript modules
Guarda los cambios en archivos
Puede traer un archivo ya existente, en caso de no encontrarlo, crea uno nuevo
El servidor se inicia por defecto en puerto 8080 local

## Uso de las rutas

``/products``
Devuelve todos los productos cargados en el archivo

``/products?limit=3``
Si se envia "limit" como query, devuelve esa cantidad de productos o el maximo si hay menos. En este caso devuelve los primeros 3 productos

``/products/2``
Si se especifica un numero de id, en este caso "2", devuelve el producto con id 2 en caso de que esxista

## Uso del manejador de archivos

```javascript
import ProductManager from (/managers/productManager.js)

//Instanciar el manager, recibe como primer parametro la ruta para guardar el archivo y como segundo el nombre de la colección
//Trabaja con archivos JSON
const pokemones = new ProductManager("./files/pokemones.json","pokemones")

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

//Actualiza los campos enviados de un producto
//Recibe como primer parametro el id del producto a actualizar
//Recibe como segundo parametro el objeto con los campos y valores a actualizar
//Regresa el producto actualizado
pokemones.updateProduct(3, {stock:34,price:24000})

//Elimina el producto con el id indicado
//Regresa mensaje de confirmacion
pokemones.deleteProduct(3)
```
