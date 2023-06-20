import axios from 'axios';
import { ReactSortable } from 'react-sortablejs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';

const ProductForm = ({ 
    _id,
    nombre: existingNombre, 
    descripcion: existingDescripcion, 
    precio: existingPrecio,
    imagenes: existingImagenes,
    selectedCategory: existingCategory,
    properties:existingProperties,
    /* imagenes: existingImagenes */ }) => {

    const [nombre, setNombre] = useState(existingNombre || '');
    const [descripcion, setDescripcion] = useState(existingDescripcion || '');
    const [precio, setPrecio] = useState(existingPrecio || '');
    const [imagenes, setImagenes] = useState(existingImagenes || []);
    const [goToProducs, setGoToProducts] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(existingCategory || '');
    const [productProperties,setProductProperties] = useState(existingProperties || {});

    const router = useRouter();

    useEffect(() => {
      axios.get('/api/categories').then(result => {
       setCategories( result.data );
      })
    }, [])
    

    const crearProducto = async (e) => {
        e.preventDefault();
        const data = { 
            nombre, 
            descripcion, 
            precio,
            imagenes, 
            _id, 
            selectedCategory, 
            properties: productProperties };
            
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
            setIsUploading(true);
            const data = new FormData();
            for (const file of files){
                data.append('file', file)
            }
          
            const res = await axios.post('/api/upload', data);
            setImagenes(oldImagenes => {
                return [...oldImagenes, ...res.data.links];
            });
            setIsUploading(false);
        }
    }
    const updateImagesOrder = ( imagenes ) => {
        setImagenes(imagenes);
    }

    

    const propertiesToFill =  [];
    if (categories.length > 0  && selectedCategory){
        let catInfo = categories.find(({_id}) => _id === selectedCategory );
        console.log({catInfo});
        propertiesToFill.push(...catInfo.properties);
        console.log(propertiesToFill);
        while(catInfo?.parent?._id){
            const parentCat = categories.find(({_id}) => _id === catInfo?.parent?._id);
            propertiesToFill.push(...parentCat.properties);
            catInfo = parentCat;
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
            <label>Categoría</label>
            <select 
                value={ selectedCategory }
                onChange={(e)=> setSelectedCategory(e.target.value)}
            >
                <option>Sin categoría</option>
                { categories.length > 0 && categories.map(cat => (
                    <option key={ cat._id } value={ cat._id }>{ cat.nombre }</option>
                ))}
            </select>
            {
                propertiesToFill.length > 0 &&  propertiesToFill.map(p =>(
                    <div key={p.name}>
                        { p.name}
                    </div>
                )
                )
            }
            <label>Imágenes </label>
            <div className='mb-2 flex flex-wrap gap-2'>
                <ReactSortable
                list={ imagenes }
                className='flex flex-wrap gap-2'
                setList={ updateImagesOrder }>
                    { imagenes?.length && imagenes.map(link =>(
                        <div key={ link } className='h-24 '>
                        <img src= { link } alt="picture product" className='rounded-lg'/>
                        </div>
                    ))}
                </ReactSortable>
                { isUploading && (
                    <div className='w-24 h-24 flex items-center'>
                        <Spinner/>
                    </div>
                )}
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