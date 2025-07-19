import React from "react";
import SideBar from "../components/SideBar/SideBar";
import MainChat from "../components/MainChat/MainChat";
import "./../chatbot.css";
import Quiz from "../components/Quiz/Quiz";
export default function ChatbotPage() {
  return (
    <div>
    <div className="flex w-full h-screen">
      <div className="flex-shrink-0">
        <SideBar />
      </div>
      <div className="flex-1 overflow-y-auto">
        <MainChat />
      </div>
      
    </div>
    </div>
  );
}


