"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function OAuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const res = await axios.get("/api/auth/session");
        const token = res.data?.user?.accessToken;

        if (token) {
          localStorage.setItem("token", token);
          router.push("/home");
        } else {
          setError("Authentication failed. Please sign in again.");
        }
      } catch (err) {
        setError("Authentication failed. Please sign in again.");
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="md:flex justify-center items-center w-full h-screen md:bg-gray-900">
      <div className="shadow-xl md:w-8/12 lg:w-6/12 xl:w-4/12 md:h-4/5 md:rounded-2xl w-full h-screen bg-black">
        <div className="text-3xl text-white text-center font-semibold pt-12">Authenticating...</div>
      </div>
    </div>
  );
}
