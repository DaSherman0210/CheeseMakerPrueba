const { Router } = require('express');
const { check } = require('express-validator');
const { validateDocuments} = require('../middlewares/validate.documents.js');
const { validateJWT} = require('../middlewares/validate.jwt.js');
const { categoriaExiste} = require('../helpers/db.validators.js');

const { getCategoria,getCategorias,postCategoria,eliminarCategoria,updateCategoria} = require('../controllers/categoria.controllers.js');


const router = Router();

/*  localhost/api/categorias */

// Crear categoria - privado - cualquier persona con un token válido
router.get('/',getCategorias);
router.get('/:id',getCategoria);
router.post('/', [ 
   validateJWT, 
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validateDocuments
], postCategoria );
router.delete('/:id',eliminarCategoria);
router.put("/:id",[
    check('id' , "No es un ObjectID MONGODB valido").isMongoId(),
    check('id').custom(categoriaExiste),
    validateDocuments
],updateCategoria);


module.exports = router;