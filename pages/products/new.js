import Layout from '@/components/Layout';
import axios from 'axios';
import { useState } from 'react';


const NewProduct = () => {

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    
    const crearProducto = async (e) => {
        e.preventDefault();
        const data = { nombre, descripcion, precio }
        await axios.post('/api/products', data)
    }


  return (
    <Layout>
        <form onSubmit={crearProducto}>
            <h1>Nuevo Producto</h1>
            <label>Nombre del prodcuto</label>
            <input 
                type="text" 
                placeholder="Nombre del producto" 
                value={ nombre }
                onChange={(e) => setNombre(e.target.value)}
            />

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
    </Layout>
  )
}

export default NewProduct