import { useEffect } from "react";
import { usesocketcontext } from "../Context/Socketcontext";
import Useconversation from "../zustand/Useconversation";

const Uselistenmsg = () => {
  const { socket }: any = usesocketcontext();

  const { message, setmessage } = Useconversation();

  useEffect(() => {
    socket?.on("newMessage", ({ newmsg }: { newmsg: any }) => {
      setmessage([...message, newmsg]);

      return () => socket.off("newMessage");
    });
  }, [socket, message, setmessage]);
};

export default Uselistenmsg;
