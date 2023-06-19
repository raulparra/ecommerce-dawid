import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
    nombre: { type: String, require: true },
    descripcion: String,
    precio: { type: Number, require: true },
    imagenes:  [{type: String}],
    selectedCategory: {type:mongoose.Types.ObjectId, ref:'Category'},
    properties: {type:Object},
});

export const Product = models.Product || model( 'Product', ProductSchema );