import React, { useState, useRef } from "react";
import axios from "axios";

const Chatbot = () => {
  // State for chatbox visibility, user input, and chat messages
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);

  // Ref for accessing the chatbox element
  const chatboxRef = useRef();

  // Toggle chatbox visibility
  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  // Handle user input change
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Send user message to backend and update chat messages
  const sendMessage = async () => {
    console.log("sendMessage function called");

    try {
      // Send user question to the backend API
      const response = await axios.post("http://localhost:3001/ask", {
        question: inputText,
      });

      // Update messages state with user and bot messages
      const userMessage = { text: inputText, sender: "user" };
      const botMessage = { text: response.data.response.text, sender: "bot" };

      // If the bot suggests contacting IT support
      if (botMessage.text.includes("Please contact our customer support team at support@example.com")) {
        setMessages((prevMessages) => [
          ...prevMessages,
          userMessage,
          botMessage,
          {
            text: "Would you like to submit a ticket?",
            sender: "bot",
            withButtons: true,
          },
        ]);
      } else {
        // Regular message handling
        setMessages((prevMessages) => [
          ...prevMessages,
          userMessage,
          botMessage,
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

    // Clear the input text after sending the message
    setInputText("");
  };

  // Handle keydown event (e.g., Enter key) for sending messages
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-0 right-0 m-4">
      {/* Chatbox toggle button */}
      <button
        onClick={toggleChatbox}
        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Click me to chat!
        </span>
      </button>

      {/* Chatbox container */}
      {isOpen && (
        <div
          ref={chatboxRef}
          className="bg-white border-4 p-4 rounded-lg absolute bottom-16 right-0 w-[500px] h-[700px] overflow-y-auto flex flex-col"
        >
          {/* Message display area */}
          <div className="flex-1">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  message.sender === "bot"
                    ? "flex justify-start"
                    : "flex justify-end"
                }`}
              >
                <div
                  className={`${
                    message.sender === "bot"
                      ? "bg-blue-200 float-left ml-0 mr-10 rounded-lg text-left"
                      : "bg-yellow-300 float-right mr-0 rounded-lg text-right"
                  } p-2`}
                >
                  {message.text}
                  {/* Render buttons if 'withButtons' property is true */}
                  {message.withButtons && (
                    <div className="mt-2 flex space-x-2">
                      <button
                        className="bg-blue-400 border border-black text-white p-2 rounded-md"
                        onClick={() => handleTicketSubmission(true)}
                      >
                        Yes
                      </button>
                      <button
                        className="bg-blue-400 border border-black text-white p-2 rounded-md"
                        onClick={() => handleTicketSubmission(false)}
                      >
                        No
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input and Send Button */}
          <div className="flex items-center mt-2">
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="flex-1 border p-2 rounded-l-md"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white p-2 rounded-r-md ml-2"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
