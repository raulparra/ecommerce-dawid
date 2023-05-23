import Layout from "@/components/Layout";
import { signOut, useSession } from "next-auth/react";

export default function Home() {

  const { data: session} = useSession();
  
  if (!session) return;
    
  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2>
          Hello, <b>{ session?.user?.email}</b>
        </h2>
        <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
          <img src={ session?.user?.image } alt="image profile" className="w-6 h-6"/>
          <span className="px-2">
            { session?.user?.name }
          </span>
          <button onClick={()=> signOut()}>salir</button>
        </div>
      </div>
    </Layout>
  )
}
