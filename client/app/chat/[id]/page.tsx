"use client";
import Loader from "@/components/loading";
import Sidebar from "@/components/sideber";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Tick from "@/components/tick";

interface User {
  id: string;
  name: string;
  username: string;
}

type Message = {
  senderId: string;
  content: string;
};

export default function Home() {
  const router = useRouter();
  const params = useParams();
  const [loading,setloading]=useState(true)
  const [messageloading,setmessageloading]=useState(true)
  const [users, setUsers] = useState<User[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const id = params?.id;
  const [message, setMessage] = useState<string>("");
  const [chatLog, setChatLog] = useState<Message[]>([]);
  const [myChat, setMyChat] = useState<any>([]);
  const [userChat, setUserChat] = useState<any>([]);
  const [user,setuser]=useState<User[]>([]);
  const centerPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

   
  useEffect(()=>{
    setloading(true)
    const chat = async()=>{
        const authtoken = localStorage.getItem("token")
        const response = await axios.get("http://localhost:5000/message/users",{
            headers: {
                Authorization: `Bearer ${authtoken}`,
                "Content-Type": "application/json",
              },

        })
        setuser(response.data) 
        console.log(response.data)    
        
        setloading(false)
         
    }
    chat()
},[])


  
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000");
    setWs(socket);

    socket.onmessage = (event) => {
      const { senderId, content }: Message = JSON.parse(event.data);
      setChatLog((prevLog) => [...prevLog, { senderId, content }]);
    };
    
    socket.onopen = () => {
      console.log("WebSocket connection established");
    };


    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

   
    return () => {
      socket.close();
    };
  }, []);

  // Fetch the current user's profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      const authtoken = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/profile/my", {
        headers: {
          Authorization: `Bearer ${authtoken}`,
          "Content-Type": "application/json",
        },
      });
      setUserId(response.data.id);
    };
    fetchUserProfile();
  }, []);

  // Register the user on WebSocket connection
  useEffect(() => {
    if (ws && userId) {
      if(ws.readyState == WebSocket.OPEN){
      ws.send(
        JSON.stringify({
          type: "register",
          userId: userId,
        })
      );
      console.log(`Registered as ${userId}`);
    }
  }
 66666
  }, [userId, ws]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (ws && userId && id) {

      if(ws.readyState ==WebSocket.OPEN){
      ws.send(
        JSON.stringify({
          type: "sendMessage",
          userId,
          targetUserId: id,
          content: message,
        })
      );
      setChatLog((prevLog) => [...prevLog, { senderId: userId, content: message }]);
      setMessage("");
    }
    
    }
  };

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      setmessageloading(true)
      const authtoken = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/message/users", {
        headers: {
          Authorization: `Bearer ${authtoken}`,
          "Content-Type": "application/json",
        },
      });
      setUsers(response.data);
      setmessageloading(false)
    };
    fetchUsers();
  }, []);

  
  useEffect(() => {
    const fetchMyMessages = async () => {
      const authtoken = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/message/send/${id}`, {
        headers: {
          Authorization: `Bearer ${authtoken}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data)
      setMyChat(response.data);
    };
    fetchMyMessages();
  }, [userId]);


  useEffect(() => {
    const fetchUserMessages = async () => {
      const authtoken = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/message/receive/${id}`, {
        headers: {
          Authorization: `Bearer ${authtoken}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data)
      setUserChat(response.data);
    };
    fetchUserMessages();
  }, [userId]);

  
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX } = e;
    const screenWidth = window.innerWidth;

    if (centerPanelRef.current && clientX >= screenWidth / 4 && clientX < (screenWidth * 3) / 4) {
      centerPanelRef.current.style.overflow = "auto";
      rightPanelRef.current!.style.overflow = "hidden";
    } else if (rightPanelRef.current && clientX >= (screenWidth * 3) / 4) {
      rightPanelRef.current.style.overflow = "auto";
      centerPanelRef.current!.style.overflow = "hidden";
    }
  };

  return (
    <div
      className="md:flex  justify-center items-center w-full min-h-screen bg-black"
      onMouseMove={handleMouseMove}
    >
      <div onClick={()=>{
        router.push("/chat")
    }} className="h-10 pt-8  bg-black w-full sm:hidden pl-10"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 cursor-pointer text-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
</svg>
</div>
      <div className="text-white w-full flex flex-col sm:flex-row">
      <div className="hidden sm:block sm:basis-1/12 lg:basis-3/12">
          <Sidebar/>
        </div>
      
       
        

        <div
          id="center-panel"
          ref={centerPanelRef}
          className="border-gray-700 hidden sm:block border-x-2 sm:basis-11/12 lg:basis-4/12 max-h-screen overflow-auto"
        >
          {loading ?<Loader/>:(<>
          <div className="text-2xl font-semibold ml-4 pt-4">Messages</div>
          <div className="flex justify-center mt-4">
            <input
              className="bg-black border-2 border-gray-700 w-96 h-10 rounded-3xl text-lg pl-4"
              placeholder="Search User"
            />
          </div>
          <div className="w-full  cursor-pointer mt-4">
            {users.map((user, index) => (
              <div
                key={index}
                className="flex h-20 border-t-2 border-gray-700 hover:bg-gray-900 items-center"
                onClick={() => {
                  router.push(`/chat/${user.id}`);
                }}
              >
                <div className="border-2 h-12 w-12 mt-1 text-2xl ml-4 flex justify-center items-center rounded-full">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-lg mt-1 ml-4">{user.name}</div>
                <div className="text-gray-500 mt-1 ml-1 text-lg">
                  @{user.username || "defaultUsername"}
                </div>
              </div>
            ))}
          </div>
          </>)}
        </div>
        
        <div
          id="right-panel"
          ref={rightPanelRef}
          className="block border-r-2 border-gray-700 md:basis-4/12 max-h-screen relative"
        >
          <div className="w-full h-[calc(100vh-70px)]  pb-14 mt-10 overflow-auto flex flex-col">
            {loading ? <Loader/> :(<> 
              {userId &&
                
                [...myChat, ...userChat, ...chatLog]
                  .map((msg) => ({
                    ...msg,
                    timestamp: msg.createdAt
                      ? new Date(msg.createdAt).getTime() 
                      : Date.now(), 
                  }))
                  .sort((a, b) => a.timestamp - b.timestamp) 
                  .map((message, index) => {

                    const isMyMessage = message.senderId === userId || message.fromUserId === userId;
                    return (
                      <div
                        key={index}
                        className={`p-2 my-1 mx-4 w-fit max-w-[75%] rounded-lg text-white ${
                          isMyMessage ? "bg-blue-500 ml-auto text-right" : "bg-gray-800 mr-auto text-left"
                        }`}
                      >
                        {message.content || message.text} 
                      </div>
                    );
                  })}
                  </>)}
          </div>

          <div className="flex absolute bottom-0 w-full bg-black  pt-2">
            <textarea
              className="w-5/6 ml-6 sm:mb-8 flex bg-gray-900 border-2 border-gray-500 rounded-3xl text-xl h-12 pt-2 pl-6"
              placeholder="Start the Conversation"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleSendMessage}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 ml-2 cursor-pointer mt-2 text-blue-500 flex"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}
