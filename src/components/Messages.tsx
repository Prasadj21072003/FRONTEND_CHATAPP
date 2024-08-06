import { useEffect, useState } from "react";
import { useAuthcontext } from "../Context/Authcontext";
import Useconversation from "../zustand/Useconversation";
import { motion } from "framer-motion";

const Messages = ({ msg }: { msg: any }) => {
  const [side, setside] = useState("");
  const { authuser } = useAuthcontext();
  const { selectedconversation } = Useconversation();

  const Time = ({ msg }: { msg: any }) => {
    var t = new Date(msg.createdAt);
    var d = String(t).substring(16, 21);
    return d;
  };

  useEffect(() => {
    msg.senderId === authuser?.id ? setside("right") : setside("left");
    Time({ msg });
  }, []);

  return (
    <div className="w-full  ">
      <div className={`w-full ${side === "right" ? "flex" : "hidden"}   `}>
        <div className="flex gap-[10px] w-[60%] my-[10px]  ml-auto  ">
          <div className=" w-[100%] text-right ">
            <p className="bg-blue-400 ml-auto   py-[5px] px-[10px] flex flex-wrap w-fit rounded-[10px] rounded-tr-[0px] text-white font-light">
              {msg?.body}
            </p>
            <span className="text-[12px] font-thin text-white relative right-[5px] ">
              {Time({ msg })}
            </span>
          </div>
          <img
            src={authuser?.profilepic}
            width={40}
            height={30}
            className="rounded-full min-w-[30px] max-h-[35px]"
          />
        </div>
      </div>

      <div
        className={`w-full ${
          side === "left" ? "flex" : "hidden"
        } items-start  `}
      >
        <motion.div
          className="flex gap-[10px]  my-[10px] w-[60%]   "
          animate={{ x: [0, 10, -10, 0] }}
          transition={{ delay: 1.2 }}
        >
          <img
            src={selectedconversation?.profilepic}
            width={40}
            height={30}
            className="rounded-full min-w-[30px] max-h-[35px]"
          />
          <div className=" w-[100%] text-left ">
            <p className="bg-gray-700 py-[5px] px-[10px] flex flex-wrap w-fit rounded-tl-[0px] rounded-[10px] text-white font-light">
              {msg?.body}
            </p>
            <span className="text-[12px] font-thin text-white relative left-[5px] ">
              {Time({ msg })}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Messages;
