import mongoose, { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
    nombre: { type: String, require: true },
    parent: {type:mongoose.Types.ObjectId, ref:'Category'},
    properties: [{type: Object}]
});

export const Category = models?.Category || model( 'Category', CategorySchema );