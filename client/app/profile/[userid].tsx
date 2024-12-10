"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

interface UserProfile {
  id: string;
  name: string;
  username: string;
  bio: string;
  posts: Array<{ id: number; content: string; likeCount: number }>;
}

export default function ProfilePage() {
  const router = useRouter();
  const { userid } = router.query; // Extract `userid` from the URL
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!userid) return; // Wait until `userid` is available

    const fetchUserProfile = async () => {
      try {
        const authtoken = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/profile/${userid}`,
          {
            headers: {
              Authorization: `Bearer ${authtoken}`,
            }
          }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, [userid]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="text-white bg-black h-screen">
      <div className="p-4">
        <h1 className="text-2xl">{profile.name}</h1>
        <p>@{profile.username}</p>
        <p>{profile.bio}</p>
      </div>
      <div className="mt-4">
        <h2 className="text-xl">Posts</h2>
        {profile.posts.map((post) => (
          <div key={post.id} className="border-b border-gray-700 p-4">
            <p>{post.content}</p>
            <span>Likes: {post.likeCount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
