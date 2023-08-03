const cheeses = require("../models/Cheese.js");

const getCheeses = async (req,res) =>{
    try {
        const {hasta,desde} = req.query;
        const query = {state:true};

        const [ total , cheesis] = await Promise.all([
            cheeses.countDocuments(query),
            cheeses.find(query)
                .populate('usuario',['nombre','email'])
                .populate('categoria','nombre')
                .skip(Number(desde))
                .limit(Number(hasta))
        ])

        res.json({
            total,
            cheesis
        }); 
    } catch (error) {
        console.log(error);
    }
}

const getCheese = async (req,res) => {
    try {
        const cheese = await cheeses.findOne({_id:req.params.id})
        res.json(cheese)
    } catch (error) {
        console.log(error);
    }
}

const postCheese = async (req,res) => {
    try {
        const name = req.body.name.toUpperCase();
        const chiss = await cheeses.findOne({name})
        if (chiss) {
            return res.status(400).json({
                res: name,
                req: chiss,
                msg: `El queso ${name} ya existe`
            })
        }

        const data = {
            name,
            usuario: req.usuario._id
        }

        const chisa = new cheeses(data);

        await chisa.save();

        res.status(201).json(chisa);
    } catch (error) {
        console.log(error);
    }
}

const deleteCheese = async (req,res) =>{
    try {
        await cheeses.deleteOne({_id:req.params.id});
        res.status(204).send({msg:"hi"})
    } catch (error) {
        console.log(error);
    }
}

const updateCheese = async (req,res) =>{
    try {
        const {id} = req.params;
        const {_id , ...resto} = req.body;

        const cheese = await cheeses.findByIdAndUpdate(id,resto,{new:true});

        res.json({
            res: req.body,
            msg: "Updated",
            cheeses: cheese
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getCheeses,
    getCheese,
    postCheese,
    deleteCheese,
    updateCheese
}