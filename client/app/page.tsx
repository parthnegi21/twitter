"use client"

import {signIn } from "next-auth/react";
import { useRouter } from "next/navigation";



export default function Home() {
  const router = useRouter();

  return (
   <div className="bg-black h-screen lg:flex w-full">
   <div className="text-white font-bold text-6xl lg:text-9xl lg:pt-80 lg:pl-60 xl:pt-80 xl:pl-80 sm:pl-12 pt-20 pl-8 ">Q
   </div>

   <div className="xl:pl-32 lg:pt-20 lg:pt-20 sm:text-center" >
   
   <div className="text-white font-bold text-4xl sm:pl-0 pl-4 pt-20">Happening Today</div>
   <div className="text-white font-bold text-2xl sm:pl-0 pl-4 pt-4">Join Today</div>
   <div className="flex justify-center">
   <button type="button"  onClick={() => signIn("google")
    
   } className="h-12  rounded-3xl w-11/12 sm:w-9/12 md:w-6/12 hover:cursor-pointer bg-white mt-12 flex items-center justify-center text-lg font-bold">Continue with Google
   <img className="ml-4" src="https://imgs.search.brave.com/g17BH7ApM9d8-w9e-JPSNcH8j_6dKtlc-P0jl3lYp6Y/rs:fit:32:32:1:0/g:ce/aHR0cDovL2Zhdmlj/b25zLnNlYXJjaC5i/cmF2ZS5jb20vaWNv/bnMvMGIyNDZlZGM5/Y2MxOTI5ODg1NTU5/YTA0YTYxNTEwMjZi/NTZlZDY4NGE2ODVm/OGVjNTg4MzE3ZDMz/YjdhNDI4Yi93d3cu/Z29vZ2xlLmNvbS8"></img></button>
   </div>

   <div className=" flex justify-center">
   <button type="button" onClick={() => signIn("github")}  className="h-12 rounded-3xl w-11/12 sm:w-9/12 md:w-6/12 bg-white mt-4 hover:cursor-pointer flex items-center justify-center text-lg font-bold">Continue with Github
   <img className="ml-4" src="https://imgs.search.brave.com/xxsA4YxzaR0cl-DBsH9-lpv2gsif3KMYgM87p26bs_o/rs:fit:32:32:1:0/g:ce/aHR0cDovL2Zhdmlj/b25zLnNlYXJjaC5i/cmF2ZS5jb20vaWNv/bnMvYWQyNWM1NjA5/ZjZmZjNlYzI2MDNk/N2VkNmJhYjE2MzZl/MDY5ZTMxMDUzZmY1/NmU3NWIzNWVmMjk0/NTBjMjJjZi9naXRo/dWIuY29tLw"  /></button>
   </div>

   
   <div className="text-white  text-xl font-bold flex justify-center mt-4">or</div>

   <div className="flex justify-center">
   <div className="bg-gray-700 w-11/12  h-0.5 mt-4"></div>
   </div>

   <div className="flex justify-center">
   <button onClick={()=>router.push("/user/signup")} className="h-12 w-11/12 sm:w-9/12 md:w-6/12 hover:cursor-pointer rounded-3xl  text-white flex justify-center items-center font-bold text-lg mt-6"
    style={{backgroundColor:"rgb(29, 155, 240)"}}>Create Account</button>
   </div>

   <div className="text-white mt-2 ml-4">By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</div>
   <div className="text-white text-xl mt-10 ml-6 sm:ml-0">Already have a Account?</div>

   <div className="justify-center flex">
   <div onClick={()=>{router.push("/user/signin")}} className="h-12  rounded-3xl hover:cursor-pointer w-11/12 sm:w-9/12 md:w-6/12 text-blue-500 border border-white mt-4 flex items-center justify-center text-lg font-bold">Sign in</div>
   </div>

   <div className="text-white text-center mt-10">© 2024 X Corp.</div>
   </div>
   </div>
  );
}
