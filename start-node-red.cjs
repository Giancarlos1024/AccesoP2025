// start-node-red.js
const RED = require("node-red");

const settings = {
    userDir: process.env.HOME + "/.node-red" // Puedes cambiar esta ruta si deseas
};

// Inicializa Node-RED
RED.init(settings);

RED.start().then(function() {
    console.log('Node-RED ha arrancado!');
});





