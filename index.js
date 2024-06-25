const express = require("express"); //llamamos al servidor
const app = express(); //inicializar el servidor
const port = 3000;

// Importar Middlewares
const error404 = require("./middlewares/error404");
const morgan = require("./middlewares/morgan");

// Logger
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));

// Rutas importadas
const booksRoutes = require("./routes/books.routes");
const productsRoutes = require("./routes/products.routes");
const entriesRoutes = require("./routes/entries.routes");
const productsWebRoutes = require("./routes/products.web.routes");

app.use(express.json()); // Habilito recepción de JSON en servidor

// Configuración de vistas PUG - Motor de plantillas
app.set('view engine', 'pug');
app.set('views','./views');

app.use(express.static('public'))

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/perros/:name?", (req, res) => {
    const name = req.params.name;
    console.log(name);
    const perros = [
        { name: "perro1", age: 2 },
        { name: "perro2", age: 3 },
        { name: "perro3", age: 5 },
        { name: "perro4", age: 3 },
    ]

    if (name) { // devuelve un perro
        const perro_encontrado = perros.find((perro) => perro.name === name);
        perro_encontrado ? res.json(perro_encontrado) : res.json({});

    } else { // devuelve todos
        res.json(perros);
    }
});

// Rutas
//API
app.use('/api/books',booksRoutes);
app.use('/api/products',productsRoutes);
app.use('/api/entries',entriesRoutes);

//WEB
app.use('/products',productsWebRoutes);

// Rutas vistas
app.get('/first_template', function(req, res){
  res.render('first_view');
});

app.get('/dynamic_view', function(req, res){
   res.render('dynamic', {
      name: "Tortillas Full Stack", 
      url:"http://www.tortillasFullStack.com"
   });
});

app.use(error404); // Middleware gestiona error 404

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});