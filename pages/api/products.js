import { mongooseConect } from "@/lib/mongoose";
import { Product } from "@/models/products";
import mongoose from "mongoose";


export default async function handler(req, res) {
    const { method } = req;
    await mongooseConect();
    if (method === 'POST') {
        const { nombre, descripcion, precio } = req.body;
        const productDoc = await Product.create({
            nombre, 
            descripcion, 
            precio
        })
        res.status(200).json(productDoc)
    }
  }