import Layout from "@/components/Layout"
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from 'react-sweetalert2';


const CategoriesPage = ({swal}) => {

    const [editedCategory, setEditedCategory] = useState(null);
    const [nombre, setNombre] = useState('');
    const [ categorias, setCategorias ] = useState([]);
    const [parentCategory, setParentCategory] = useState('');
    const [properties, setProperties] = useState([]);

    useEffect(() => { //Cargar las categorías
      fetchCategories();
    }, [])
    
    function fetchCategories () { //Consultar las categorías
        axios.get('/api/categories').then(result => {
            setCategorias(result.data);
        })
    }

    const saveCategory = async (e) => { //Guardar las categorías
        e.preventDefault();
        const data = { 
            nombre, 
            parentCategory, 
            properties: properties.map(p=> ({ 
                name:p.name, 
                values:p.values.split(',')
            })), }
        if (editedCategory) {
            data._id = editedCategory._id;
            await axios.put('/api/categories', data)
            setEditedCategory(null)
        }else{
            await axios.post('/api/categories', data);
        }
        setNombre('');
        fetchCategories();
        setParentCategory('');
        setProperties([]);
    }

    const editCategory = (categoria)=> {
        setEditedCategory( categoria );
        setNombre( categoria.nombre );
        setParentCategory( categoria.parent?._id);
        setProperties(categoria.properties.map(({ name, values}) => ({
            name,
            values:values.join(',')
        })));
    }
    const deleteCategory = (categoria) => {
        swal.fire({
            title: '¿Deseas eliminar la categoría?',
            text: `${ categoria.nombre }`,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText:'Sí, eliminar',
            confirmButtonColor: '#d55'
        }).then(async result => {
            console.log({result});
            if (result.isConfirmed) {
                const {_id} = categoria
                await axios.delete('/api/categories?_id='+_id)
                fetchCategories();
            }
        }).catch(error => {
            // when promise rejected...
        });
    }

    const addProperty = () => {
        setProperties( prev => {
            return [...prev, {name: "", values: ""}];
        })
    }

    const handlePropertyNameChange = (index, property, newName) => {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].name = newName;
            return properties
        })
    }

    const handlePropertyValuesChange = (index, property, newValues) => {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].values = newValues;
            return properties
        })
    }

    const removeProperty = ( index ) => {
        setProperties( prev => {
            return [...prev].filter((p,pIndex) => {
                return pIndex !== index;
            })
        })
    }

  return (
    <Layout>
        <h1>Categorías</h1>
        <label>
            {
                editedCategory 
                ? `Editar categoría ${ editedCategory.nombre }` 
                : 'Crear nueva categoría'
            }
        </label>
        <form onSubmit={saveCategory} >
            <div className="flex gap-1">
                <input
                    type="text"
                    placeholder="Nombre de la categoría"
                    onChange={ e => setNombre(e.target.value) }
                    value={nombre}
                />
                <select
                    onChange={e => setParentCategory(e.target.value)}
                    value={ parentCategory }
                >
                    <option value={ 0 }>Sin categoría</option>
                    {
                        categorias.length > 0 && categorias.map( categoria => (
                            <option key={ categoria._id } value={categoria._id}>{ categoria.nombre }</option>
                        ))
                    }
                </select>
            </div>
            <div className="mb-2">
                <label className="block">Propiedades</label>
                <button 
                    onClick={ addProperty }
                    type="button" 
                    className="btn-default text-sm"
                >
                    Crear propiedad
                </button>
            </div>
            <div>
                {
                    properties.length > 0 && properties.map( (property, index) => ( //mostrar propiedades
                        <div className="flex gap-2 mb-2" key={index}>
                            <input
                                className="mb-0"
                                type="text"
                                value={ property.name }
                                onChange={ (e) => handlePropertyNameChange(
                                    index,
                                    property,
                                    e.target.value ) }
                                placeholder="Nombre (ej: color)"
                            />
                            <input
                                className="mb-0"
                                type="text"
                                value={ property.values }
                                onChange={ (e) => handlePropertyValuesChange (
                                    index,
                                    property,
                                    e.target.value )}
                                placeholder="Valor1,Valor2,..."
                            />
                            <button
                                type="button"
                                onClick={() => removeProperty(index) }
                                className="btn-default"
                            >
                                Eliminar
                            </button>
                        </div>
                    ))
                }
            </div>
            <div className="flex gap-1">
                {
                    editedCategory && (
                        <button 
                            type="button"
                            className="btn-default"
                            onClick={ () => {
                                setEditedCategory(null);
                                setNombre('');
                                setParentCategory('');
                                setProperties([]);

                            }}
                        >
                            Cancelar
                        </button>
                    )
                }
                <button 
                    type="submit" 
                    className="btn-primary py-1"
                >
                    Guardar
                </button>
            </div>
        </form>
        {
            !editedCategory && (
        
        <table className="basic mt-4">
            <thead>
                <tr>
                    <td>Nombre de la categoría</td>
                    <td>Categoría principal</td>
                    <td>Acciones</td>
                </tr>
            </thead>
            <tbody>
                {
                    categorias.length > 0 && categorias.map( categoria => (
                    <tr key={ categoria._id }>
                        <td>{ categoria.nombre }</td>
                        <td>{ categoria?.parent?.nombre }</td>
                        <td>
                            <button 
                                className="btn-primary mr-1" 
                                onClick={()=> editCategory(categoria)}
                            > 
                                Editar
                            </button>
                            <button 
                                className="btn-primary" 
                                onClick={ ()=> deleteCategory(categoria)}
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>))
                }
            </tbody>
        </table>
            )
        }
        
    </Layout>
  )
}

export default withSwal(({swal}, ref) => (
    <CategoriesPage swal={swal} />
  ));