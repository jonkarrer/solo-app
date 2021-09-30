import Layout from "@/components/Layout";
import Message from "@/components/Message";
import MessageInput from "@/components/MessageInput";
import { useRouter } from "next/router";
import { useStore, addMessage } from "lib/Store";
import { useContext, useEffect, useRef } from "react";
import UserContext from "lib/UserContext";

//@ts-ignore
const ChannelsPage = (props) => {
  const router = useRouter();
  //@ts-ignore
  const { user, authLoaded, signOut } = useContext(UserContext);
  const messagesEndRef = useRef(null);

  // Else load up the page
  const { id: channelId } = router.query;
  const { messages, channels } = useStore({ channelId });

  useEffect(() => {
    //@ts-ignore
    messagesEndRef.current.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }, [messages]);

  // redirect to public channel when current channel is deleted
  useEffect(() => {
    //@ts-ignore
    if (!channels.some((channel) => channel.id === Number(channelId))) {
      router.push("/channels/1");
    }
  }, [channels, channelId]);

  // Render the channels and messages
  return (
    <Layout channels={channels} activeChannelId={channelId}>
      <div className="relative h-screen">
        <div className="Messages h-full pb-16">
          <div className="p-2 overflow-y-auto">
            {messages.map((x) => (
              <Message key={x.id} message={x} />
            ))}
            <div ref={messagesEndRef} style={{ height: 0 }} />
          </div>
        </div>
        <div className="p-2 absolute bottom-0 left-0 w-full">
          <MessageInput
            onSubmit={
              //@ts-ignore
              async (text) => addMessage(text, channelId, user.id)
            }
          />
        </div>
      </div>
    </Layout>
  );
};

export default ChannelsPage;
