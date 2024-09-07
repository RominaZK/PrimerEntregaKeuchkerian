const express = require('express');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let products = [];

// Configuración de Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir archivos estáticos y JSON
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para la vista "home"
app.get('/', (req, res) => {
    res.render('home', { products });
});

// Ruta para la vista "realTimeProducts"
app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { products });
});

// WebSocket - Manejo de eventos de productos
io.on('connection', (socket) => {
    console.log('Cliente conectado');

    // Enviar productos actuales al cliente conectado
    socket.emit('updateProducts', products);

    // Recibir nuevo producto y actualizar para todos los clientes
    socket.on('newProduct', (product) => {
        products.push(product);
        io.emit('updateProducts', products);
    });

    // Eliminar producto
    socket.on('deleteProduct', (productId) => {
        products = products.filter(p => p.id !== productId);
        io.emit('updateProducts', products);
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
