"use client"

import { signup } from "@/app/api/user/signup/route"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Signup(){
    const [name,setname]=useState("")
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const [username,setusername] = useState("")
    const router = useRouter();
    

    return(
        <div className="md:flex justify-center items-center w-full h-screen md:bg-gray-900">
        <div className="shadow-xl md:w-8/12 lg:w-6/12 xl:w-4/12 md:h-4/5 md:rounded-2xl w-full h-screen bg-black">
            <div className="text-5xl text-white text-center font-bold pt-4">Q</div>
            <div className="text-3xl text-white font-semibold pt-12 pl-8">Create your Account</div>
            <div className="flex justify-center">
           <input onChange={(e)=>setname(
            e.target.value
           )} className="bg-black border rounded w-10/12 h-16 mt-6 hover text-white text-2xl pl-4" type="text" id="name" name="name" placeholder="Name"></input>
           </div>

           <div className="flex justify-center">
           <input onChange={(e)=>setemail(e.target.value)
           } className="bg-black border rounded w-10/12 h-16 md:mt-6 mt-10 hover text-white text-2xl pl-4" type="text" id="email" name="email" placeholder="Email"></input>
           </div>
           
           <div className="flex justify-center">
           <input onChange={(e)=>setusername(
            e.target.value
    )} className="bg-black border rounded w-10/12 h-16 md:mt-6 mt-10 hover text-white text-2xl pl-4" type="text" id="password" name="password" placeholder="Set Username"></input>
           </div>

           <div className="flex justify-center">
           <input onChange={(e)=>setpassword(
            e.target.value
    )} className="bg-black border rounded w-10/12 h-16 md:mt-6 mt-10 hover text-white text-2xl pl-4" type="password" id="password" name="password" placeholder="Set Password"></input>
           </div> 



<div className="flex justify-center md:mt-20 mt-40">
    <button onClick={async()=>{
        const response = await signup(email,name,password,username)
        localStorage.setItem("token",response.token ??"")
        console.log(response)

    }} className="bg-white w-9/12 h-12 rounded-3xl text-2xl font-semibold">Next</button>
    
</div>


        </div>
        </div>
    )
}