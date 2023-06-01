import { mongooseConect } from "@/lib/mongoose";
import { Product } from "@/models/products";



export default async function handler(req, res) {
    const { method } = req;
    await mongooseConect();

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Product.findOne({_id: req.query.id}))
        }else{
            res.json(await Product.find())
        }
    }
    if (method === 'POST') {
        const { nombre, descripcion, precio, imagenes } = req.body;
        const productDoc = await Product.create({
            nombre, 
            descripcion, 
            precio,
            imagenes
        })
        res.status(200).json(productDoc)
    }
    if (method === 'PUT') {
        const { nombre, descripcion, precio, imagenes, _id, } = req.body;
        await Product.updateOne({ _id }, { nombre, descripcion, precio, imagenes });
        res.json(true)
    }
    if (method === 'DELETE') {
        if (req.query?.id) {
            await Product.deleteOne({_id: req.query.id})
            res.json(true)
        }
    }
  }