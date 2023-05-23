import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";


const Modal = ({ closeModal, productoNombre, productID }) => {

    const router = useRouter();
    const { id } = router.query;
    //Borrar producto

    /* useEffect(() => {
      if(!id){
        return;
      }

    }, [id]) */
    console.log(productID);
  const deleteProduct = async () => {

    await axios.delete('/api/products?id=' + productID);
    closeModal(true)
  }
  return (
        <div className={`fixed inset-0 flex justify-center items-center transition-colors bg-black bg-opacity-30 backdrop-blur-sm`}>
            <div className="md:w-[40%] bg-white  p-3 gap-10">
                <div className="flex justify-between">
                    <p className="text-2xl font-bold">¿Deseas eliminar este producto?</p>
                    <button onClick={ closeModal }>X Cerrar</button>
                </div>
                <p> { productoNombre } </p>
                <div className="flex justify-evenly">
                    <button className="px-4 py-1 bg-red-700 text-white rounded-md text-2xl mr-2" onClick={ deleteProduct }>Sí</button>
                    <button className="px-4 py-1 bg-indigo-900 text-white rounded-md text-2xl" onClick={ closeModal }>No</button>
                </div>
            </div>
        </div>
  )
}

export default Modal