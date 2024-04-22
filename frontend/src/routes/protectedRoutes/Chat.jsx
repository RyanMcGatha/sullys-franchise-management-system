import React, { useState } from "react";
import { supabase } from "../../../supabaseConfig";
import { chatOne } from "../../../supabaseConfig";

const Chat = () => {
  const [message, setMessage] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("messages").insert(message);
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent");
    }
  };

  return (
    <>
      <div className="flex w-screen h-full">
        <div className=" bg-red-500 h-screen" style={{ width: "25%" }}></div>
        <div
          className="flex h-screen items-center justify-center"
          style={{ width: "75%" }}
        >
          <form className="flex flex-col w-1/2">
            <input
              type="text"
              placeholder="Enter your message"
              className="p-2 rounded border-2 border-gray-300"
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="button"
              onClick={sendMessage}
              className="bg-blue-500 text-white p-2 rounded mt-2"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
