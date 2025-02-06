"use client";
import Loader from "@/components/loading";
import Sidebar from "@/components/sideber";
import axios from "axios";
import { useState, useEffect,useRef } from "react";
import { useRouter } from "next/navigation";

interface Post {
  id: number;
  authorId: number;
  content: string;
  imageUrl:string;
  createdAt: string;
  name: string;
  username: string;
}

export default function Home() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<{ [key: number]: boolean }>({});
  const [loading,setloading]=useState(true)
  const [content,setContent]=useState("")
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!mounted) return;
    
    try {
      setIsUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "socialmedia");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dfibncmy0/image/upload",
        data
      );

      setImageUrl(response.data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (!mounted) return;

    const fetchPosts = async () => {
      setloading(true);
      const authtoken = localStorage.getItem("token");

      try {
        const response = await axios.get("http://localhost:5000/post/bulk", {
          headers: {
            Authorization: `Bearer ${authtoken}`,
            "Content-Type": "application/json",
          },
        });

        const sortedPosts = response.data.sort((a: Post, b: Post) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setloading(false);
    };

    fetchPosts();
  }, [mounted]);

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

  const handlePost = async () => {
    try {
      const authtoken = localStorage.getItem("token");
      if (!content.length && !imageUrl) return;

      const response = await axios.post(
        "http://localhost:5000/post/post",
        { 
          content,
          imageUrl
        },
        {
          headers: {
            "Authorization": `Bearer ${authtoken}`,
            "Content-Type": "application/json"
          }
        }
      );
      
      const newPost = response.data;
      if (!newPost.name) {
        throw new Error("Post data is incomplete");
      }
      
      setContent("");
      setImageUrl("");
      
      setPosts(prevPosts => [newPost, ...prevPosts]);
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="md:flex justify-center items-center w-full  min-h-screen bg-black">
      <div className="text-white w-full min-h-screen  sm:flex flex-row">
 
         
         <Sidebar/>
        

        <div className="border-gray-700 border-x-2 sm:basis-11/12 lg:basis-6/12">
          <div className="w-full h-12 flex text-2xl justify-center items-center">Q</div>
          <div className="w-full border-b-2 border-gray-700 h-12 md:h-16 text-xl flex flex-row">
            <div className="basis-1/2 flex justify-center cursor-pointer hover:bg-gray-900 items-center">
              For You
            </div>
            <div className="basis-1/2 flex justify-center cursor-pointer hover:bg-gray-900 items-center">
              Following
            </div>
          </div>




          <div className="w-full flex flex-col overflow-y-auto  border-b-2 border-gray-700 ">
            <div className="text-blue-300 ml-10 border-gray-700 border w-24 flex justify-center rounded-3xl mt-4 font-semibold">Everyone</div>
            <div className="flex flex-col px-4">
              <textarea 
                onChange={(e) => setContent(e.target.value)}
                value={content}
                className="bg-black text-xl w-full pb-4 flex justify-center outline-none border-b-2 border-gray-700 mt-4 resize-none overflow-hidden"
                rows={1}
                onInput={(e) => {
                  e.currentTarget.style.height = "auto";
                  e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                }}
                placeholder="Type your Thoughts"
              />

              {imageUrl && (
                <div className="relative mt-4">
                  <img 
                    src={imageUrl} 
                    alt="Upload preview" 
                    className="max-h-96 rounded-xl object-contain"
                  />
                  <button
                    onClick={() => setImageUrl("")}
                    className="absolute top-2 right-2 bg-gray-900 rounded-full p-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}

              <div className="flex items-center mt-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFile}
                  accept="image/*"
                />
                
                <div className="flex items-center gap-4">
                  <button 
                    onClick={handleClick}
                    className="text-blue-300 hover:bg-gray-800 p-2 rounded-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 sm:size-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                  </button>
                  
                  {isUploading && (
                    <div className="text-blue-300">Uploading...</div>
                  )}
                </div>

                <button 
                  onClick={handlePost}
                  disabled={(!content.length && !imageUrl) || isUploading}
                  className={`bg-gray-500 text-black w-20 hover:bg-white flex justify-center text-xl rounded-3xl font-semibold h-9 cursor-pointer items-center ml-auto ${(!content.length && !imageUrl) || isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
          <div className="w-full h-12 border-b-2 border-gray-700"></div>






          <div className ="pb-16">
            {loading ? (<Loader/>):(<>
            {posts.map((post) => (
              <div key={post.id} className="pt-2 pl-4 w-full border-b-2 border-gray-700 overflow-auto pb-4">
                <div className="flex cursor-pointer" onClick={()=>{
                  router.push(`/profile/${post.username}`)
                }}>
                  <div className="h-10 w-10 border-2 border-gray-700  rounded-full flex justify-center font-semibold items-center mt-1">
                    {post.name[0].toUpperCase()}
                  </div>
                  <div className="flex mt-2 ml-2">
                    <div className="flex font-semibold text-lg">{post.name}</div>
                    <div className="flex text-sm font-semibold text-blue-300 sm:h-8 h-7 items-center ml-2">{post.username}</div>
                    <div className="ml-2 mt-2 text-gray-500 text-xs">{post.createdAt}</div>
                  </div>
                </div>
                <div className="ml-16 text-gray-300">{post.content}</div>

                {post.imageUrl && (
                  <div className="mt-4 flex justify-center">
                    <img 
                      src={post.imageUrl} 
                      alt="Post image" 
                      className="max-h-96 rounded-xl object-contain"
                    />
                  </div>
                )}

                <div className="flex justify-between px-10 cursor-pointer pt-4">
                  <svg
                    onClick={() => handleLike(post.id, post.authorId)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="none"
                    className={`cursor-pointer h-6 w-6 ${likedPosts[post.id] ? 'text-red-700' : 'text-gray-500'}   hover:text-red-500`}
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
            ))}
            </>)}
          </div>
        </div>

        <div className="hidden md:block basis-3/12"></div>
      </div>
    </div>
  );
}
