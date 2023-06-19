import { mongooseConect } from "@/lib/mongoose";
import { Category } from "@/models/categories";


export default async function handler(req, res) {
    const { method } = req;
    await mongooseConect();

    if (method === 'GET') {
        
        res.json(await Category.find().populate('parent'));
    }
    
    if (method === 'POST') {
        const { nombre, parentCategory, properties } = req.body;
        const categoryDoc = await Category.create({
            nombre,
            parent: parentCategory || undefined,
            properties,
        })
        res.status(200).json(categoryDoc)
    }
    
    if (method === 'PUT') {
        
        const { nombre, parentCategory, properties, _id } = req.body;
        const categoryDoc = await Category.updateOne({ _id }, {
            nombre,
            parent: parentCategory || undefined,
            properties,
        })
        res.status(200).json(categoryDoc);
    }

    if (method === 'DELETE') {
        
        const { _id } = req.query;
        await Category.deleteOne({ _id })
        res.json('ok');
    }
  }