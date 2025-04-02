import mongoose from "mongoose";

const comprasSchema = mongoose.Schema({
    usuarioId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuarios",
        required: true,
    },
    producto:[{
        productoId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Productos",
            required: true,
        },
        cantidad:{
            type: Number,
            required: true,
            trim: true,
            min: [1, 'La cantidad debe ser al menos 1'],
        },
        precioUnitario:{
            type: Number,
            required: true,
            trim: true
        },
        totalCompra:{
            type: Number,
            required: true,
            trim: true
        }
    }],
    totalCompra: {
        type: Number,
        required: true,
        default: 0,
    }
})

const Compras = mongoose.model("Compras", comprasSchema);
export default Compras;