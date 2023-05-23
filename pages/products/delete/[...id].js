import Layout from '@/components/Layout'
import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const DeleteProductPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [productInfo, setProductInfo] = useState();

    useEffect(() => {
      if (!id) {
        return;
      }
      axios.get( '/api/products?id=' + id ).then(response => { setProductInfo(response.data) })
    
    }, [id])
    
    const gobcak = () => {
        router.push('/products')
    }

    const deleteProduct =async () => {
       await axios.delete('/api/products?id=' + id)
       gobcak();
    }
  return (
    <Layout>
        <div className={`fixed inset-2 flex justify-center items-center transition-colors bg-black bg-opacity-30 backdrop-blur-sm`}>
            <div className="md:w-[40%] bg-white rounded-lg  p-3 gap-10">
                <div className="flex justify-between">
                    <p className="text-2xl font-bold">¿Deseas eliminar este producto?</p>
                    <button onClick={ gobcak }>X Cerrar</button>
                </div>
                <p> { productInfo?.nombre } </p>
                <div className="flex justify-evenly">
                    <button className="px-4 py-1 bg-red-700 text-white rounded-md text-2xl mr-2" onClick={ deleteProduct }>Sí</button>
                    <button className="px-4 py-1 bg-indigo-900 text-white rounded-md text-2xl" onClick={ gobcak }>No</button>
                </div>
            </div>
        </div>
        {/* ¿Deseas eliminar este producto: { productInfo?.nombre }?
        <div className="flex justify-evenly">
            <button className="px-4 py-1 bg-red-700 text-white rounded-md text-2xl mr-2" >Sí</button>
            <button className="px-4 py-1 bg-indigo-900 text-white rounded-md text-2xl" onClick={ gobcak }>No</button>
        </div> */}
    </Layout>
  )
}

export default DeleteProductPage