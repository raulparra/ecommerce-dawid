import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ProductForm = ({ 
    _id,
    nombre: existingNombre, 
    descripcion: existingDescripcion, 
    precio: existingPrecio,
    imagenes,
    /* imagenes: existingImagenes */ }) => {

    const [nombre, setNombre] = useState(existingNombre || '');
    const [descripcion, setDescripcion] = useState(existingDescripcion || '');
    const [precio, setPrecio] = useState(existingPrecio || '');
    /* const [imagenes, setImagenes] = useState(existingImagenes || ''); */
    const [goToProducs, setGoToProducts] = useState(false);
    
    const router = useRouter();

    const crearProducto = async (e) => {
        e.preventDefault();
        const data = { nombre, descripcion, precio, _id };
        if (_id) {
            //update
            
            await axios.put('/api/products', { ...data, _id })
        }else{
            //create
            
            await axios.post('/api/products', data);
            
        }
        setGoToProducts(true);
    }

    if (goToProducs) {
         router.push('/products');
    }
    const uploadImages = async (e) => {
        const files = e.target?.files;
        if (files.length > 0) {
            const data = new FormData();
            for (const file of files){
                data.append('file', file)
            }
            const res = await axios.post('/api/upload', data);
            console.log(res.data);
        }
    }
  return (
    <form onSubmit={crearProducto}>
            {/* <h1>Nuevo Producto</h1> */}
            <label>Nombre del prodcuto</label>
            <input 
                type="text" 
                placeholder="Nombre del producto" 
                value={ nombre }
                onChange={(e) => setNombre(e.target.value)}
            />
            <label>Imágenes </label>
            <div>
                <label className='w-24 h-24 border flex flex-col justify-center items-center text-gray-500 rounded-md bg-gray-200 cursor-pointer hover:border-gray-400'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <div>Subir</div>
                    <input type="file" className='hidden' onChange={ uploadImages } />
                </label>
                { !imagenes?.length && (
                    <div>No hay imágenes disponibles para este producto</div>
                )}
            </div>
            <label>Descripción del prodcuto</label>
            <textarea 
                placeholder="Descripción" 
                value={ descripcion }
                onChange={(e) => setDescripcion(e.target.value)}
            />

            <label>Precio del producto</label>
            <input 
                type="text" 
                placeholder="Precio" 
                value={ precio }
                onChange={(e) => setPrecio(e.target.value)}
            />

            <button type='submit' className="btn-primary">Guardar</button>
        </form>
  )
}

export default ProductForm