import { useEffect, useState } from "react";
import supabase from "@/utils/supabaseClient";
export default function Channel() {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([] as any);
  useEffect(() => {
    const handleAsync = async () => {
      const { data, error }: any = await supabase
        .from("messages")
        .select("message");

      const arr = [];
      for (const mes of data) {
        arr.push(mes.message);
      }

      setAllMessages(arr);
    };
    handleAsync();
  });
  const handleClick = async () => {
    try {
      //If session exists, grab user data from the session
      const user = supabase.auth.user();
      const payload = { message: message, channel_id: 1, user_id: user?.id };
      //Grab the desired table and insert a new row with user data.
      let { error } = await supabase.from("messages").insert(payload);

      if (error) throw error;
    } catch (error: any) {
      alert(error.message);
    } finally {
      console.log("Backend complete");
    }
    console.log(message);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="messesge"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={() => handleClick()}>Send message</button>

      <div>
        {allMessages.map((item: any, index: any) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  );
}
