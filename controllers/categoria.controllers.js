const Categoria  = require('../models/Categoria.js');  

const getCategorias = async(req,res) =>{
    try {

        const {hasta,desde} = req.query;
        const query = {estado:true};

        const [ total , categorias] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
                .populate('usuario','nombre')
                .skip(Number(desde))
                .limit(Number(hasta))
        ])

        res.json({
            total,
            categorias
        });
    } catch (error) {
        console.log(error);
    }
}

const getCategoria = async(req,res)=>{
    try {
        const categoria = await Categoria.findOne({_id:req.params.id});
        res.json(categoria)
    } catch (error) {
        console.log(error);
    }
}

const postCategoria = async(req, res ) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        });
    }
   /*  console.log("usuario:",usuario); */
    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );

    // Guardar DB
    await categoria.save();

    res.status(201).json(categoria);

}

const eliminarCategoria = async (req,res) =>{
    try {
        await Categoria.deleteOne({_id:req.params.id});
        res.status(204).send({msg:"si"});
    } catch (error) {
        console.log(error);
    }
}

const updateCategoria = async (req,res) =>{
    try {
        const {id} = req.params;
        const {_id ,usuario , ...resto} = req.body;

        const categoria = await Categoria.findByIdAndUpdate(id,resto,{new:true})
        
        res.json({
            msg: "Actualizado",
            categoria: categoria
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getCategorias,
    getCategoria,
    postCategoria,
    eliminarCategoria,
    updateCategoria
}