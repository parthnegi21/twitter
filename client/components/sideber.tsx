"use client"
import { useRouter } from "next/navigation"
export default function Sidebar(){
  const router = useRouter()
    return(
    <div className="justify-center sm:basis-1/12 lg:basis-3/12">
    <div className="hidden sm:block mt-4 flex font-bold lg:ml-20 text-8xl">Q</div>
      <div className="flex sm:block sm:top-40 font-bold text-2xl sm:space-y-10 mt-4 lg:ml-32 fixed bottom-0 w-full sm:w-auto  p-4 justify-around">
      <div className="flex cursor-pointer hover:bg-gray-900 w-12 xl:w-32 h-12 items-center rounded-3xl justify-center">
<svg   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="flex font-bold sm:size-9 size-8">
<path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />

</svg>
<div className="hidden mt-1 lg:ml-2 lg:block">Home</div>
</div>



<div className="flex cursor-pointer hover:bg-gray-900 w-12 xl:w-32 h-12  items-center rounded-3xl justify-center">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="sm:size-9  size-8">
<path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
<div className="hidden lg:ml-2 mt-1  lg:block">Search</div>
</div>


<div onClick={()=>{
  router.push("/premium")
}} className="flex cursor-pointer hover:bg-gray-900 w-12 xl:w-40 xl:pr-2 h-12 items-center rounded-3xl justify-center">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="sm:size-9 size-8">
<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
<div className="hidden  lg:ml-2 lg:block">Premium</div>
</div>

<div className="flex cursor-pointer hover:bg-gray-900 w-12 xl:pl-1 xl:w-40 h-12 items-center rounded-3xl justify-center">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
<path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
</svg>

<div className="hidden lg:ml-2 lg:block">Bookmark </div>
</div>

<div className="flex cursor-pointer hover:bg-gray-900 xl:pr-2 w-12 xl:w-40 h-12 items-center rounded-3xl justify-center">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="sm:size-9  size-8">
<path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
</svg>
<div className="hidden lg:ml-2  lg:block">Message</div>
</div>


<div className="flex cursor-pointer hover:bg-gray-900 w-12 xl:w-32 h-12 items-center rounded-3xl justify-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="sm:size-9  size-8">
<path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
<div className="hidden lg:ml-2 lg:block">Profile</div>
</div>




      </div>
    </div>
    )
}
