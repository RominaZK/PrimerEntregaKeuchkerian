const express = require('express');
const router = express.Router();

// Ejemplo de productos predefinidos
const products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
];

// Obtener todos los productos
router.get('/', (req, res) => {
    res.json(products);
});

// Obtener un producto por ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Producto no encontrado.');
    res.json(product);
});

// Crear un nuevo producto
router.post('/', (req, res) => {
    const product = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    };
    products.push(product);
    res.status(201).json(product);
});

// Actualizar un producto por ID
router.put('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Producto no encontrado.');

    product.name = req.body.name;
    product.price = req.body.price;
    res.json(product);
});

// Eliminar un producto por ID
router.delete('/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Producto no encontrado.');

    const deletedProduct = products.splice(index, 1);
    res.json(deletedProduct);
});

module.exports = router;
