const express = require('express');
const router = express.Router();

// Ejemplo de carritos predefinidos
const carts = [
    { id: 1, products: [{ id: 1, name: 'Product 1', quantity: 2 }] },
    { id: 2, products: [] },
];

// Obtener todos los carritos
router.get('/', (req, res) => {
    res.json(carts);
});

// Obtener un carrito por ID
router.get('/:id', (req, res) => {
    const cart = carts.find(c => c.id === parseInt(req.params.id));
    if (!cart) return res.status(404).send('Carrito no encontrado.');
    res.json(cart);
});

// Agregar un producto al carrito
router.post('/:id/products', (req, res) => {
    const cart = carts.find(c => c.id === parseInt(req.params.id));
    if (!cart) return res.status(404).send('Carrito no encontrado.');

    const product = {
        id: req.body.id,
        name: req.body.name,
        quantity: req.body.quantity
    };
    cart.products.push(product);
    res.status(201).json(product);
});

// Eliminar un producto del carrito
router.delete('/:id/products/:productId', (req, res) => {
    const cart = carts.find(c => c.id === parseInt(req.params.id));
    if (!cart) return res.status(404).send('Carrito no encontrado.');

    const productIndex = cart.products.findIndex(p => p.id === parseInt(req.params.productId));
    if (productIndex === -1) return res.status(404).send('Producto no encontrado en el carrito.');

    const deletedProduct = cart.products.splice(productIndex, 1);
    res.json(deletedProduct);
});

module.exports = router;
