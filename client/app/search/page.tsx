"use client";
import Loader from "@/components/loading";
import Sidebar from "@/components/sideber";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Post {
  id: number;
  authorId: number;
  content: string;
  createdAt: string;
  name: string;
  username: string;
}

export default function Home() {
  
  const [loading,setloading]=useState(true)

 




  return (
    <div className="md:flex justify-center items-center w-full h-screen bg-black">
      <div className="text-white w-full h-screen sm:flex flex-row">
 
         
         <Sidebar/>
        

        <div className="border-gray-700 border-x-2 sm:basis-11/12 lg:basis-6/12">
        <div className="flex justify-center">
        <input placeholder="Search Users " className="w-96  h-12 pl-4 rounded-3xl bg-gray-900 mt-4 text-xl"></input>
         
        </div>
         

         

                
                    

        <div className="hidden md:block basis-3/12"></div>
      </div>
    </div>
    </div>
  )}
