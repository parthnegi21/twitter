"use client";
import Loader from "@/components/loading";
import Sidebar from "@/components/sideber";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  username: string;
}

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const searchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        if (searchTerm.trim() === "") {
          setSearchResults([]);
          return;
        }

        const response = await axios.get(`http://localhost:5000/profile/search/${searchTerm}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setSearchResults(response.data);
        setShowDropdown(true);
      } catch (error) {
        console.error("Error searching users:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    
    const timeoutId = setTimeout(() => {
      searchUsers();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, mounted]);

  useEffect(() => {
    if (!mounted) return;

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="md:flex justify-center items-center w-full h-screen bg-black">
      <div className="text-white w-full h-screen sm:flex flex-row">
        <Sidebar />

        <div className="border-gray-700 border-x-2 sm:basis-11/12 lg:basis-6/12">
          <div className="flex justify-center relative" ref={dropdownRef}>
            <div className="w-96 relative">
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Users"
                className="w-full h-12 pl-4 rounded-3xl bg-gray-900 mt-4 text-xl"
                value={searchTerm}
                onFocus={() => setShowDropdown(true)}
              />

           
              {showDropdown && searchTerm && (
                <div className="absolute w-full mt-2 bg-gray-900 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                  {loading ? (
                    <div className="p-4 text-center">
                      <Loader />
                    </div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((user) => (
                      <div
                        key={user.id}
                        className="p-4 hover:bg-gray-800 cursor-pointer border-b border-gray-700"
                        onClick={() => {
                          router.push(`/profile/${user.username}`);
                          setShowDropdown(false);
                        }}
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                            {user.name[0].toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold">{user.name}</div>
                            <div className="text-gray-400 text-sm">@{user.username}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-400">
                      No users found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="hidden md:block basis-3/12">
        
        </div>
      </div>
    </div>
  );
}
