"use client";
import Loader from "@/components/loading";
import Sidebar from "@/components/sideber";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";




interface Users {
  id: number;
  name: string;
  username: string;
}

export default function Home() {

  const [loading,setloading]=useState(true)

  
  const router = useRouter()
   
    const [users,setusers]=useState<Users[]>([])

    useEffect(()=>{
        setloading(true)
        const chat = async()=>{
            const authtoken = localStorage.getItem("token")
            const response = await axios.get("https://twitter-bclj.onrender.com/message/users",{
                headers: {
                    Authorization: `Bearer ${authtoken}`,
                    "Content-Type": "application/json",
                  },

            })
            setusers(response.data) 
            console.log(response.data)    
            
            setloading(false)
             
        }
        chat()
    },[])
    
    
    

  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto flex w-full flex-col md:flex-row text-white">
        <Sidebar />

        <div className={`border-gray-700 border-x-2 ${loading ? "min-h-screen":"min-h-full"} pb-16 sm:pb-0 md:basis-7/12 lg:basis-6/12`}>
    {loading ? (<Loader/>):(<>
      <div className="text-2xl font-semibold ml-4 pt-4">Messages</div>
      <div className="flex justify-center mt-4">
        <input
          className="bg-black border-2 border-gray-700 w-96 h-10 rounded-3xl text-lg pl-4"
          placeholder="Search User"
        />
      </div>

      <div className="w-full cursor-pointer  mt-4">
        {users.map((user, index) => (
          <div key={index} className="flex h-20 hover:bg-gray-900 items-center" onClick={()=>{
            router.push(`/chat/${user.id}`)
          }}>
            <div className="border-2 h-12 w-12 mt-1 text-2xl ml-4 flex justify-center items-center rounded-full">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="text-lg mt-1 ml-4">{user?.name}</div>
            <div className="text-gray-500 mt-1 ml-1 text-lg">
              @{user?.username || "defaultUsername"}
            </div>
          </div>
        ))}
      </div>
      </>)} 
    </div>

    <div className="hidden md:block md:basis-4/12 border-r-2 border-gray-700 px-8 py-10">
    <div className="flex justify-center mt-80 text-4xl tracking-tight font-sans font-bold"> Select a message</div>
    <div className="text-gray-500 text-lg font-semibold text-center mt-6">Choose from your existing conversations, start a new one, or just keep swimming.</div>
      </div>
  </div>
</div>
  )}   