import "./messenger.css";
import { supabase } from "../../../config/supabaseConfig";
import { useState } from "react";
import React from "react";

const Messenger = () => {
  const [message, setMessage] = useState("");

  const main = supabase.channel("main");

  const handleSendMessage = async (event) => {
    event.preventDefault();

    main.send({
      type: "broadcast",
      event: "test",
      payload: {
        message: message,
      },
    });
  };

  return (
    <div className="main-messenger">
      <h1>Messenger</h1>
      <div className="chatBox"></div>
      <form onSubmit={handleSendMessage} className="newMessageForm">
        <input
          className="message"
          type="text"
          placeholder="Enter your message"
          value={message || ""}
          required={true}
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
