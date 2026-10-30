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
  imageUrl?: string;
  createdAt: string;
  name: string;
  username: string;
}

export default function Bookmarks() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchBookmarks = async () => {
      setLoading(true);
      const authtoken = localStorage.getItem("token");

      try {
        const response = await axios.get("https://twitter-bclj.onrender.com/post/bookmarks", {
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
        console.error("Error fetching bookmarks:", error);
      }
      setLoading(false);
    };

    fetchBookmarks();
  }, [mounted]);

  const handleRemoveBookmark = async (postId: number) => {
    const authtoken = localStorage.getItem("token");
    try {
      await axios.post(
        "https://twitter-bclj.onrender.com/post/bookmark",
        { postId },
        {
          headers: {
            Authorization: `Bearer ${authtoken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  if (!mounted) return null;

  return (
    <div className="md:flex justify-center items-center w-full min-h-screen bg-black">
      <div className="text-white w-full min-h-screen sm:flex flex-row">
        <Sidebar />

        <div className="border-gray-700 border-x-2 sm:basis-11/12 lg:basis-6/12">
          <div className="w-full h-12 flex text-2xl justify-center items-center border-b-2 border-gray-700 font-bold">
            Bookmarks
          </div>

          <div className="pb-16">
            {loading ? (
              <Loader />
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="pt-2 pl-4 w-full border-b-2 border-gray-700 overflow-auto pb-4">
                  <div className="flex">
                    <div
                      className="flex cursor-pointer w-96"
                      onClick={() => router.push(`/profile/${post.username}`)}
                    >
                      <div className="h-10 w-10 border-2 border-gray-700 rounded-full flex justify-center font-semibold items-center mt-1">
                        {post.name[0].toUpperCase()}
                      </div>
                      <div className="flex mt-2 ml-2">
                        <div className="flex font-semibold text-lg">{post.name}</div>
                        <div className="flex text-sm font-semibold text-blue-300 sm:h-8 h-7 items-center ml-2">
                          {post.username}
                        </div>
                        <div className="ml-2 mt-2 text-gray-500 text-xs">{post.createdAt}</div>
                      </div>
                    </div>
                    <svg
                      onClick={() => handleRemoveBookmark(post.id)}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="flex cursor-pointer h-6 w-6 text-blue-400 hover:text-white ml-auto mt-2 mr-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 3.75h-10.5c-.621 0-1.125.504-1.125 1.125v15.375c0 .66.738 1.05 1.283.683l5.992-3.995 5.992 3.995c.546.367 1.283-.024 1.283-.683V4.875c0-.621-.504-1.125-1.125-1.125Z"
                      />
                    </svg>
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
                </div>
              ))
            ) : (
              <div className="flex justify-center text-4xl font-semibold mt-20">
                No bookmarks yet
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:block basis-3/12"></div>
      </div>
    </div>
  );
}
