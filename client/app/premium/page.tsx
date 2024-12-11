"use client"

import Tick from "@/components/tick";
import {signIn } from "next-auth/react";
import { useRouter } from "next/navigation";



export default function Home() {
  const router = useRouter();

  return (
   <div className="bg-black h-full xl:h-screen w-full">
    <div onClick={()=>{
        router.push("/home")
    }} className="pt-10 pl-10"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 cursor-pointer text-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
</svg>
</div>
    <div className="flex  flex-col  pt-4">
   <div className="text-white flex justify-center xl:text-5xl xl:mb-4 text-2xl font-semibold">Upgrade to Premium</div>
   <div className="text-white flex text-center xl:text-lg justify-center">Enjoy an enhanced experience, exclusive creator tools, top-tier verification and security.</div>

   </div>
   <div className="flex  justify-center">
   <div className="flex flex-col  xl:flex-row">
    <div style={{backgroundColor:"rgb(49 50 53)" ,height:"450px"}} className="rounded-xl cursor-pointer border-2 border-gray-700 hover:border-blue-300 text-white mt-10  w-96 ">
        <div className="text-xl mt-6 ml-6 font-semibold">Premium</div>
        <div className="flex ml-6 "> 
        <div className="text-3xl mt-1 font-bold">₹566.67</div>
        <div className="mt-4"> / month</div>
        </div>
        <div className="flex">
        <div className="text-lg mt-1 ml-6">Billed annually</div>
        <div style={{backgroundColor:"rgb(23 43 31)"}} className="mt-2 ml-2 rounded-3xl text-sm w-20 flex justify-center font-semibold items-center text-green-300 cursor-pointer">SAVE 11%</div>
        </div>
        
        <button className="bg-white text-black w-80 h-10 ml-8 rounded-3xl font-semibold mt-4"> Subscribe</button>
        <div className="ml-6 mt-4 font-semibold">Everything in Basic, and</div>
        <div className="flex ml-6 mt-1">
            <Tick/> Half Ads In For You and Following
            
        </div>
        <div className="flex ml-6 mt-1 ">
            <Tick/> Larger reply boost
            
        </div>
        <div className="flex ml-6 mt-1 ">
            <Tick/> Get paid to boost
            
        </div>
        <div className="flex ml-6 mt-1">
            <Tick/> Checkmark
            
        </div>
        <div className="flex ml-6 mt-1">
            <Tick/> Grok 2 AI Assistant
            
        </div>
        <div className="flex ml-6 mt-1">
            <Tick/> Q pro,Analytics,Media Studio
            
        </div>
        <div className="flex ml-6 mt-1">
            <Tick/> Creator Subscription
            
        </div>

    </div>
    <div style={{backgroundColor:"rgb(49 50 53)" ,height: window.innerWidth >= 1280 ? "450px" : "380px"}} className="rounded-xl cursor-pointer border-2 border-gray-700 hover:border-blue-300  xl:ml-10 text-white mt-10  w-96 ">
        <div className="text-xl mt-6 ml-6 font-semibold">Basic</div>
        <div className="flex ml-6 "> 
        <div className="text-3xl mt-1 font-bold">₹215.87</div>
        <div className="mt-4"> / month</div>
        </div>
        <div className="flex">
        <div className="text-lg mt-1 ml-6">Billed annually</div>
        <div style={{backgroundColor:"rgb(23 43 31)"}} className="mt-2 ml-2 rounded-3xl text-sm w-20 flex justify-center items-center font-semibold text-green-300 cursor-pointer">SAVE 12%</div>
        </div>
        
        <button className="bg-white text-black w-80 h-10 ml-8 rounded-3xl font-semibold mt-4"> Subscribe</button>
        
        <div className="flex ml-6 mt-4">
            <Tick/> Small reply boost
            
        </div>
        <div className="flex ml-6 mt-1 ">
            <Tick/> Encrypted direct message
            
        </div>
        <div className="flex ml-6 mt-1 ">
            <Tick/> Bookmark folders
            
        </div>
        <div className="flex ml-6 mt-1">
            <Tick/> Highlights tab
            
        </div>
        <div className="flex ml-6 mt-1">
            <Tick/> Post longer videos
            
        </div>
        <div className="flex ml-6 mt-1">
            <Tick/> Longer pots
            
        </div>
        

    </div>
    <div style={{backgroundColor:"rgb(49 50 53)" ,height: window.innerWidth >= 1280 ? "450px" : "350px"}} className="rounded-xl cursor-pointer border-2  border-gray-700 hover:border-blue-300 xl:ml-10 mb-10 text-white mt-10  w-96 ">
        <div className="text-xl mt-6 ml-6 font-semibold">Premium+</div>
        <div className="flex ml-6 "> 
        <div className="text-3xl mt-1 font-bold">₹1,113.33</div>
        <div className="mt-4"> / month</div>
        </div>
        <div className="flex">
        <div className="text-lg mt-1 ml-6">Billed annually</div>
        <div style={{backgroundColor:"rgb(23 43 31)"}} className="mt-2 ml-2 rounded-3xl text-sm w-20 flex justify-center items-center font-semibold text-green-300 cursor-pointer">SAVE 12%</div>
        </div>
        
        <button className="bg-white text-black w-80 h-10 ml-8 rounded-3xl font-semibold mt-4"> Subscribe</button>
        <div className="ml-6 mt-4 font-semibold">Everything in Basic, and</div>
        <div className="flex ml-6 mt-1">
            <Tick/>Fully ad-free
            
        </div>
        <div className="flex ml-6 mt-1 ">
            <Tick/> Largest reply boost
            
        </div>
        <div className="flex ml-6 mt-1 ">
            <Tick/> Write Articles
            
        </div>
        <div className="flex ml-6 mt-1">
            <Tick/> Radar
            
        </div>

    </div>
    </div>
   </div>
   </div>
  );
}
