import Layout from '@/components/Layout';
import ProductForm from '@/components/ProductForm';
import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const EditProductPage = () => {

    const [productInfo, setProductInfo] = useState(null)
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        if (!id) {
            return;
        }
      axios('/api/products?id='+id).then (response => {
      setProductInfo(response.data)
      console.log({...productInfo});
      })
    }, [id])
    
  return (
    <Layout>
      <h1>Editar Producto</h1>
      { productInfo && (
        <ProductForm { ...productInfo}/>
      )}
    </Layout>
  )
}

export default EditProductPage