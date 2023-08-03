const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT} = require('../middlewares/validate.jwt.js');
const { userExistsById , categoriaExiste} = require('../helpers/db.validators.js');
const { validateDocuments } = require('../middlewares/validate.documents.js');

const {getCheeses,getCheese,postCheese,deleteCheese,updateCheese} = require("../controllers/cheese.controllers.js");

const router = Router();

router.get('/',getCheeses);
router.get('/:id',getCheese);
router.post('/',[
    validateJWT,
    check('name',"El nombre es obligatorio").not().isEmpty(),
    check('state',"El estado es obligatorio").not().isEmpty(),
    check('usuario' , "No es un ObjectId valido").isMongoId(),
    check('usuario').custom(userExistsById),
    check('price' , "El precio es obligatorios").not().isEmpty(),
    check('categoria', "No es un object mongoDB valido").isMongoId(),
    check('categoria').custom(categoriaExiste),
    check('descripcion',"La descripcion es obligatoria").not().isEmpty(),
    validateDocuments
],postCheese);
router.delete('/:id',deleteCheese);
router.put('/:id',updateCheese);

module.exports = router;