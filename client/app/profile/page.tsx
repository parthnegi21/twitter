"use client";
import Loader from "@/components/loading";
import Sidebar from "@/components/sideber";
import axios from "axios";
import { setLazyProp } from "next/dist/server/api-utils";
import { useState, useEffect } from "react";

interface Post {
  id: number;
  authorId: number;
  content: string;
  createdAt: string;
  name: string;
  username: string;
}

type Userdata ={
  name:String,
  username:String
}

type count ={
  followers:any,
  following:any
}

export default function Profile() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<{ [key: number]: boolean }>({});
  const [detail,setdetail]=useState<Userdata | null>(null)
  const[count,setcount]=useState<count|null>(null)
  const [countloading,setcountloading]=useState(true)
  const [postloading,setpostloading]=useState(true)


  useEffect(()=>{
    const total =async()=>{
      setcountloading(true)
      const authtoken = localStorage.getItem("token")
      const response = await axios.get("http://localhost:5000/connect/count",{
        headers:{
          Authorization: `Bearer ${authtoken}`,
          "Content-Type": "application/json",
        },

      })
      console.log(response.data)

      const userCount :count={
        followers:response.data.follower,
        following:response.data.following
      }
      
      setcount(userCount)
    
      setcountloading(false)
     
      
    }
    total()
  }
  ,[])

  useEffect(() => {
    setpostloading(true)
    const fetchPosts = async () => {
      const authtoken = localStorage.getItem("token");

      try {
        const response = await axios.get("http://localhost:5000/post/mypost", {
          headers: {
            Authorization: `Bearer ${authtoken}`,
            "Content-Type": "application/json",
          },
        });

        setPosts(response.data);
        
        const userDetails:Userdata = {
          name: response.data.name, 
          username: response.data.username, 
        };
        setdetail(userDetails)
        console.log('Detail updated:', userDetails);
        console.log(response.data.name)
        
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setpostloading(false)
    };

    fetchPosts();
  }, []);

 

  const handleLike = async (postId: number, authorId: number) => {
    const authtoken = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:5000/react/like",
        { postId, authorId },
        {
          headers: {
            Authorization: `Bearer ${authtoken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data === "New like added") {
        setLikedPosts((prev) => ({ ...prev, [postId]: true }));
      } else {
        setLikedPosts((prev) => ({ ...prev, [postId]: false }));
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div className="md:flex justify-center items-center w-full h-screen bg-black">
      <div className="text-white w-full h-screen sm:flex flex-row">
 
         
         <Sidebar/>
        

        <div className="border-gray-700 border-x-2 sm:basis-11/12 lg:basis-6/12">
        
        {countloading || postloading  ? (<Loader/>):(<>
       <div className="border-b-2 border-gray-700">
        
          <div className="flex ">
            <div>
          <div className="w-20 basic-11/12 h-20 rounded-full border-2 border-gray-500 flex justify-center items-center text-3xl ml-10 xl:mr-60 mt-10 font-bold ">{detail?.name[0].toUpperCase()}</div>
          <div className="text-xl ml-4 mt-4">{detail?.name}</div>
          <div className="text-gray-500 ml-4 text-lg">@{detail?.username}</div>
          </div>
          <button className="w-32 text-lg justify-center mt-20 ml-32 md:ml-60 lg:ml-80 flex  h-8 border-2 border-gray-500 rounded-3xl">Edit Profile</button>
          </div>
          <div className="mt-10 ml-4 mb-4 flex">
          <div className="mr-8" >{count?.followers} Followers</div>
          <div>{count?.following} Following</div>
          </div>
          </div>
          

          <div>
            {posts.length >0?(
            posts.map((post) => (
              <div key={post.id} className="pt-2 pl-4 w-full border-b-2 border-gray-700 overflow-auto pb-4">
                <div className="flex">
                  <div className="h-10 w-10 border-2 border-gray-700 rounded-full flex justify-center font-semibold items-center mt-1">
                    {post.name[0].toUpperCase()}
                  </div>
                  <div className="flex mt-2 ml-2">
                    <div className="flex font-semibold text-lg">{post.name}</div>
                    <div className="flex text-sm font-semibold text-blue-300 sm:h-8 h-7 items-center ml-2">{post.username}</div>
                    <div className="ml-2 mt-2 text-gray-500 text-xs"></div>
                  </div>
                </div>
                <div className="ml-16 text-gray-300"></div>

                <div className="flex justify-between px-10 cursor-pointer pt-4">
                  <svg
                    onClick={() => handleLike(post.id, post.authorId)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`cursor-pointer h-6 w-6 ${likedPosts[post.id] ? 'text-red-700' : 'text-gray-500'} border-red-500 rounded-full hover:text-red-500`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="flex cursor-pointer h-6 w-6 text-gray-500 hover:text-blue-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 20.25c4.97 0 9-3.358 9-7.5s-4.03-7.5-9-7.5-9 3.358-9 7.5c0 1.597.623 3.065 1.682 4.293-.412 1.424-1.128 2.7-2.045 3.743 1.882-.154 3.526-.864 4.837-1.754 1.118.439 2.35.711 3.526.711Z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="flex cursor-pointer h-6 w-6 text-gray-500 hover:text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 3.75h-10.5c-.621 0-1.125.504-1.125 1.125v15.375c0 .66.738 1.05 1.283.683l5.992-3.995 5.992 3.995c.546.367 1.283-.024 1.283-.683V4.875c0-.621-.504-1.125-1.125-1.125Z"
                    />
                  </svg>
                </div>
              </div>
            ))):(
              <div className="flex justify-center text-4xl font-semibold ">no post yet</div>
            )}
          </div>
          </>
        )}
        </div>

        <div className="hidden md:block basis-3/12">
         </div>
      </div>
    </div>
  );
}