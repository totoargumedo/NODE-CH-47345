# NODE-CH-47345

# Desafio 9

Se crea clase manager para productos
Se crea servidor http con rutas get
Se crea sistema de router para productos y carritos
Se crean rutas GET, POST, PUT y DELETE
Se crean vistas utilizando handlebars
Se implemento websocket para carga en tiempo real
Se creo logica de capas dao/servicios/controladores/routers
Se implemento MongoDB
Logica de usuarios
Estrategias de passport-local passpot-github

## Iniciar el server

Se configuraron script en el [package.json](https://github.com/totoargumedo/NODE-CH-47345/package.json) para iniciar el archivo app.js con las pruebas

```bash
npm run start
```

El proyecto utiliza Javascript modules
Guarda los cambios en archivos
Puede traer un archivo ya existente, en caso de no encontrarlo, crea uno nuevo
El servidor se inicia por defecto en puerto 8080 local

## Vistas

### Home

`/`
La ruta de home presenta una pequeña galeria de algunos productos

### Productos

`/products`
Muestra la lista de productos cargados en memoria

### Carrito

`/cart`
Sin terminar

### Carga de productos en tiempo real

`/realtimeproducts`
Presenta un formulario de carga para productos nuevos, la lista de productos inferior se actualizara automaticamente con el ultimo producto cargado.
El formulario permite la carga de mas de una imagen mediante URL.

## Uso de las rutas de producto

### Rutas GET

`/api/products`
Devuelve todos los productos cargados en fileStore

`/api/products?limit=3`
Si se envia "limit" como query, devuelve esa cantidad de productos o el maximo si hay menos. En este caso devuelve los primeros 3 productos

`/api/products/2`
Si se especifica un numero de id, en este caso "2", devuelve el producto con id 2 en caso de que exista en fileStore

### Rutas POST

`/api/products`
Recibe los datos de un producto como objeto desde body y los guarda en fileStore
Recibe un objeto con los campos {title: (String), description:(String), price: (Number), code:(String), status:(Boolean), stock: (Number), category:(String), thumbnails:(String Array)}.
Todos los campos son obligatorios de enviar excepto status y thumbnails.
Si no se envia o especifica status, por defecto sera true.
Si no se envia thumbnails, por defecto sera un array vacio.
Se recomienda enviar todos los campos

`/api/products/img`
Recibe los datos de un producto como objeto desde body y los guarda en fileStore
Esta ruta recibe 1 archivo para imagen, lo aloja localmente en el servidor y anexa su ruta a la propiedad thumbnails.
Recibe un objeto con los campos {title: (String), description:(String), price: (Number), code:(String), status:(Boolean), stock: (Number), category:(String), image:(File)}.
Todos los campos son obligatorios de enviar excepto status y image.
Si no se envia o especifica status, por defecto sera true.
Si no se envia thumbnails, por defecto sera un array vacio, luego la ruta a la imagen subida se agrega a este array.
Se recomienda enviar todos los campos

### Rutas PUT

`/api/products/:id`
`/api/products/1`
Recibe los datos de un producto como objeto desde body para actualizar los campos del producto.
Recibe un objeto con los campos {title: (String), description:(String), price: (Number), code:(String), status:(Boolean), stock: (Number), category:(String), thumbnails:(String Array)}, actualizara solo los campos que reciba con los valores nuevos.
El id del producto no cambiara.

### Rutas DELETE

`/api/products/:id`
`/api/products/1`
Elimina el producto con el id enviado de la DB en fileStore.

## Uso de las rutas de carrito

### Rutas GET

`/api/products`
Devuelve todos los carritos cargados en fileStore

`/api/products?limit=3`
Si se envia "limit" como query, devuelve esa cantidad de carritos o el maximo si hay menos. En este caso devuelve los primeros 3 carritos

`/api/products/2`
Si se especifica un numero de id, en este caso "2", devuelve el carrito con id 2 en caso de que exista en fileStore

### Rutas POST

`/api/carts`
Crea un carrito nuevo y le asigna un id.
Devuelve el carrito recien creado.

`/api/carts/:cid/product/:pid`
`/api/carts/:cid/product/:pid?quantity=`
`/api/carts/2/product/1`
`/api/carts/2/product/1?quantity=1`
Recibe por params el id de un carrito y un producto. Agrega ese producto a lista de productos del carrito.
Agrega dentro de la lista el producto como objeto con los siguientes campos {pid: (Number), quantity: (Number)}.
Por defecto quantity es 1, si se envia por query otra cantidad, agregara esa cantidad.
Si el producto ya existe en la lista, la API sumara esa cantidad a quantity de ese producto.

### Rutas DELETE

``/api/carts/:cid`
`/api/carts/2`
Recibe por params el id de un carrito y lo elimina por completo.

``/api/carts/:cid/product/:pid`
`/api/carts/2/product/1`
Recibe por params el id de un carrito y un producto. Quita ese producto de la lista de productos del carrito.

`/api/carts/:cid/product/:pid?quantity=`
`/api/carts/2/product/1?quantity=1`
Si se indica por query quantity, recibe por params el id de un carrito y un producto. Resta la cantidad indicada a quantity a ese producto indicado por pid de la lista de productos del carrito.

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
