import { useState } from "react";

//@ts-ignore
const MessageInput = ({ onSubmit }) => {
  const [messageText, setMessageText] = useState("");
  //@ts-ignore
  const submitOnEnter = (event) => {
    // Watch for enter key
    if (event.keyCode === 13) {
      onSubmit(messageText);
      setMessageText("");
    }
  };

  return (
    <>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Send a message"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={(e) => submitOnEnter(e)}
      />
    </>
  );
};

export default MessageInput;
