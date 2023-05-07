import Layout from '@/components/Layout'
import Link from 'next/link'




const products = () => {
  return (
    <Layout>
        <Link href={'/products/new'} className='bg-blue-900 text-white rounded-md py-2 px-2'>
            Añadir nuevo producto
        </Link>
    </Layout>
  )
}

export default products
