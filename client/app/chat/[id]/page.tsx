"use client";
import Loader from "@/components/loading";
import Sidebar from "@/components/sideber";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";



interface Users{
    id:any,
    name:String,
    username:String
}

export default function Home() {
  const router = useRouter()

    const [users,setusers]=useState<Users[]>([])
    const socket = new WebSocket('ws://localhost:8080');
    socket.onopen = () => {
      console.log('WebSocket connected');
      socket.send(JSON.stringify({ type: 'register', userId: 'user123' }));
    };
    
    socket.onmessage = (event) => {
      console.log('Received:', event.data);
    };
    
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    socket.onclose = () => {
      console.log('WebSocket closed');
    };


    
    

    useEffect(()=>{
        
        const chat = async()=>{
            const authtoken = localStorage.getItem("token")
            const response = await axios.get("http://localhost:5000/message/users",{
                headers: {
                    Authorization: `Bearer ${authtoken}`,
                    "Content-Type": "application/json",
                  },

            })
            setusers(response.data) 
            console.log(response.data)        
             
        }
        chat()
    },[])

  return (
   <div className="md:flex justify-center items-center w-full min-h-screen bg-black">
  <div className="text-white w-full sm:flex flex-row">
    <Sidebar />

    <div className="border-gray-700 border-x-2 sm:basis-11/12 lg:basis-4/12">
      <div className="text-2xl font-semi bold ml-4 pt-4">Messages</div>
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
    </div>

    <div className="hidden border-r-2 border-gray-700  md:block basis-4/12">
    <div className="w-full h-5/6  mt-10"></div>
    <textarea className="w-full  bg-gray-900 border-2 border-gray-500 rounded-3xl flex text-xl  h-12 pt-2 flex pl-6"  placeholder="Start the Conversation"></textarea>
      </div>
    <div className="hidden basis-1/12"></div>
  </div>
</div>
  )}