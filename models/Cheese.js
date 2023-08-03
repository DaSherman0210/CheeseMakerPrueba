const {Schema , model} = require('mongoose'); 

const cheeseSchema = Schema(
    {
        name:{
            type:String,
            required: [true,"El nombre es requerido"],
            trim:true
        },
        state:{
            type:Boolean,
            default:true
        },
        usuario:{
            type:Schema.Types.ObjectId,
            required: [true,"El usuario es requerido"],
            ref: 'Usuario',
            trim:true
        },
        price:{
            type:Number,
            required: [true,"El precio es requerido"],
            trim:true
        },
        categoria:{
            type:Schema.Types.ObjectId,
            ref: 'Categoria',
            trim:true
        },
        descripcion:{
            type:String,
            required: [true,"La descripcion es requerida"],
            trim:true
        },
        avalaible:{
            type:Boolean,
            required: [true,"El avaible es requerida"], 
            trim:true,
            default: true
        }
    }
);

module.exports = model("cheeses",cheeseSchema);