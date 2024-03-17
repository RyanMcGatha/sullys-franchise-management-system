import "./messenger.css";
import { supabase } from "../../../config/supabaseConfig";
import { useState, useEffect } from "react";
import React from "react";

const Messenger = () => {
  const [message, setMessage] = useState("");
  const [messagesDisplay, setMessagesDisplay] = useState([]);

  useEffect(() => {
    const messages = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          setMessagesDisplay((prevMessages) => [
            ...prevMessages,
            payload.new.message,
          ]);
          console.log(payload);
        }
      )
      .subscribe();

    return () => messages.unsubscribe();
  }, []);

  const handleSendMessage = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase
      .from("messages")
      .insert([{ message }])
      .select();

    if (error) {
      alert(error.message);
    } else {
      console.log("Message sent successfully");

      setMessage("");
    }
  };

  return (
    <div className="main-messenger">
      <div className="chatBox">
        <h1>Messenger</h1>
        {messagesDisplay.map((message, index) => (
          <div class="notification">
            <div class="notiglow"></div>
            <div class="notiborderglow"></div>
            <div class="notititle">Welcome To Uiverse</div>
            <div class="notibody" key={index}>
              {message}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="newMessageForm">
        <input
          className="messageBox"
          type="text"
          placeholder="Enter your message"
          value={message || ""}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendMessageBtn" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Messenger;
