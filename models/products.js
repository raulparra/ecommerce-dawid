import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
    nombre: { type: String, require: true },
    descripcion: String,
    precio: { type: Number, require: true },
});

export const Product = model( 'Product', ProductSchema );