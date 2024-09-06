const express = require('express');
const app = express();
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

app.use(express.json());

// Rutas
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);

// Escuchar en el puerto 8080
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
