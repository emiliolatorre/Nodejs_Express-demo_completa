const router = require('express').Router();
const checkApiKey = require('../middlewares/auth_api_key');
const booksController = require('../controllers/books.controller');
const {validateCreateBook,validateDeleteBook}= require('../validators/books.validators');
// CRUD --> CREATE, READ, UPDATE, DELETE

// Query params:
// http://localhost:3000/books/quijote
// http://localhost:3000/books/
// http://localhost:3000/books/celestina
/* router.get("/books/:title?", (req, res) => {
    if(req.params.title){
        console.log(req.params.title);
        res.status(200).send("Has pedido: "+req.params.title);
    }
    else{
        res.status(200).send("Has pedido todos los libros");
    }

}); */

// Query params:
// http://localhost:3000/books/quijote
// http://localhost:3000/books/
// http://localhost:3000/books/celestina

//router.get("/:title?",getBooks);
router.get("/:title?", booksController.getBook);

/*
{
  "title": "Don Quijote de la Mancha",
  "author":"Miguel de Cervantes",
  "pages": 2000,
  "year":1550,
  "description": "en un lugar de la mancha..."
}
*/


// POST http://localhost:3000/api/books?API_KEY=123abc
router.post("/", checkApiKey, validateCreateBook, booksController.createBook);

// PUT http://localhost:3000/api/books?API_KEY=123abc
router.put("/", checkApiKey,booksController.editBook);

// DELETE http://localhost:3000/api/books/quijote?API_KEY=123abc
router.delete("/:title?", checkApiKey, validateDeleteBook, booksController.deleteBook);

module.exports = router;